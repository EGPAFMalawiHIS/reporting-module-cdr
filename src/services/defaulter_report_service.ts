import { ReportService } from "./report_service";

export class DefaulterReportService extends ReportService {
  pepfar: boolean;
  constructor() {
      super()
      this.pepfar = true
  }

  setIsPepfar(y: boolean) {
      this.pepfar = y
  }

  getDefaulters() {
      return this.getReport('defaulter_list', { pepfar : this.pepfar })
  }
}
