import { REGIMEN_WEIGHT_DISTRIBUTION } from "@/constants";
import { Gender, ReportService } from "./report_service";
import { isEmpty } from "@/utils/common";

export const FORMULATIONS = [
    'pellets',
    'tablets',
    'granules'
]

type RegimenDistibutionData = Array<Record<string, number>>;
type RegimenDistributionReportData = Array<Record<string, string | number>>;
type RegimenDistributionAPIData = Array<{
    weight: string;
    males: RegimenDistibutionData;
    females: RegimenDistibutionData;
}>;

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

    private regimenDistributionRowBuilder(weight: string, gender: Gender, data: RegimenDistibutionData) {
        const row: Record<string, any> = { weight, gender, total: 0 };
        return [...REGIMEN_WEIGHT_DISTRIBUTION, "N/A"].reduce((row, regimen) => {
            const regimenData = data.find(d => !isEmpty(d[regimen]));
            if(regimenData) {
                row[regimen] = regimenData[regimen];
                row.total += regimenData[regimen];
            } else {
                row[regimen] = 0;
            }
            return row;
        }, row);
    }

    async getRegimensByWeight() {
        const data = await this.getReport<RegimenDistributionAPIData>(`programs/${this.programId}/reports/regimens_by_weight_and_gender`);
        const males = [] as RegimenDistributionReportData;
        const females = [] as RegimenDistributionReportData;

        return data?.reduce((result, curr) => {
            females.push(this.regimenDistributionRowBuilder(curr.weight, "F", curr.females));
            males.push(this.regimenDistributionRowBuilder(curr.weight, "M", curr.males));
            return [...females, ...males];
        }, [] as RegimenDistributionReportData) ?? [];
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
