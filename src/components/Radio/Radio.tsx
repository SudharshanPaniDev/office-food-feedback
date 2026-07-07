import styles from './Radio.module.css';

export interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioProps {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  options: RadioOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
}

export function Radio({ name, label, error, required, options, value, onChange }: RadioProps) {
  return (
    <div className={styles.field}>
      {label && (
        <span className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </span>
      )}
      <div className={styles.optionsRow}>
        {options.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
