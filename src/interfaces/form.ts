export const FORM_DATA_KEY = Symbol('form_data');
export const FORM_ERRORS_KEY = Symbol('form_errors');
export const COMPUTED_FORM_DATA_KEY = Symbol('alternative_form_data_values');

export type FormData = Record<string, any>;
export type FormErrors = Record<string, string>;
export type ComputedFormData = Record<string, any>;
export type ComputedValueFunction = (value: any, formData: FormData, computedValues: ComputedFormData) => any;
export type OptionsFunction = (filter: OptionsFilter, fdata: FormData, cdata: ComputedFormData) => Promise<Array<Option>> | Array<Option>
export type ConditionFunction = (fdata: FormData, cdata: ComputedFormData) => boolean;

export interface OptionDescription {
  color: 'primary' | 'warning' | 'danger' | 'secondary' | 'light';
  show?: 'onChecked' | 'always';
  text: string;
}

export interface Option {
  label: string;
  value: string | number;
  other?: any;
  isChecked?: boolean;
  disabled?: boolean;
  description?: OptionDescription;
}

export interface OptionsFilter {
  search: string;
  page: number;
  perPage: number;
}

export interface FormField {
  id: string;
  defaultValue?: any;
  label?:string;
  placeholder?: string;
  disabled?: string;
  prefixValue?: string;
  suffixValue?: string;
  rules?: string | Array<string>;
  options?: Array<Option> | OptionsFunction;
  condition?: boolean | ConditionFunction;
  computedValue?: ComputedValueFunction;
}