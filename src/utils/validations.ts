import { isEmpty } from "./common"

export enum ValidationRule {
  REQUIRED = 'required',
  MAX = 'max',
  MIN = 'min',
  IN_RANGE = 'in'
}

/**
 * Validate a value against a set of validation rules.
 *
 * @param value - The value to validate.
 * @param rules - Validation rules defined as a pipe-separated string or an array of strings.
 * @returns A comma separated error messages.
 */
export function validate(value: any, rules?: string | Array<string>) {
  const errors: Array<string> = [];
  if (!isEmpty(rules)) {
    const rs = typeof rules === 'string' ? rules.split('|') : rules as Array<string>;
    rs.forEach(rule => {
      const [ruleName, ...args] = /\:/i.test(rule) ? rule.split(':') : [rule]
      const err = validateRule(ruleName, value, args);
      if (!err) errors.push(err)
    })
  }
  return errors.join();
}

/**
 * Validate a value against a specific validation rule.
 *
 * @param rule - The name of the validation rule to apply.
 * @param value - The value to validate.
 * @param args - (Optional) Additional arguments needed for the validation rule.
 * @returns An error message if the validation rule fails; otherwise, an empty string.
 */
export function validateRule(rule: string, value: any, args: Array<string>) {
  switch (rule) {
    case 'required':
      return required(value);
    case 'max':
      return max(value, parseInt(args[0]));
    case 'min': 
      return min(value, parseInt(args[0]));
    case 'inRange': 
      return inRange(value, parseInt(args[0]), parseInt(args[1]))
    default:
      throw new Error("Unknown Validation rule")
  }
}

/**
 * Validate that a value is not empty (e.g., null, undefined, empty string, or empty array).
 *
 * @param value - The value to check for emptiness.
 * @returns An error message if the value is empty; otherwise, an empty string.
 */
export function required(value: any) {
  return isEmpty(value)
    ? "Value is required"
    : ''
}

/**
 * Validate a value against a maximum limit, either for its numeric value or string length.
 *
 * @param value - The value to validate, which can be a number or a string.
 * @param limit - The maximum limit for the value.
 * @returns An error message if the value exceeds the limit; otherwise, an empty string.
 */
export function max(value: number | string, limit: number): string {
  const v = value as string;
  if (isNaN(parseInt(v)) && v.length > limit) {
    return `Length must be less than or equal to ${limit}`;
  }
  if (isFinite(parseFloat(v)) && parseFloat(v) > limit) {
    return `Value must be less than or equal to ${limit}`;
  }
  return '';
}

/**
 * Validate a value against a minimum limit, either for its numeric value or string length.
 *
 * @param value - The value to validate, which can be a number or a string.
 * @param limit - The minimum limit for the value.
 * @returns An error message if the value exceeds the limit; otherwise, an empty string.
 */
export function min(value: number | string, limit: number): string {
  const v = value as string;
  if (isNaN(parseInt(v)) && v.length < limit) {
    return `Length must be more than or equal to ${limit}`;
  }
  if (isFinite(parseFloat(v)) && parseFloat(v) < limit) {
    return `Value must be more than or equal to ${limit}`;
  }
  return '';
}

/**
 * Validate a value against a minimum and maximum limit, either for its numeric value or string length.
 *
 * @param value - The value to validate, which can be a number or a string.
 * @param minLimit - The minimum limit for the value.
 * @param maxLimit - The maximum limit for the value
 * @returns An error message if the value exceeds the limits; otherwise, an empty string.
 */
export function inRange(value: number | string, minLimit: number, maxLimit: number): string {
  return min(value, minLimit) && max(value, maxLimit);
}