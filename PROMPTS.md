# Prompt Log

Chronological log of the prompts used to build this project end-to-end with Claude Code. Verbatim, typos included.

1. **Initial spec** — full "Office Food Feedback System – Implementation Prompt" (technology stack, Component-Container architecture, folder structure, form fields for all 3 tabs, config-driven rendering requirement, Redux shape, validation rules, navigation flow, save flow, localStorage functions, mock backend functions, data flow diagram, coding standards, deliverables — build incrementally, pause after each milestone).
   → Scaffolded project, reusable components, Redux, feature components, containers, persistence, mock backend across 5 milestones.

2. > We should not allow users to add classnames to any compojents, its purely variant based
   → Removed `className` prop from Button, Card, Input, TextArea, Dropdown.

3. > whats next
   → Proceeded to Redux setup + form config milestone.

4. > Ok next
   → Proceeded to feature components milestone.

5. > Can we use useReducer instead of redux for this ?
   → Discussed tradeoff; kept Redux Toolkit (spec-mandated).

6. > No continue go ahead
   → Continued building feature components.

7. > next
   → Proceeded to container logic + persistence/mock backend milestones, wired up App, verified build.

8. > what does this hydrateResponses do, show me the flow
   → Explained the `hydrateResponses` reducer and the draft-restore flow (no code change).

9. > Can we do console responses, now that we dont a BE we can show on console that our api calling function was called
   *(interrupted mid-response, resumed with:)* `export function submitFeedback... right`
   → Added `console.log` calls to `fetchForm`, `saveStep`, `submitFeedback` in `mockApi.ts`.

10. > Can you rename taliew to just "Brand Logo"
    → Renamed `LOGO_TEXT` constant in `FeedbackFormContainer`.

11. > where iss my main component whihc is renderinf all
    → Pointed to `App.tsx` and explained the render chain.

12. > no i am refering to tabs, forms header everyign where is it used from where i am able to render the ui
    → Pointed to `FeedbackForm.tsx` (composes header, tabs, section, navigation).

13. *(screenshot of `features/feedback` folder tree)* > why features/ feedbaclk
    → Explained the `features/feedback/` domain-namespacing rationale (matches spec's folder structure).

14. > what folder does feeeback have ?
    → Listed the 6 subfolders under `features/feedback/`.

15. > We even need to build the error handling to api, if api fails we need to tell user its failing, so error handling for this app needs to be added
    → Added try/catch around all 3 mock API calls, error toasts, and a retry screen for initial load failure.

16. > I see certain issues, when the user has already filled form, why are we again doing api call when we click on next you need to check if the user has made any chaneg in the filled form, only then we need to do api call and local storage upadte, if not the user is just navigating to another page, inst it?
    → Added a last-saved-values snapshot (`lastSavedResponsesRef`) and a dirty-check in `handleNext` — skips `saveDraft`/`saveStep` when the current tab's values are unchanged.

17. > Can you create a repository in github, not in talview, in github and push this up ther
    → Created public GitHub repo `SudharshanPaniDev/office-food-feedback`, initial commit, pushed.

18. > Can we clearly mention the readme of the repo?
    → Replaced Vite boilerplate README with real architecture/data-flow/run docs.

19. > In the readme can we mentipn the test cases and acceptance criteria
    → Added Acceptance Criteria checklist and Test Cases table (TC1–TC12) to README.

20. > Can we have one file in the repo which mentions my prompts used for genrating this functionlity end to end
    → This file.
