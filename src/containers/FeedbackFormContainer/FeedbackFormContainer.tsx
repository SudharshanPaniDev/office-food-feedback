import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Toast } from '../../components/Toast';
import { FeedbackForm } from '../../features/feedback/FeedbackForm';
import { loadDraft, saveDraft, clearDraft } from '../../services/localStorageService';
import { fetchForm, saveStep, submitFeedback } from '../../services/mockApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  clearSectionErrors,
  hydrateResponses,
  resetForm,
  setActiveTab,
  setFieldValue,
  setFormConfig,
  setLoading,
  setSectionErrors,
  setSubmitting,
} from '../../store/feedbackSlice';
import type { FieldValue, ResponsesState } from '../../types/feedback';
import { validateSection } from './validation';
import styles from './FeedbackFormContainer.module.css';

const LOGO_TEXT = 'Brand Logo';
const PAGE_TITLE = 'Office Food Feedback';
const VALIDATION_ERROR_MESSAGE = 'Please fill in all required fields before continuing.';
const LOAD_ERROR_MESSAGE = 'Failed to load the feedback form. Please try again.';
const SAVE_STEP_ERROR_MESSAGE = 'Failed to save this step. Please try again.';
const SUBMIT_ERROR_MESSAGE = 'Failed to submit your feedback. Please try again.';

interface FeedbackFormContainerProps {
  onSubmitted: () => void;
}

export function FeedbackFormContainer({ onSubmitted }: FeedbackFormContainerProps) {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.feedback.activeTab);
  const formConfig = useAppSelector((state) => state.feedback.formConfig);
  const responses = useAppSelector((state) => state.feedback.responses);
  const validationErrors = useAppSelector((state) => state.feedback.validationErrors);
  const isLoading = useAppSelector((state) => state.feedback.isLoading);
  const isSubmitting = useAppSelector((state) => state.feedback.isSubmitting);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const lastSavedResponsesRef = useRef<ResponsesState>({});

  const loadForm = useCallback(() => {
    setLoadError(null);
    dispatch(setLoading(true));
    fetchForm()
      .then((config) => {
        dispatch(setFormConfig(config));
        const draft = loadDraft();
        if (draft) {
          dispatch(hydrateResponses(draft.responses));
          dispatch(setActiveTab(draft.activeTab));
          lastSavedResponsesRef.current = draft.responses;
        } else {
          lastSavedResponsesRef.current = {};
        }
      })
      .catch(() => {
        setLoadError(LOAD_ERROR_MESSAGE);
      })
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  useEffect(() => {
    loadForm();
  }, [loadForm]);

  const currentSection = formConfig[activeTab];

  const handleFieldChange = useCallback(
    (fieldId: string, value: FieldValue) => {
      if (!currentSection) return;
      dispatch(setFieldValue({ sectionId: currentSection.id, fieldId, value }));
    },
    [dispatch, currentSection],
  );

  if (isLoading) {
    return <div className={styles.statusWrapper}>Loading feedback form...</div>;
  }

  if (loadError || !currentSection) {
    return (
      <div className={styles.statusWrapper}>
        <p>{loadError ?? LOAD_ERROR_MESSAGE}</p>
        <Button type="button" onClick={loadForm}>
          Retry
        </Button>
      </div>
    );
  }

  const sectionValues = responses[currentSection.id] ?? {};
  const sectionErrors = validationErrors[currentSection.id] ?? {};
  const isFirstTab = activeTab === 0;
  const isLastTab = activeTab === formConfig.length - 1;

  const handlePrevious = () => {
    dispatch(setActiveTab(activeTab - 1));
  };

  const handleNext = async () => {
    const errors = validateSection(currentSection, sectionValues);
    if (Object.keys(errors).length > 0) {
      dispatch(setSectionErrors({ sectionId: currentSection.id, errors }));
      setToastMessage(VALIDATION_ERROR_MESSAGE);
      return;
    }
    dispatch(clearSectionErrors(currentSection.id));

    const nextTab = activeTab + 1;
    const lastSavedValues = lastSavedResponsesRef.current[currentSection.id] ?? {};
    const hasUnsavedChanges = JSON.stringify(sectionValues) !== JSON.stringify(lastSavedValues);

    if (!hasUnsavedChanges) {
      dispatch(setActiveTab(nextTab));
      return;
    }

    try {
      saveDraft({ activeTab: nextTab, responses });
      await saveStep(currentSection.id, sectionValues);
      lastSavedResponsesRef.current = { ...lastSavedResponsesRef.current, [currentSection.id]: sectionValues };
      dispatch(setActiveTab(nextTab));
    } catch {
      setToastMessage(SAVE_STEP_ERROR_MESSAGE);
    }
  };

  const handleSubmit = async () => {
    const errors = validateSection(currentSection, sectionValues);
    if (Object.keys(errors).length > 0) {
      dispatch(setSectionErrors({ sectionId: currentSection.id, errors }));
      setToastMessage(VALIDATION_ERROR_MESSAGE);
      return;
    }
    dispatch(clearSectionErrors(currentSection.id));

    dispatch(setSubmitting(true));
    try {
      await submitFeedback(responses);
      clearDraft();
      dispatch(resetForm());
      onSubmitted();
    } catch {
      setToastMessage(SUBMIT_ERROR_MESSAGE);
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  return (
    <>
      <FeedbackForm
        logoText={LOGO_TEXT}
        title={PAGE_TITLE}
        tabs={formConfig.map((section) => ({ id: section.id, label: section.title }))}
        activeIndex={activeTab}
        completedIndexes={Array.from({ length: activeTab }, (_, index) => index)}
        currentSection={currentSection}
        values={sectionValues}
        errors={sectionErrors}
        onFieldChange={handleFieldChange}
        isFirstTab={isFirstTab}
        isLastTab={isLastTab}
        isSubmitting={isSubmitting}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
      />
      {toastMessage && <Toast message={toastMessage} variant="error" onDismiss={() => setToastMessage(null)} />}
    </>
  );
}
