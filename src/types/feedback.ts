export type FieldType = 'dropdown' | 'radio' | 'textarea';

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: FieldOption[];
  placeholder?: string;
}

export interface FormSectionConfig {
  id: string;
  title: string;
  fields: FieldConfig[];
}

export type FormConfig = FormSectionConfig[];

export type FieldValue = string | number | undefined;

export type ResponsesState = Record<string, Record<string, FieldValue>>;

export type ValidationErrorsState = Record<string, Record<string, string>>;
