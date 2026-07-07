import { formConfig } from '../config/formConfig';
import type { FieldValue, FormConfig, ResponsesState } from '../types/feedback';

const LATENCY_MS = 500;

interface ApiResult {
  success: boolean;
}

export function fetchForm(): Promise<FormConfig> {
  console.log('[mockApi] fetchForm() called');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('[mockApi] fetchForm() resolved', formConfig);
      resolve(formConfig);
    }, LATENCY_MS);
  });
}

export function saveStep(sectionId: string, sectionValues: Record<string, FieldValue>): Promise<ApiResult> {
  console.log('[mockApi] saveStep() called', { sectionId, sectionValues });
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('[mockApi] saveStep() resolved', { sectionId });
      resolve({ success: true });
    }, LATENCY_MS);
  });
}

export function submitFeedback(responses: ResponsesState): Promise<ApiResult> {
  console.log('[mockApi] submitFeedback() called', responses);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('[mockApi] submitFeedback() resolved', responses);
      resolve({ success: true });
    }, LATENCY_MS);
  });
}
