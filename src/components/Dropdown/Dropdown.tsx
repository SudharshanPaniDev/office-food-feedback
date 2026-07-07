import type { SelectHTMLAttributes } from 'react';
import styles from './Dropdown.module.css';

export interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'className'> {
  label?: string;
  error?: string;
  required?: boolean;
  options: DropdownOption[];
  placeholder?: string;
}

export function Dropdown({
  label,
  error,
  required,
  options,
  placeholder = 'Select an option',
  id,
  ...rest
}: DropdownProps) {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <select
        id={id}
        className={[styles.select, error ? styles.selectError : ''].filter(Boolean).join(' ')}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
