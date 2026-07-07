import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
}

export function Card({ children, ...rest }: CardProps) {
  return (
    <div className={styles.card} {...rest}>
      {children}
    </div>
  );
}
