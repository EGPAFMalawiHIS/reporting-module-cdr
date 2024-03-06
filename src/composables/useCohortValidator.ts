import { ref } from "vue";

interface ValidationRule {
  indicators: string[];
  comparator: string;
  error: string;
}

function createValidationRule (indicators: string[], comparator: string, error: string): ValidationRule {
  return { indicators, comparator,  error};
}

function createSectionValidationRules (indicators: string[], section: string, error: string, altValues: Record<number, string> = {}): ValidationRule[] {
  return [
    createValidationRule(
      indicators,
      'total_registered',
      `Section ${section}: Total registered (Quartely) is not equal to ${error}`
    ),
    createValidationRule(
      indicators.map((indicator, index) => altValues[index] ?? `cum_${indicator}`),
      'cum_total_registered',
      `Section ${section}: Total registered (Cummulative) is not equal to ${error}`
    )
  ];
}

export const VALIDATION_RULES: ValidationRule[] = [
  ...createSectionValidationRules(
    [
      'initial_non_pregnant_females_all_ages',
      'males_initiated_on_art_first_time',
      'initial_pregnant_females_all_ages',
      'unknown_gender',
      're_initiated_on_art',
      'transfer_in'
    ],
    '26 - 32', 
    "Total FT + Re Patients re-initiated on ART + TI Patients transferred in on ART", 
  ),
  ...createSectionValidationRules(
    [
      'quarterly_all_males',
      'non_pregnant_females',
      'pregnant_females_all_ages'
    ],
    '33 - 35', 
    "M Males (all ages) + FNP Non-pregnant Females (all ages)  + FP Pregnant Females (all ages)", 
    { 0: 'cum_all_males' },
  ),
  ...createSectionValidationRules(
    [
      'children_below_24_months_at_art_initiation',
      'children_24_months_14_years_at_art_initiation',
      'adults_at_art_initiation'
    ],
    '36 - 38', 
    "A Children below 24 m at ART initiation + B Children 24 m - 14 yrs at ART initiation + C Adults 15 years+ at ART initiation", 
  ),
  ...createSectionValidationRules(
    [
      'presumed_severe_hiv_disease_in_infants',
      'confirmed_hiv_infection_in_infants_pcr',
      'quarterly_children_12_59_months',
      'pregnant_women',
      'breastfeeding_mothers',
      'who_stage_two',
      'asymptomatic',
      'who_stage_three',
      'who_stage_four',
      'unknown_other_reason_outside_guidelines'
    ],
    '39 - 48',
    `Pres. Sev. HIV disease age <12 m + PCR Infants <12 mths PCR + U5 Children 12-59 + mths Preg Pregnant women + BF Breastfeeding mothers 
    + CD4 CD4 below threshold + Asy Asymptomatic / mild + WHO stage 3 + WHO stage 4 + Unknown / reason outside guidelines`,
    { 2: 'cum_children_12_59_months' }
  ),
  ...createSectionValidationRules(
    [
     'no_tb',
     'tb_within_the_last_two_years',
     'current_episode_of_tb'
   ],
    '49 - 51',
    "Nev/>2yrs	Never TB / TB over 2 years ago + Last 2yrs	TB within the last 2 years + Curr Current episode of TB",
  ),
  createValidationRule(
    [
      'total_alive_and_on_art',
      'died_total',
      'defaulted',
      'stopped_art',
      'transfered_out'
    ],
    'cum_total_registered',
    `Section 53 - 61: Total registered (Cummulative) is not equal to
    Total alive and on ART + Died total + Defaulted (more than 2 months overdue after expected to have run out of ARVs 
      + Stopped taking ARVs (clinician or patient own decision, last known alive
      + Transferred Out`,
  ),
  createValidationRule(
    [
      'zero_p', 'zero_a', 'two_p', 'two_a', 'four_pp', 'four_pa', 'four_a',
      'five_a', 'six_a', 'seven_a', 'eight_a', 'nine_pp', 'nine_pa',
      'nine_a', 'ten_a', 'eleven_pp', 'eleven_pa', 'eleven_a',
      'twelve_pp', 'twelve_pa', 'twelve_a', 'unknown_regimen',
      'thirteen_a', 'fourteen_a', 'sixteen_a', 'seventeen_a',
      'fourteen_pp', 'fourteen_pa', 'fifteen_pp', 'fifteen_pa',
      'fifteen_a', 'sixteen_p', 'seventeen_pa', 'seventeen_pp'
    ],
    'total_alive_and_on_art',
    'Section 64 - 80: Total alive and on ART is not equal to Regimens sections'
  ),
  createValidationRule(
    [
      'total_pregnant_women',
      'total_breastfeeding_women',
      'total_other_patients'
    ],
    'total_alive_and_on_art',
    "Section 81 - 83: Total alive and on ART is not equal to Pregnant + Breastfeeding + All others (not circled)"
  ),
  createValidationRule(
    [
      'tb_not_suspected',
      'tb_suspected',
      'tb_confirmed_currently_not_yet_on_tb_treatment',
      'tb_confirmed_on_tb_treatment',
      'unknown_tb_status'
    ],
    "total_alive_and_on_art",
    "Section 84 - 88: Total alive and on ART is not equal to TB not suspected + TB suspected + TB conf., not on Rx + TB conf., on TB Rx + Unknown (not circled)"
  ),
  createValidationRule(
    [
      'total_patients_without_side_effects',
      'total_patients_with_side_effects',
      'unknown_side_effects'
    ],
    "total_alive_and_on_art",
    "Section 88 - 91: Total alive and on ART is not equal to None + Any side effects + Unknown (not circled)"
  ),
  createValidationRule(
    [
      'patients_with_0_6_doses_missed_at_their_last_visit',
      'patients_with_7_plus_doses_missed_at_their_last_visit',
      'patients_with_unknown_adhrence'
    ],
    "total_alive_and_on_art",
    "Section 92 - 94: Total alive and on ART is not equal to 0 - 3 doses missed + 4+ doses missed + Unknown (not circled)"
  )
];


export default function useCohortValidator (data: Record<string, number>) {
  return VALIDATION_RULES.filter(rule => {
    if (rule.indicators) {
      const sum = rule.indicators.reduce((sum: number, i: string) => sum + data[i], 0);
        return data[rule.comparator] !== sum
    }
    return false
  })
  .map(({ error }) => error);
}