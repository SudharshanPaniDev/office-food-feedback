import { Dropdown } from '../../../components/Dropdown';
import { Radio } from '../../../components/Radio';
import { TextArea } from '../../../components/TextArea';
import type { FieldValue, FormSectionConfig } from '../../../types/feedback';
import styles from './FormSection.module.css';

interface FormSectionProps {
  section: FormSectionConfig;
  values: Record<string, FieldValue>;
  errors: Record<string, string>;
  onChange: (fieldId: string, value: FieldValue) => void;
}

export function FormSection({ section, values, errors, onChange }: FormSectionProps) {
  return (
    <div className={styles.section}>
      {section.fields.map((field) => {
        const fieldId = `${section.id}-${field.id}`;
        const value = values[field.id];
        const error = errors[field.id];

        switch (field.type) {
          case 'dropdown': {
            const options = field.options ?? [];
            return (
              <Dropdown
                key={field.id}
                id={fieldId}
                label={field.label}
                required={field.required}
                options={options}
                value={value ?? ''}
                error={error}
                onChange={(event) => {
                  const selected = options.find((option) => String(option.value) === event.target.value);
                  onChange(field.id, selected?.value);
                }}
              />
            );
          }
          case 'radio':
            return (
              <Radio
                key={field.id}
                name={fieldId}
                label={field.label}
                required={field.required}
                options={field.options ?? []}
                value={value}
                onChange={(nextValue) => onChange(field.id, nextValue)}
              />
            );
          case 'textarea':
            return (
              <TextArea
                key={field.id}
                id={fieldId}
                label={field.label}
                required={field.required}
                placeholder={field.placeholder}
                value={value ?? ''}
                error={error}
                onChange={(event) => onChange(field.id, event.target.value)}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
