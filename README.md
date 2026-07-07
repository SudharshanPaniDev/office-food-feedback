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

## Acceptance criteria

- [ ] Form is entirely config-driven — adding a field to `formConfig.ts` renders it with no changes to any UI component.
- [ ] Redux (`feedbackSlice`) is the single source of truth: `activeTab`, `formConfig`, `responses`, `validationErrors`, `isLoading`, `isSubmitting`.
- [ ] `components/` are pure UI — no Redux, no API calls, no localStorage, no validation, no business logic.
- [ ] `features/feedback/*` are presentational — render props only, no Redux/API/localStorage access.
- [ ] `containers/` own all orchestration — Redux, validation, API calls, localStorage, navigation.
- [ ] Validation runs only on Next/Submit, scoped to the current tab, and blocks navigation until it passes.
- [ ] Validation errors render inline beneath the field, plus a toast notification.
- [ ] Tab 1 Previous is disabled; Tab 3 shows Submit instead of Next.
- [ ] Draft saves to `localStorage` after every successful Next, restores on load, clears after successful submit.
- [ ] No draft/API save fires on Next if the current tab's values are unchanged since the last save — pure navigation is free.
- [ ] Mock backend (`fetchForm`/`saveStep`/`submitFeedback`) returns Promises with simulated latency, isolated from the localStorage layer.
- [ ] API failures (initial load, save step, submit) surface to the user (retry screen or error toast) without silently losing entered data.
- [ ] No UI library is used (no MUI/Chakra/AntD/Bootstrap).
- [ ] Successful submit clears the draft and navigates to the Thank You page; "Submit Another Response" resets the form.

## Test cases

No automated test suite is included — these are the manual scenarios the implementation is built to satisfy.

| # | Scenario | Steps | Expected result |
|---|----------|-------|------------------|
| TC1 | Required field blocks Next | Leave a required field empty on Tab 1, click Next | Inline error under the field, error toast, tab does not advance |
| TC2 | Optional field doesn't block | Fill all required fields, leave Comments/Portion Size empty, click Next | Advances to Tab 2 with no errors |
| TC3 | Previous preserves data | Fill Tab 1, go Next, go Previous | Tab 1 fields still show entered values |
| TC4 | Draft restores on reload | Fill Tab 1, click Next, reload the page | App resumes on Tab 2 with Tab 1 data intact |
| TC5 | No-op Next skips API/localStorage | Go Next, then Previous, then Next again with zero edits | No `saveStep`/`saveDraft` call fires the second time (check console log count), still navigates |
| TC6 | Edit triggers save | Change a field, click Next | `[mockApi] saveStep()` logs to console, draft updates in `localStorage` |
| TC7 | Full submit flow | Complete all 3 tabs, click Submit | `[mockApi] submitFeedback()` logs, `localStorage` draft cleared, Thank You page shown |
| TC8 | Submit blocked by validation | Leave a required field empty on Tab 3, click Submit | Inline error + toast, stays on Tab 3, no `submitFeedback` call |
| TC9 | Initial load failure | Force `fetchForm()` to reject | Retry screen shown instead of form; clicking Retry re-attempts the load |
| TC10 | Save-step failure | Force `saveStep()` to reject, click Next with an edit | Error toast shown, tab does not advance, no data lost |
| TC11 | Submit failure | Force `submitFeedback()` to reject, click Submit | Error toast shown, stays on form, draft NOT cleared, can retry |
| TC12 | Restart after Thank You | On Thank You page, click "Submit Another Response" | Form resets to Tab 1 with empty fields |

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
