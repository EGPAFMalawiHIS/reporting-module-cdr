import { PROGRAM_ID } from "@/constants";
import { ApiRequestParam } from "@/interfaces";
import { uniq } from "@/utils/arrays";
import HisDate from '@/utils/his_date';
import { parameterizeUrl } from "@/utils/url";
import apiClient from "@/api";import useFacility from "@/composables/useFacility";
;

export type AgeGroup = string;
export type IndicatorData = Record<string, Array<number>>;
export type Gender = "M" | "F"
export interface MaternityData {
  FBf: Array<number>;
  FP: Array<number>;
}

export type AggregatedReportData<T = any, K = any> = Record<Gender, {
  rows: Array<T>;
  aggregate: K;
}>;


export class ReportService {
  date: string;
  startDate: string;
  endDate: string;
  programId: number;
  useDefaultParams: boolean;

  constructor() {
    this.programId = PROGRAM_ID;
    this.date = HisDate.today();
    this.endDate = "";
    this.startDate = "";
    this.useDefaultParams = true;
  }

  setDate(date: string) {
    this.date = HisDate.toStandardFmt(date);
  }

  setStartDate(date: string) {
    this.startDate = HisDate.toStandardFmt(date);
  }

  setEndDate(date: string) {
    this.endDate = HisDate.toStandardFmt(date);
  }

  getDateIntervalPeriod() {
    return this.startDate && this.endDate 
      ? `${HisDate.toDisplayFmt(this.startDate)} - ${HisDate.toDisplayFmt(this.endDate)}`
      : "-"
  }

  protected buildParams(params?: ApiRequestParam) {
    let p: ApiRequestParam = { location: useFacility().facility.value?.id ?? -1 };
    if(this.useDefaultParams) {
      p['date'] = this.date;
      // p['program_id'] = this.programId;
    }
    if(this.startDate) p['start_date'] = this.startDate;
    if(this.endDate) p['end_date'] = this.endDate;
    if(params) p = {...p, ...params}
    return p
  }

  async getReport<T = any>(name: string, params?: ApiRequestParam) {
    return apiClient.getJson<T>(parameterizeUrl(`reports/${name}`, this.buildParams(params)));
  }

  /**
   * @deprecated this will be set to private in the next tag. Use {@link getMaternityData} instead.
   */
  async getMaternalStatus(patientIds: number[], reportDefinition = 'pepfar') {
    // const url = parameterizeUrl("vl_maternal_status", this.buildParams({ 'report_definition': reportDefinition }));
    // return apiClient.postJson<MaternityData>(url, {
    //   'patient_ids': patientIds
    // })
    return {
      FBf: [],
      FP: []
    } as MaternityData
  }

  async getMaternityData(femaleData: Record<string, Array<number>>, indicators: Array<string>, reportDefinition = 'pepfar') {
    const females = uniq(Object.values(femaleData).flat(1)) as Array<number>;
    const mStatus = await this.getMaternalStatus(females, reportDefinition);
    const allFp = mStatus.FBf.concat(mStatus.FP);
    return ["FP", "FNP", "FBf"].map(gender => {
      return indicators.reduce((row, indicator) => {
        return {
          [indicator]: femaleData[indicator].filter((id: number) => {
            const _id = parseInt(`${id}`); // Ensure id is a number
            return gender === 'FNP' 
              ? !allFp.includes(_id) 
              : mStatus[gender as keyof MaternityData].includes(_id)
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