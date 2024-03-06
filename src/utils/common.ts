/**
 * Checks if a value is "empty".
 *
 * @param value - The value to check for emptiness.
 * @returns `true` if the value is `null` or `undefined`, an empty string, an empty array, or an empty object.
 * Returns `false` otherwise.
 */
export function isEmpty(value: any): boolean {
  return value == null 
    || value == undefined 
    || (Array.isArray(value) && !value.length) 
    || (typeof value === 'object' && !Object.keys(value).length) 
    || !value;
}

/**
 * Sanitizes the input string by removing HTML tags and unnecessary whitespace.
 * It also replaces certain characters (like '=', ',') with a space.
 *
 * @param {string} str - The input string to be sanitized.
 * @return {string} The sanitized string.
 */
export function sanitizeStr(str: string): string {
  return str
    .replace(/<(?:.|\n)*?>/gm, ' ')
    .replace(/(\r\n|\n|\r|\t|\s{2,}|[=,])/g, ' ')
    .trim();
}

/**
 * Safely retrieves the value at the specified path from an object or array
 * If the path or value is undefined, it returns a default value.
 *
 * @param {any} obj - The object from which to retrieve the value.
 * @param {string} path - The path to the desired property, e.g., 'a.b[0].c'.
 * @param {any} [defaultValue=undefined] - The default value to return if the path or value is undefined.
 * @return {any} The retrieved value or the default value.
 */
export function get(obj: any, path: string, defaultValue?: any): any {
  return path
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.')
    .reduce((result: any, key: any) =>  result?.[key] ?? defaultValue, obj);
}

/**
 * Parses an ARV number and returns the numeric value
 *
 * @param {string} arvNumber - The ARV number to be parsed, formatted as "ARV-sitePrifx-number".
 * @returns {number} The parsed numeric value from the number segment. Returns infinity if parsing fails.
 */
export function parseARVNumber(arvNumber: string): number {
  return parseInt(arvNumber.split("-")[2]) || Infinity;
}

/**
 * Convert gender string to acceptable/standard dispay format
 * 
 * @param gender gender string to be standardized
 * @returns a standardized gender string. 
 */
export function toDisplayGenderFmt(gender: string) {
  const upCaseGender = `${gender}`.toUpperCase()
  if (upCaseGender === 'M' || upCaseGender === 'MALE') {
      return 'Male'
  }
  if (upCaseGender === 'F' || upCaseGender === 'FEMALE') {
      return 'Female'
  }
  if (/fbf|fnp|fp/i.test(gender)) {
      return upCaseGender
  }
  return gender
}

/**
 * Parses an age group string into an age range array.
 * @param {string} ageGroup - The age group string to parse.
 * @returns {number[]} - An array representing the age range [minAge, maxAge].
 *
 * @example
 * parseAgeRange('<1 year'); // Returns [0, 0]
 * parseAgeRange('20-30 years'); // Returns [20, 30]
 * parseAgeRange('90 plus years'); // Returns [90, 1000]
 */
export function parseAgeGroup (ageGroup: string): number[] {
  if (ageGroup === '<1 year') return [0, 0]
  if (ageGroup === '90 plus years') return [90, 1000]
  return ageGroup.split('-').map(age => parseInt(age, 10));
}