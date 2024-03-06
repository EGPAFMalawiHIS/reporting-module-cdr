import { ReportService } from "./report_service";
import HisDate from "@/utils/his_date";

export class DashboardService extends ReportService {
  constructor() {
    super();
  }

  async getVisits() {
    this.useDefaultParams = false;
    const res = await this.getReport(`programs/${this.programId}/reports/visits`, {
      'name': 'visits',
    })
    this.useDefaultParams = true;
    const dates: string[] = []
    const complete: number[] = []
    const incomplete: number[] = []
    if(res.ok){
      Object.keys(res.data).forEach(day => {
        dates.push(HisDate.toDisplayFmt(day))
        complete.push(res.data[day].complete)
        incomplete.push(res.data[day].incomplete)
      })
    }
    return { dates, complete, incomplete }
  }

  getMissedAppointments() {
    return this.getReport('missed_appointments')
  }

  getAppointmentsDue(date: string) {
    return this.getReport(`programs/${this.programId}/booked_appointments`, {
      date: date
    })
  }

  getPatientsDueForVL() {
    return this.getReport(`programs/${this.programId}/reports/vl_due`)
  }

  getDefaulters() {
    return this.getReport('defaulter_list', {
      'pepfar': true
    })
  }

  getPatientsOnDTG() {
    return this.getReport(`programs/${this.programId}/reports/patients_on_dtg`)
  }

  async getTXCurrent(period: number) {
    return this.getReport(`programs/${this.programId}/reports/tx_curr`, {
      start_date: HisDate.subtract(
        this.startDate,
        period,
        "days"
      )
    })
  }
}