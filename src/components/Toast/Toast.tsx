import { useEffect } from 'react';
import styles from './Toast.module.css';

export type ToastVariant = 'error' | 'success';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onDismiss: () => void;
}

export function Toast({ message, variant = 'error', duration = 3000, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  const variantClass = variant === 'error' ? styles.error : styles.success;

  return (
    <div className={[styles.toast, variantClass].join(' ')} role="alert">
      {message}
    </div>
  );
}
