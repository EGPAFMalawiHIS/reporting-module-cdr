import { AGE_GROUPS, REGIMENS } from "@/constants";
import { AgeGroup, AggregatedReportData, Gender, ReportService } from "./report_service";
import { get } from "@/utils/common";

export const VL_COVERAGE_INDICATORS = {
  due_for_vl: "Due for VL",
  drawn: "Sample Drawn",
  high_vl: "High VL (>=1000 copies)",
  low_vl: "Low VL (<1000 copies)",
}

export type VlCoverageIndicator = keyof typeof VL_COVERAGE_INDICATORS;
export type VlCoverageIndicatorData = Record<VlCoverageIndicator, Array<number>>;
export type VlCoverageRowData = VlCoverageIndicatorData & {
  gender: Gender;
  ageGroup: AgeGroup;
}

export interface TargetedRoutineData { 
  targeted: Array<number>;
  routine: Array<number>
}

export type VlCoverageReportData = Record<AgeGroup, 
  Record<Gender, 
    Record<VlCoverageIndicator, Array<number> | TargetedRoutineData>
  >
>;

export class ViralLoadReportService extends ReportService {
  constructor() { super() }

  getVlCollection() {
    return this.getReport(`programs/${this.programId}/reports/vl_collection`)
  }
  
  async getVLCoverage(params = {} as Record<string, any>) {
    const data = await  this.getReport<VlCoverageReportData>(`programs/${this.programId}/reports/viral_load_coverage`, {
      'rebuild_outcomes': true,
      ...params
    });
    return this.vlCoverageBuilder(data);
  }

  async getViralLoad(params = {} as Record<string, any>) {
    const data = await this.getReport(`programs/${this.programId}/reports/vl_disaggregated`, params);
    return this.vlReportBuilder(data);
  }

  private combineRoutineAndTargetedPatients(data: Record<VlCoverageIndicator, Array<number> | TargetedRoutineData>) {
    return Object.entries(data).reduce((result, [indicator, patients]: any) => {
      result[indicator as VlCoverageIndicator] = Array.isArray(patients) 
        ? patients
        : patients.routine.concat(patients.targeted)
      return result;
    }, {} as Record<VlCoverageIndicator, Array<number>>);
  }
    

  private vlCoverageBuilder(data?: VlCoverageReportData): AggregatedReportData<VlCoverageRowData> {
    return Object.entries(data ?? {}).reduce((result, [ageGroup, disagData]) => {
      if (ageGroup !== 'Unknown') {
        Object.entries(disagData).forEach(([g, indicators]) => {
          const gender = g as Gender
          const indicatorsData = this.combineRoutineAndTargetedPatients(indicators);
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
    } as AggregatedReportData<VlCoverageRowData>);
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
