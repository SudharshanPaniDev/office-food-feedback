import type { ResponsesState } from '../types/feedback';

const DRAFT_KEY = 'foodFeedback.draft';

export interface DraftPayload {
  activeTab: number;
  responses: ResponsesState;
}

export function saveDraft(payload: DraftPayload): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  } catch {
    // storage unavailable (e.g. private browsing) — draft persistence is best-effort
  }
}

export function loadDraft(): DraftPayload | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as DraftPayload) : null;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // storage unavailable — nothing to clear
  }
}
