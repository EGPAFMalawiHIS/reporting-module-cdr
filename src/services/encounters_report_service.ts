import { ApiCore } from "emr-api-client";
import { ReportService } from "./report_service";
import { encounterTypes as enc } from "@/constants";
import { parameterizeUrl } from "@/utils/url";

export interface EncounterStat {
  encounter: string;
  female: number;
  male: number;
  me: number;
  facility: number;
}

export const encounters = { 
  "HIV clinic registration": enc.HIV_CLINIC_REGISTRATION,
  "HIV reception": enc.HIV_RECEPTION,
  "Vitals": enc.VITALS,
  "HIV staging": enc.HIV_STAGING,
  "HIV clinic consultation": enc.HIV_CLINIC_CONSULTATION,
  "ART adherence": enc.ART_ADHERENCE,
  "Prescription": enc.TREATMENT,
  "Dispensing": enc.DISPENSING,
  "Appointments": enc.APPOUNTMENT,
};

export class EncounterReportService extends ReportService {
  constructor() {
    super()
  }

  buildEncounters (facility?: any, user?: any): Array<EncounterStat> {
    return Object.entries(encounters).map(([encounter, id]) => ({
      encounter,
      female: facility ? facility[id]["F"] : 0,
      male: facility ? facility[id]["M"] : 0,
      me: user ? user[id]["F"] + user[id]["M"] : 0,
      facility: facility ? facility[id]["F"] + facility[id]["M"] : 0,
    }))
  }

  async getStats () {
    const encounter_types = Object.values(encounters);
    const url = parameterizeUrl('reports/encounters', this.buildParams()) ;
    const userRes = await ApiCore.postJson<any>(url,  { encounter_types });
    const facilityRes = await ApiCore.postJson<any>(url,  { encounter_types, all: true });
    return this.buildEncounters(userRes.data, facilityRes.data);
  }
}
