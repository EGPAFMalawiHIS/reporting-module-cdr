import { AgeGroup, Gender, ReportService } from "./report_service";

export const TX_ML_INDICATORS = [
  'Died',
  'IIT <3 mo',
  'IIT 3-5 mo',
  'IIT 6+ mo',
  'Transferred out',
  'Refused (Stopped)'
]

export const TX_TB_INDICATORS = {
  'tx_curr': 'TX_CURR',
  'symptom_screen_alone': 'Symptom Screen (alone)',
  'cxr_screen': 'CXR Screen', 
  'mwrd_screen': 'mWRD Screen', 
  'sceen_pos_new': 'New on ART/Screen Positive',
  'sceen_neg_new': 'New on ART/Screen Negative',
  'sceen_pos_prev': 'Already on ART/Screen Positive',
  'sceen_neg_prev': 'Already on ART/Screen Negative',
  'started_tb_new': 'Started TB RX_New on ART',
  'started_tb_prev': 'Started TB RX_Prev on ART'
};

export type TxTbIndicator = keyof typeof TX_TB_INDICATORS;
export type TxTbIndicatorData = Record<TxTbIndicator, Array<number>>;
export type TxTbReportData = Record<AgeGroup,
  Record<Gender,
    Record<TxTbIndicator,
      Array<number>
    >
  >
>;

export type TxTbRowData = TxTbIndicatorData & {
  gender: Gender;
  ageGroup: AgeGroup;
};

export class TxReportService extends ReportService {
  reportType: "pepfar" | "moh" | "clinic";
  initialize: boolean;
  constructor() {
    super()
    this.reportType = "pepfar";
    this.initialize = true;
  }

  setReportType(reportType: typeof this.reportType) {
    this.reportType = reportType;
  }

  setInitialize(initialize: boolean) {
    this.initialize = initialize;
  }

  getTxCurrMMDReport(minAge: number, maxAge: number) {
    return this.getReport('arv_refill_periods', {
        'org': this.reportType,
        'min_age': `${minAge}`,
        'max_age': `${maxAge}`,
        'initialize_tables': `${this.initialize}`
    })
  }

  getTxMlReport() {
    return this.getReport('tx_ml')
  }

  getTxRttReport() {
    return this.getReport('tx_rtt')
  }

  async getTxTbReport(rebuild_outcome: boolean) {
    return this.getReport(`tx_tb`, { 
      rebuild_outcome 
    });
  }

  getTxNewReport(rebuild: boolean) {
    return this.getReport(`tx_new`, {
      rebuild
    });
  }
}
