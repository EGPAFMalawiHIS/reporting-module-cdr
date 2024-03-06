import { ReportService } from "./report_service";

export const FORMULATIONS = [
    'pellets',
    'tablets',
    'granules'
]

export class RegimenReportService extends ReportService {
    type: string;
    constructor() {
        super()
        this.type = 'pepfar'
    }

    setReportType(type: string) {
        this.type = type
    }

    getTptNewInitiations() {
        return this.getReport(`programs/${this.programId}/reports/tpt_newly_initiated`)
    }

    getRegimenFormulationReport(regimen: string, formulation: string) {
        return this.getReport(`programs/${this.programId}/reports/regimens_and_formulations`, { regimen, formulation })
    }

    getRegimenReport() {
        return this.getReport('regimen_report', { type: this.type})
    }

    getRegimenSwitchReport() {
        return this.getReport('regimen_switch', { pepfar: this.isPepfar() })
    }

    getRegimensByWeight() {
        return this.getReport(`programs/${this.programId}/reports/regimens_by_weight_and_gender`)
    }
    
    getSCReport() {
        return this.getReport('sc_arvdisp', { pepfar:  this.isPepfar() })
    }

    isPepfar() {
        return /pepfar/i.test(this.type);
    }
    
    async getRegimenDispensationReport(rebuild_outcome: boolean) {
        const data: Array<any> = []
        const res = await this.getReport('latest_regimen_dispensed', { rebuild_outcome })
        if (!res) return []
        for (const patientID in res) {
            for (const orderID in res[patientID]) {
                const d = res[patientID][orderID]
                data.push({
                    identifier: d.identifier,
                    drugName: d.name,
                    gender: d.gender,
                    dob: d.birthdate,
                    dispensationDate: d['dispensation_date'],
                    packSize: d['pack_sizes'][0],
                    packSizes: d['pack_sizes'].length,
                    quantity: d.quantity,
                    vlResult: d['vl_latest_result'],
                    vlResultDate: d.vl_latest_result_date,
                    vlOrderDate: d.vl_latest_order_date
                })
            }
        }
        return data
    }
}
