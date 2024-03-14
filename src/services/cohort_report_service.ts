import { ReportService } from "./report_service";
import apiClient from "@/api";import useFacility from "@/composables/useFacility";
;
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
    return apiClient.getJson('cohort_report_drill_down', {
      id: resourceId,
      date: this.date,
      'program_id': this.programId
    })
  }

  qaurterRequestParams() {
    return { 
      name: this.quarter,
      location: useFacility().facility.value.id,
      regenerate: this.regenerate 
    }
  }

  datePeriodRequestParams() {
    return {
      name: `Cohort-${this.startDate}-${this.endDate}`,
      'start_date': this.startDate,
      'end_date': this.endDate,
      regenerate: this.regenerate,
      location: useFacility().facility.value.id,
    };
  }

  requestCohort(params: ApiRequestParam) {
    return apiClient.getAjax(`reports/cohort`, params);
  }
}