import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import styles from './ThankYou.module.css';

interface ThankYouProps {
  message: string;
  restartLabel: string;
  onRestart: () => void;
}

export function ThankYou({ message, restartLabel, onRestart }: ThankYouProps) {
  return (
    <Card>
      <div className={styles.wrapper}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.heading}>Thank You!</h1>
        <p className={styles.message}>{message}</p>
        <Button type="button" onClick={onRestart}>
          {restartLabel}
        </Button>
      </div>
    </Card>
  );
}
