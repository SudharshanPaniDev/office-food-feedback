# Office Food Feedback System

Config-driven, multi-step feedback form built with React + TypeScript, following a **Component-Container Architecture**.

## Stack

- React + TypeScript (Vite)
- Redux Toolkit / React Redux
- CSS Modules
- No UI libraries (no MUI/Chakra/AntD/Bootstrap)

## Architecture

```
src/
├── components/    reusable, presentation-only UI primitives (Button, Card, Input,
│                  Dropdown, Radio, Tabs, TextArea, Toast) — no Redux, no API, no logic
├── features/
│   └── feedback/  feedback-specific presentational components (FeedbackForm,
│                  FeedbackHeader, ProgressTabs, FormSection, Navigation, ThankYou)
│                  — render props only, no Redux/API/localStorage/validation
├── containers/    orchestration layer — owns Redux, validation, API calls,
│                  localStorage, and navigation (FeedbackFormContainer, ThankYouContainer)
├── store/         Redux Toolkit store + feedbackSlice
├── config/        formConfig.ts — the config that drives the entire form
├── services/      mockApi.ts (fetchForm/saveStep/submitFeedback) and
│                  localStorageService.ts (saveDraft/loadDraft/clearDraft)
└── types/         shared TypeScript types
```

## Form

Three tabs, entirely generated from `src/config/formConfig.ts` — no hardcoded fields:

1. **Food Quality** — overall quality, taste, temperature, portion size, freshness, comments
2. **Cleanliness** — counter/staff/utensils/presentation/serving-area hygiene, comments
3. **Service Experience** — courtesy, responsiveness, queue management, concerns addressed, overall experience, comments

Adding a field to the config renders it automatically — no component changes required.

## Data flow

```
mount → fetchForm() [mock] → setFormConfig → loadDraft() [localStorage] → hydrate Redux
  → user edits fields → setFieldValue (Redux)
  → click Next → validate current tab
      → invalid: inline errors + toast, no navigation
      → valid, unchanged since last save: navigate only, no API/localStorage call
      → valid, changed: saveDraft() + saveStep() [mock] → navigate
  → final tab → Submit → validate → submitFeedback() [mock] → clearDraft() → Thank You page
```

Validation runs per-tab, on Next/Submit only. Required-field errors render inline beneath each field, plus a toast notification. API/localStorage failures surface as error toasts (or a retry screen for the initial form load) without losing entered data.

## Run

```bash
npm install
npm run dev      # start dev server
npm run build    # production build (runs tsc -b first)
```

## Notes

- `services/mockApi.ts` simulates a backend with `setTimeout` latency; all calls log to the console (`[mockApi] ...`) since there's no real backend to inspect.
- Redux is the single source of truth for form state (`activeTab`, `formConfig`, `responses`, `validationErrors`, `isLoading`, `isSubmitting`).
- Drafts persist in `localStorage` under `foodFeedback.draft` and are cleared on successful submission.
