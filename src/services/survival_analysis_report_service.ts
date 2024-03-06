import { get, isEmpty } from "@/utils/common";
import { ReportService } from "./report_service";

export enum AGE_GROUP {
    GENERAL = "General",
    CHILDREN = "Children",
    WOMEN = "Women"
}

export class SurvivalAnalysisReportService extends ReportService {
    ageGroup: AGE_GROUP;
    quarter: string;
    regenerate: boolean;
    constructor() {
        super()
        this.quarter = ''
        this.regenerate = false
        this.ageGroup = AGE_GROUP.GENERAL
    }

    setRegenerate(regenarete: boolean) {
        this.regenerate = regenarete
    }

    getAgeGroup() {
        return this.ageGroup
    }

    setQuarter(quarter: string) {
        this.quarter = quarter
    }

    setAgeGroup(ageGroup: AGE_GROUP) {
        this.ageGroup = ageGroup
    }

    async generateReport() {
        return this.reportBuilder(
            await this.getReport('cohort_survival_analysis', {
                quarter: this.quarter,
                regenerate: this.regenerate,
                'age_group': this.ageGroup,
            })
        ) 
    }

    private getOutcomeInterval(outcomes: Record<string, Record<number, number>>) {
        const firstOutcome = Object.values(outcomes)[0];
        if (!firstOutcome) return null;
        const firstInterval = Object.keys(firstOutcome)[0];
        return parseInt(firstInterval, 10);
    }
    

    private reportBuilder(data?: Record<string, any>) {
        return Object.entries(data ?? {}).reduce((report, [quarter, outcomes]) => {
            if(!isEmpty(outcomes)) {
                const interval = this.getOutcomeInterval(outcomes);
                const alive = get(outcomes, `On antiretrovirals.${interval}`, 0);
                const died = get(outcomes, `Patient died.${interval}`, 0);
                const defaulted = get(outcomes, `Defaulted.${interval}`, 0);
                const stopped = get(outcomes, `Treatment stopped.${interval}`, 0);
                const transferred = get(outcomes, `Patient transferred out.${interval}`, 0);
                const unknown = get(outcomes, `N/A.${interval}`, 0);
                const total = alive + died + defaulted + stopped + transferred + unknown;

                report.push({ 
                    subGroup: this.ageGroup,
                    quarter,
                    interval,
                    alive,
                    died,
                    defaulted,
                    stopped,
                    transferred,
                    unknown,
                    total,
                });
            }
            return report;
        }, [] as Array<any>)
    }
}
