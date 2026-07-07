import styles from './FeedbackHeader.module.css';

interface FeedbackHeaderProps {
  logoText: string;
  title: string;
}

export function FeedbackHeader({ logoText, title }: FeedbackHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>{logoText}</div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
