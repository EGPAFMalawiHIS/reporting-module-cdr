import { sortBy, uniq } from "@/utils/arrays"
import { AgeGroup, AggregatedReportData, Gender, MaternityData, ReportService } from "./report_service"
import { AGE_GROUPS } from "@/constants";

export const TPT_INITIATION_INDICATORS = {
  "3HP_new": "3H (Started New on ART)",
  "6H_new": "6H (Started New on ART)",
  "3HP_prev": "3H (Started Previously on ART)",
  "6H_prev": "6H (Started Previously on ART)",
}

export interface TptInitiationPatientData {
  "patient_id": number,
  "birthdate": string,
  "arv_number": string,
  "gender": Gender,
  "dispensation_date": string,
  "art_start_date": string,
  "tpt_start_date": string
} 

export type TptInitiationIndicator = keyof typeof TPT_INITIATION_INDICATORS;
export type Location = string;
export type TptInitiationIndicatorData = Record<TptInitiationIndicator, Array<TptInitiationPatientData>>;
export type TptInitiationRowData = TptInitiationIndicatorData & {
  gender: Gender;
  ageGroup: AgeGroup;
  location: string;
}

export type TptInitiationReportData = Record<AgeGroup, 
  Record<TptInitiationIndicator,
    Record<Gender, Array<TptInitiationPatientData>>
  >
> & {
  Location: string
};

export class TptReportService extends ReportService {
    constructor() {
        super()
    }

    async getCohort() {
        const data = await this.getReport('moh_tpt')
        return sortBy(data ?? [], 'gender');
    }

  async getTptNewInitiations() {
    return this.tptInitiationBuilder(
      await this.getReport(`tpt_newly_initiated`)
    )
  }

  private aggregateTptInitiationData(gender: Gender, indicator: TptInitiationIndicator, data: Array<TptInitiationPatientData>, result: AggregatedReportData<TptInitiationRowData>) {
    result[gender].aggregate[indicator] = [
      ...result[gender].aggregate[indicator] ?? [],
      ...data
    ]
  }
    
  private tptInitiationBuilder(data = {} as TptInitiationReportData) {
    const defaultData: AggregatedReportData<TptInitiationRowData> = { 
      M: { rows: [], aggregate: {} as TptInitiationIndicatorData }, 
      F: { rows: [], aggregate: {} as TptInitiationIndicatorData } 
    }

    return AGE_GROUPS.reduce((result, ageGroup) => {
      const rows = Object.entries(data[ageGroup]).reduce((row, [indicator, disag]) => {
        this.aggregateTptInitiationData("M", indicator as TptInitiationIndicator, disag.M, result);
        this.aggregateTptInitiationData("F", indicator as TptInitiationIndicator, disag.F, result);
        row.M[indicator as TptInitiationIndicator] = disag.M;
        row.F[indicator as TptInitiationIndicator] = disag.F;
        return row;
      }, 
      {
        M: { gender: "M", location: data.Location, ageGroup }, 
        F: { gender: "F", location: data.Location, ageGroup }
      } as Record<Gender, TptInitiationRowData>)
      result.F.rows.push(rows.F);
      result.M.rows.push(rows.M);
      return result;
    }, defaultData);
  }

  // Custom getMaternityData function to support report drilldowns
  async getMaternityRows(femaleData: Record<string, Array<TptInitiationPatientData>>, indicators: Array<string>) {
    const females = uniq(Object.values(femaleData).flat(1).map(({ patient_id }) => patient_id)) as Array<number>;
    const mStatus = await this.getMaternalStatus(females, "pepfar");
    const allFp = mStatus.FBf.concat(mStatus.FP);
    return ["FP", "FNP", "FBf"].map(gender => {
      return indicators.reduce((row, indicator) => {
        return {
          [indicator]: femaleData[indicator].filter(patient => {
            return gender === 'FNP' 
              ? !allFp.includes(patient.patient_id) 
              : mStatus[gender as keyof MaternityData].includes(patient.patient_id)
          }),
          ...row,
        }
      }, 
      {
        ageGroup: "All", 
        gender
      } as Record<string, any>)
    })
  }
}
