import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FieldValue, FormConfig, ResponsesState, ValidationErrorsState } from '../types/feedback';

interface FeedbackState {
  activeTab: number;
  formConfig: FormConfig;
  responses: ResponsesState;
  validationErrors: ValidationErrorsState;
  isLoading: boolean;
  isSubmitting: boolean;
}

const initialState: FeedbackState = {
  activeTab: 0,
  formConfig: [],
  responses: {},
  validationErrors: {},
  isLoading: false,
  isSubmitting: false,
};

interface SetFieldValuePayload {
  sectionId: string;
  fieldId: string;
  value: FieldValue;
}

interface SetSectionErrorsPayload {
  sectionId: string;
  errors: Record<string, string>;
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setFormConfig(state, action: PayloadAction<FormConfig>) {
      state.formConfig = action.payload;
    },
    hydrateResponses(state, action: PayloadAction<ResponsesState>) {
      state.responses = action.payload;
    },
    setFieldValue(state, action: PayloadAction<SetFieldValuePayload>) {
      const { sectionId, fieldId, value } = action.payload;
      if (!state.responses[sectionId]) {
        state.responses[sectionId] = {};
      }
      state.responses[sectionId][fieldId] = value;
    },
    setSectionErrors(state, action: PayloadAction<SetSectionErrorsPayload>) {
      state.validationErrors[action.payload.sectionId] = action.payload.errors;
    },
    clearSectionErrors(state, action: PayloadAction<string>) {
      delete state.validationErrors[action.payload];
    },
    setActiveTab(state, action: PayloadAction<number>) {
      state.activeTab = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload;
    },
    resetForm(state) {
      state.activeTab = 0;
      state.responses = {};
      state.validationErrors = {};
      state.isSubmitting = false;
    },
  },
});

export const {
  setFormConfig,
  hydrateResponses,
  setFieldValue,
  setSectionErrors,
  clearSectionErrors,
  setActiveTab,
  setLoading,
  setSubmitting,
  resetForm,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
export type { FeedbackState };
