import dayjs, { ConfigType, ManipulateType } from "dayjs";
import quarterPlugin from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterPlugin);

export const STANDARD_DATE_FORMAT = "YYYY-MM-DD";
export const STANDARD_DISPLAY_FORMAT = "DD/MMM/YYYY";

export interface Quarter {
  name: string;
  start: string;
  end: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export function toDisplayRangeFmt (range: null | Array<Date>) {
  return range?.map(toDisplayFmt).join(" → ") ?? "";
}

export function toDisplayFmt(date?: ConfigType) {
  return dayjs(date).format(STANDARD_DISPLAY_FORMAT);
}

export function toStandardFmt(date?: ConfigType) {
  return dayjs(date).format(STANDARD_DATE_FORMAT);
}

export function today() {
  return toStandardFmt();
}

export function tomorrow() {
  return toStandardFmt(dayjs().add(1, 'day'));
}

export function getAge(date: ConfigType, currentDate = dayjs()) {
  return currentDate.diff(date, 'years');
}

export function getQuarterDates(date: ConfigType) {
  const d = dayjs(date);
  const month = d.month();
  const year = d.year();

  if (month < 3) {
    return { start: `${year}-01-01`, end: `${year}-03-31` };
  } else if (month < 6) {
    return { start: `${year}-04-01`, end: `${year}-06-30` };
  } else if (month < 9) {
    return { start: `${year}-07-01`, end: `${year}-09-30` };
  } else {
    return { start: `${year}-10-01`, end: `${year}-12-31` };
  }
}

export function subtract(date: ConfigType, amount: number, unit?: ManipulateType) {
  return toStandardFmt(dayjs(date).subtract(amount, unit));
}

/**
 * Generates a list of quarter objects starting from the current quarter and going backwards.
 *
 * @param maxQuarters - The maximum number of quarters to generate, including the current quarter.
 * @returns An array of quarter objects.
 */
export function getReportQuarters(maxQuarters: number = 5) {
  const quarters: Array<Quarter> = [];
  let currentDate = dayjs();

  for (let i = 0; i < maxQuarters; i++) {
    quarters.push({ 
      start: currentDate.startOf('quarter').format('YYYY-MM-DD'), 
      end: currentDate.endOf('quarter').format('YYYY-MM-DD'), 
      name: `Q${currentDate.quarter()} ${currentDate.year()}`
    });
    currentDate = currentDate.subtract(1, 'quarter');
  }

  return quarters;
}

/**
 * @deprecated
 */
export default {
  today,
  tomorrow,
  toDisplayFmt,
  toStandardFmt,
  getAge,
  subtract,
  getQuarterDates,
  getReportQuarters,
  toDisplayRangeFmt,
}