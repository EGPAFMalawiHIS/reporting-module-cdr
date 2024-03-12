import { AGE_GROUPS, REGIMENS } from "@/constants";
import { AgeGroup, AggregatedReportData, Gender, ReportService } from "./report_service";
import { get } from "@/utils/common";

export const TX_PVLS_INDICATORS = {
  'tx_curr': "TX_CURR",
  'due_for_vl': "Due for VL",
  'drawn_routine': "Routine (Sample Drawn)",
  'drawn_targeted': "Targeted (Sample Drawn)",
  'high_vl_routine': "Routine (High VL (>=1000 copies))",
  'high_vl_targeted': "Targeted (High VL (>=1000 copies))",
  'low_vl_routine': "Routine (Low VL (<1000 copies))",
  'low_vl_targeted': "Targeted (Low VL (<1000 copies))",
}

export type TxPVLSIndicator = keyof typeof TX_PVLS_INDICATORS;
export type TxPVLSIndicatorData = Record<TxPVLSIndicator, Array<number>>;
export type TxPVLSRowData = TxPVLSIndicatorData & {
  gender: Gender;
  ageGroup: AgeGroup;
}

export interface TargetedRoutineData { 
  targeted: Array<number>;
  routine: Array<number>
}

export type TxPVLSReportData = Record<AgeGroup, 
  Record<Gender, 
    Record<string, Array<number> | TargetedRoutineData>
  >
>;

export class ViralLoadReportService extends ReportService {
  constructor() { super() }

  getVlCollection() {
    return this.getReport(`vl_collection`)
  }
  
  async getTxPVLS(params = {} as Record<string, any>) {
    const data = await  this.getReport<TxPVLSReportData>(`viral_load_coverage`, {
      'rebuild_outcomes': true,
      ...params
    });
    return this.txPVLSBuilder(data);
  }

  async getViralLoad(params = {} as Record<string, any>) {
    const data = await this.getReport(`vl_disaggregated`, params);
    return this.vlReportBuilder(data);
  }

  private flattenTxPVLSData (data: Record<string, Array<number> | TargetedRoutineData>) {
    return Object.entries(data).reduce((result, [indicator, data]) => {
      if(Array.isArray(data)) {
        result[indicator as TxPVLSIndicator] = data;
      } else {
        result[`${indicator}_routine` as TxPVLSIndicator] = data.routine;
        result[`${indicator}_targeted` as TxPVLSIndicator] = data.targeted;
      }
      return result;
    }, {} as TxPVLSIndicatorData)
  }
    
  private txPVLSBuilder(data?: TxPVLSReportData): AggregatedReportData<TxPVLSRowData> {
    return Object.entries(data ?? {}).reduce((result, [ageGroup, disagData]) => {
      if (ageGroup !== 'Unknown') {
        Object.entries(disagData).forEach(([g, indicators]) => {
          const gender = g as Gender
          const indicatorsData = this.flattenTxPVLSData(indicators);
          result[gender].rows.push({ ageGroup, gender, ...indicatorsData });
          Object.entries(indicatorsData).forEach(([indicator, values]) => {
            result[gender].aggregate[indicator] = [
              ...(result[gender].aggregate[indicator] ?? []),
              ...(values ?? [])
            ];
          });
        });
      }
      return result;
    }, {
      M: { rows: [], aggregate: {} }, 
      F: { rows: [], aggregate: {} }
    } as AggregatedReportData<TxPVLSRowData>);
  }
  
  private vlReportBuilder(data?: Record<string, any>) {
    return AGE_GROUPS.map(ageGroup => {
      return [...REGIMENS, "N/A"].reduce((row, regimen) => {
        row[regimen] = get(data, `${ageGroup.replace("-", " - ")}.${regimen}`, 0)
        return row;
      }, { ageGroup } as Record<string, any>)
    })
  }
}
