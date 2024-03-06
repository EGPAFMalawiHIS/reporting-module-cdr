import { ReportService } from "./report_service";
import { ApiCore } from 'emr-api-client';
import { ApiRequestParam } from '@/interfaces';

export class CohortReportService extends ReportService {
  private quarter: string;
  private regenerate: boolean;
  constructor(){
    super();
    this.regenerate = false;
    this.quarter = "";
  }

  setQuarter(quarter: string) {
    this.quarter = quarter;
  }

  setRegenerate(regenete: boolean) {
    this.regenerate = regenete;
  }

  getCohortDrillDown(resourceId: string) {
    return ApiCore.getJson('cohort_report_drill_down', {
      id: resourceId,
      date: this.date,
      'program_id': this.programId
    })
  }

  qaurterRequestParams() {
    return { 
      name: this.quarter,
      regenerate: this.regenerate 
    }
  }

  datePeriodRequestParams() {
    return {
      name: `Cohort-${this.startDate}-${this.endDate}`,
      'start_date': this.startDate,
      'end_date': this.endDate,
      regenerate: this.regenerate
    };
  }

  requestCohort(params: ApiRequestParam) {
    return ApiCore.getJson<any>(`programs/${this.programId}/reports/cohort`, params);
  }
}