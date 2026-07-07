import type { FieldValue, FormSectionConfig } from '../../types/feedback';

export function validateSection(
  section: FormSectionConfig,
  values: Record<string, FieldValue>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  section.fields.forEach((field) => {
    if (!field.required) return;
    const value = values[field.id];
    if (value === undefined || value === null || value === '') {
      errors[field.id] = 'This field is required.';
    }
  });

  return errors;
}
