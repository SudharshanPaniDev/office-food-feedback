import { Card } from '../../../components/Card';
import type { TabItem } from '../../../components/Tabs';
import type { FieldValue, FormSectionConfig } from '../../../types/feedback';
import { FeedbackHeader } from '../FeedbackHeader';
import { FormSection } from '../FormSection';
import { Navigation } from '../Navigation';
import { ProgressTabs } from '../ProgressTabs';
import styles from './FeedbackForm.module.css';

interface FeedbackFormProps {
  logoText: string;
  title: string;
  tabs: TabItem[];
  activeIndex: number;
  completedIndexes: number[];
  currentSection: FormSectionConfig;
  values: Record<string, FieldValue>;
  errors: Record<string, string>;
  onFieldChange: (fieldId: string, value: FieldValue) => void;
  isFirstTab: boolean;
  isLastTab: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function FeedbackForm({
  logoText,
  title,
  tabs,
  activeIndex,
  completedIndexes,
  currentSection,
  values,
  errors,
  onFieldChange,
  isFirstTab,
  isLastTab,
  isSubmitting,
  onPrevious,
  onNext,
  onSubmit,
}: FeedbackFormProps) {
  return (
    <div className={styles.page}>
      <FeedbackHeader logoText={logoText} title={title} />
      <ProgressTabs tabs={tabs} activeIndex={activeIndex} completedIndexes={completedIndexes} />
      <Card>
        <FormSection section={currentSection} values={values} errors={errors} onChange={onFieldChange} />
        <Navigation
          isFirstTab={isFirstTab}
          isLastTab={isLastTab}
          isSubmitting={isSubmitting}
          onPrevious={onPrevious}
          onNext={onNext}
          onSubmit={onSubmit}
        />
      </Card>
    </div>
  );
}
