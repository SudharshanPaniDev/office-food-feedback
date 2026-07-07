import { Button } from '../../../components/Button';
import styles from './Navigation.module.css';

interface NavigationProps {
  isFirstTab: boolean;
  isLastTab: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function Navigation({ isFirstTab, isLastTab, isSubmitting, onPrevious, onNext, onSubmit }: NavigationProps) {
  return (
    <div className={styles.navigation}>
      <Button variant="secondary" type="button" disabled={isFirstTab} onClick={onPrevious}>
        Previous
      </Button>
      {isLastTab ? (
        <Button type="button" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      ) : (
        <Button type="button" onClick={onNext}>
          Next
        </Button>
      )}
    </div>
  );
}
