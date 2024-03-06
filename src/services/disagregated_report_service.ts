import { AGE_GROUPS } from "@/constants";
import { ReportService } from "./report_service";

export class DisaggregatedReportService extends ReportService {
  private gender: string;
  private ageGroup: string;
  private rebuildOutcome: boolean;
  private quarter: string;

  constructor() {
    super()
    this.gender = '';
    this.quarter = '';
    this.ageGroup = AGE_GROUPS[0]
    this.rebuildOutcome = true
  }

  setQuarter(quarter: string) {
    this.quarter = quarter;
  }


  setAgeGroup(ageGroup: string) {
    this.ageGroup = ageGroup;
  }

  setRebuildOutcome(isRebuild: boolean) {
    this.rebuildOutcome = isRebuild;
  }

  setGender(gender: string) {
    this.gender = gender;
  }

  getGender() {
    return this.gender;
  }

  async isInitialized() {
    const res = await this.getCohort(true);
    return res?.temp_disaggregated === 'created';
  }

  getCohort(initialize = false) {
    return this.getReport('cohort_disaggregated', {
      'age_group': `${this.ageGroup}`,
      'rebuild_outcome': `${this.rebuildOutcome}`,
      'initialize': `${initialize}`,
      'quarter': this.quarter,
    })
  }

  getTxIpt() {
    return this.getReport('clients_given_ipt', { 
      'gender': this.gender, 
      'age_group': this.ageGroup 
    })
  }

  getTxCurrTB() {
    return this.getReport('screened_for_tb', { 
      'gender': this.gender, 
      'age_group': this.ageGroup 
    })
  }

  getRegimenDistribution() {
    return this.getReport('disaggregated_regimen_distribution', {
      'gender': this.gender,
      'age_group': this.ageGroup
    })
  }
}
