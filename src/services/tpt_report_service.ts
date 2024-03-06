import { sortBy } from "@/utils/arrays"
import { ReportService } from "./report_service"

export class TptReportService extends ReportService {
    constructor() {
        super()
    }

    async getCohort() {
        const data = await this.getReport('moh_tpt')
        return sortBy(data ?? [], 'gender');
    }
}
