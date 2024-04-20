import { AGE_GROUPS } from "@/constants";
import { MaternityData, ReportService } from "./report_service";
import { get } from "@/utils/common";
import { uniq } from "@/utils/arrays";

export const indicators = [
    'started_new_on_art',
    'started_previously_on_art',
    'completed_new_on_art',
    'completed_previously_on_art'
]

export class TbPrevReportService extends ReportService {
    constructor() {
        super()
    }

    getTBPrevReport() {
        return this.getReport(`tb_prev2`)
    }

    buildReportData (cohort: Record<string, any>) {
        const data: Record<string, any>[] = [];
        const genders = ["F", "M"];
        genders.forEach(gender => {
            AGE_GROUPS.forEach(group => {
                const tmp: Record<string, any> = { gender, 'ageGroup': group }
                indicators.forEach(indicator => {
                    tmp[`3hp_${indicator}`] = get(cohort[group][gender], `3HP.${indicator}`, [])
                    tmp[`6h_${indicator}`] = get(cohort[group][gender], `6H.${indicator}`, [])
                })
                data.push(tmp)
            })
        })
        return data
    }

    aggregate(cohort: Record<string, any>, gender: 'M' | 'F', tpt: '6H' | '3HP', indicator: string): Array<any> {
        return Object.values(cohort).reduce((patients: any, c: any) => {
            return [...c[gender][tpt][indicator], ...patients]
        }, []) as Array<any>
    }

    getAggregatedMaleData (cohort: Record<string, any>) {
        const data: Record<string, any> = { gender: "Male", 'ageGroup': "All" }
        for (const indicator of indicators) {
            data[`3hp_${indicator}`] = this.aggregate(cohort, 'M', '3HP', indicator)
            data[`6h_${indicator}`] = this.aggregate(cohort, 'M', '6H', indicator)
        }
        return data;
    }

    async getAggregatedMaternalStatus(cohort: Record<string, any>) {
        const aggregated = indicators.reduce((aggregated: any, indicator: string) => [
            ...aggregated,
            { group: '3HP', indicator, data: this.aggregate(cohort, 'F', '3HP', indicator) },
            { group: '6H', indicator, data: this.aggregate(cohort, 'F', '6H', indicator) }
        ], [])

        const allFemales = uniq(aggregated.reduce((totals: any, cur: any) => [...totals, ...cur.data], []).map((d: any) => d.patient_id))
        const maternalStatus = await this.getMaternalStatus(allFemales as Array<number>)
        const allPregnant = maternalStatus.FBf.concat(maternalStatus.FP)
        const data: Record<string, any>[] = [];

        const groupBy = (indicator: string, tpt: string, gender: string) =>  aggregated
            .reduce((all: any, i: any) => i.indicator === indicator && tpt === i.group ? [...all, ...i.data] : all, [])
            .filter((p: any) => gender === 'FNP' ? !allPregnant.includes(p.patient_id) : maternalStatus[gender as keyof MaternityData].includes(p.patient_id))

        for (const gender of ['FP', 'FNP', 'FBf']) {
            const tmp: Record<string, any> = { gender, 'ageGroup': 'All' }
            for (const indicator of indicators) {
                tmp[`3hp_${indicator}`] = groupBy(indicator, '3HP', gender)
                tmp[`6h_${indicator}`] = groupBy(indicator, '6H', gender)
            }
            data.push(tmp)
        }

        return data;
    }
}
