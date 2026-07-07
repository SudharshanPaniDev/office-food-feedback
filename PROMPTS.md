# Prompt Log

Chronological log of the prompts used to build this project end-to-end with Claude Code. Verbatim, typos included.

1. **Initial spec:**

   > # Office Food Feedback System – Implementation Prompt
   >
   > ## Objective
   >
   > Build a production-quality React application using **React + TypeScript** following the **Component-Container Architecture** pattern.
   >
   > The application should implement a **config-driven multi-step feedback form** with validation, Redux state management, local persistence, and a mocked backend.
   >
   > The focus of this assignment is on architecture, separation of concerns, scalability, and clean code.
   >
   > ---
   >
   > # Technology Stack
   >
   > * React
   > * TypeScript
   > * Redux Toolkit
   > * React Redux
   > * CSS Modules (preferred) or plain CSS
   > * Functional Components
   > * React Hooks
   >
   > Do not use UI libraries such as Material UI, Chakra UI, Ant Design, Bootstrap, etc.
   >
   > ---
   >
   > # Architecture
   >
   > Follow Component-Container Architecture.
   >
   > The project should be divided into three major folders.
   >
   > ```text
   > src
   > │
   > ├── components/
   > ├── containers/
   > └── features/
   > ```
   >
   > ---
   >
   > # Folder Structure
   >
   > ```text
   > src
   >
   > components/
   >     Button/
   >     Card/
   >     Input/
   >     Dropdown/
   >     Radio/
   >     Tabs/
   >     TextArea/
   >
   > containers/
   >     FeedbackFormContainer/
   >     ThankYouContainer/
   >
   > features/
   >     feedback/
   >         FeedbackForm/
   >         FeedbackHeader/
   >         ProgressTabs/
   >         FormSection/
   >         Navigation/
   >         ThankYou/
   > ```
   >
   > ---
   >
   > # Component Responsibilities
   >
   > ## components/
   >
   > These are generic reusable UI components.
   >
   > Responsibilities:
   >
   > * Render UI only
   > * Receive props
   > * Emit events
   > * No Redux
   > * No API calls
   > * No validation
   > * No business logic
   >
   > These components should be reusable across any future application.
   >
   > Components include:
   >
   > * Button
   > * Card
   > * Input
   > * Dropdown
   > * Radio
   > * Tabs
   > * TextArea
   >
   > ---
   >
   > ## features/
   >
   > These are feedback-specific presentation components.
   >
   > Responsibilities:
   >
   > * Layout
   > * Rendering
   > * Displaying data passed from the container
   >
   > They must not:
   >
   > * Access Redux
   > * Call APIs
   > * Access Local Storage
   > * Perform validation
   > * Own business logic
   >
   > ---
   >
   > ## containers/
   >
   > Containers own the complete application logic.
   >
   > Responsibilities include:
   >
   > * Load form configuration
   > * Maintain Redux state
   > * Handle field updates
   > * Perform validation
   > * Save draft to Local Storage
   > * Call mock backend APIs
   > * Navigate between tabs
   > * Submit feedback
   > * Navigate to Thank You page
   >
   > Containers orchestrate the application while presentation components only render the UI.
   >
   > ---
   >
   > # Form Layout
   >
   > The page should contain:
   >
   > * Company Logo (top left)
   > * Page Heading (center aligned)
   > * Progress Tabs
   > * Card containing the current form section
   > * Previous / Next buttons
   > * Submit button on the final step
   >
   > ---
   >
   > # Form Structure
   >
   > The form contains three tabs.
   >
   > ---
   >
   > ## Tab 1 — Food Quality
   >
   > Fields
   >
   > | Field                | Component        | Required |
   > | -------------------- | ---------------- | -------- |
   > | Overall Food Quality | Dropdown (1–5)   | Yes      |
   > | Taste                | Dropdown (1–5)   | Yes      |
   > | Food Temperature     | Radio            | Yes      |
   > | Portion Size         | Dropdown         | No       |
   > | Food Freshness       | Radio (Yes / No) | Yes      |
   > | Comments             | TextArea         | No       |
   >
   > ---
   >
   > ## Tab 2 — Cleanliness
   >
   > Fields
   >
   > | Field                         | Component      | Required |
   > | ----------------------------- | -------------- | -------- |
   > | Serving Counter Hygiene       | Dropdown (1–5) | Yes      |
   > | Staff Personal Hygiene        | Dropdown (1–5) | Yes      |
   > | Serving Utensils Cleanliness  | Dropdown (1–5) | Yes      |
   > | Food Presentation             | Dropdown (1–5) | Yes      |
   > | Food Serving Area Cleanliness | Dropdown (1–5) | Yes      |
   > | Comments                      | TextArea       | No       |
   >
   > ---
   >
   > ## Tab 3 — Service Experience
   >
   > Fields
   >
   > | Field                         | Component        | Required |
   > | ----------------------------- | ---------------- | -------- |
   > | Staff Courtesy                | Dropdown (1–5)   | Yes      |
   > | Staff Responsiveness          | Dropdown (1–5)   | Yes      |
   > | Queue Management              | Dropdown (1–5)   | Yes      |
   > | Were your concerns addressed? | Radio (Yes / No) | Yes      |
   > | Overall Service Experience    | Dropdown (1–5)   | Yes      |
   > | Comments                      | TextArea         | No       |
   >
   > ---
   >
   > # Config-Driven Form
   >
   > The UI must be generated entirely from configuration.
   >
   > Do not hardcode any form fields.
   >
   > Create a configuration object similar to:
   >
   > ```ts
   > const formConfig = [
   >   {
   >     id: "quality",
   >     title: "Food Quality",
   >     fields: [
   >       {
   >         id: "overallQuality",
   >         type: "dropdown",
   >         label: "Overall Food Quality",
   >         required: true,
   >         options: [
   >           { label: "1", value: 1 },
   >           { label: "2", value: 2 },
   >           { label: "3", value: 3 },
   >           { label: "4", value: 4 },
   >           { label: "5", value: 5 }
   >         ]
   >       }
   >     ]
   >   }
   > ];
   > ```
   >
   > The application should render the form dynamically from this configuration.
   >
   > Adding a new field to the configuration should automatically render it without modifying any UI component.
   >
   > ---
   >
   > # Redux
   >
   > Use Redux Toolkit.
   >
   > Create a single slice named:
   >
   > ```ts
   > feedbackSlice
   > ```
   >
   > Suggested state:
   >
   > ```ts
   > {
   >   activeTab: 0,
   >
   >   formConfig: [],
   >
   >   responses: {},
   >
   >   validationErrors: {},
   >
   >   isLoading: false,
   >
   >   isSubmitting: false
   > }
   > ```
   >
   > Redux should be the single source of truth for all form data.
   >
   > ---
   >
   > # Validation
   >
   > Validation should happen when the user clicks **Next** or **Submit**.
   >
   > Validation requirements:
   >
   > * Required field validation
   > * Inline validation messages
   > * Validation should only apply to the current tab
   > * Do not allow navigation until validation succeeds
   >
   > Validation messages should appear beneath the corresponding field.
   >
   > ---
   >
   > # Navigation Flow
   >
   > Tab 1
   >
   > * Previous (Disabled)
   > * Next
   >
   > Tab 2
   >
   > * Previous
   > * Next
   >
   > Tab 3
   >
   > * Previous
   > * Submit
   >
   > ---
   >
   > # Save Flow
   >
   > When the user clicks **Next**:
   >
   > 1. Validate the current tab.
   > 2. If validation fails, display errors.
   > 3. If validation succeeds:
   >
   >    * Update Redux.
   >    * Save the current state to Local Storage.
   >    * Call the mock backend API.
   >    * Navigate to the next tab.
   >
   > The user should never lose data while navigating.
   >
   > ---
   >
   > # Local Storage
   >
   > Implement a Local Storage layer.
   >
   > Functions required:
   >
   > ```ts
   > saveDraft()
   >
   > loadDraft()
   >
   > clearDraft()
   > ```
   >
   > Behaviour:
   >
   > * Save data after every successful Next action.
   > * Restore the draft when the application starts.
   > * Clear Local Storage after successful submission.
   >
   > Do not access Local Storage directly from UI components.
   >
   > ---
   >
   > # Mock Backend
   >
   > There is no real backend.
   >
   > Create a mock API layer.
   >
   > Functions:
   >
   > ```ts
   > fetchForm()
   >
   > saveStep()
   >
   > submitFeedback()
   > ```
   >
   > Requirements:
   >
   > * Return Promises.
   > * Simulate network latency using setTimeout().
   > * Keep the API layer isolated from Local Storage.
   > * Pretend these functions communicate with a backend.
   >
   > ---
   >
   > # Data Flow
   >
   > Application Starts
   >
   > ↓
   >
   > Load Form Configuration
   >
   > ↓
   >
   > Load Draft from Local Storage
   >
   > ↓
   >
   > Populate Redux
   >
   > ↓
   >
   > Render Current Tab
   >
   > ↓
   >
   > User Updates Fields
   >
   > ↓
   >
   > Redux Updated
   >
   > ↓
   >
   > Click Next
   >
   > ↓
   >
   > Validate Current Tab
   >
   > ↓
   >
   > Save Draft to Local Storage
   >
   > ↓
   >
   > Call Mock saveStep()
   >
   > ↓
   >
   > Navigate to Next Tab
   >
   > ↓
   >
   > Final Tab
   >
   > ↓
   >
   > Submit
   >
   > ↓
   >
   > Call Mock submitFeedback()
   >
   > ↓
   >
   > Clear Local Storage
   >
   > ↓
   >
   > Navigate to Thank You Page
   >
   > ---
   >
   > # Coding Standards
   >
   > Follow production-quality coding practices.
   >
   > Requirements:
   >
   > * Strong TypeScript typing
   > * Small reusable components
   > * Single Responsibility Principle
   > * No duplicated logic
   > * No business logic inside presentational components
   > * No API calls inside components
   > * No Local Storage access inside components
   > * Keep components reasonably small and readable
   > * Use meaningful naming conventions
   > * Write code that is easy to extend
   >
   > ---
   >
   > # Deliverables
   >
   > Generate a complete, runnable project that includes:
   >
   > * Complete folder structure
   > * Reusable UI components
   > * Feedback feature components
   > * Container components
   > * Redux store
   > * Config-driven rendering
   > * Validation
   > * Local Storage integration
   > * Mock backend API
   > * Previous / Next / Submit flow
   > * Thank You page
   >
   > Build the project incrementally.
   >
   > Start by creating the folder structure and reusable components.
   >
   > After each major milestone (base components, Redux setup, feature components, container logic, persistence), pause so the implementation can be reviewed before proceeding to the next stage.

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

8. > Can we do console responses, now that we dont a BE we can show on console that our api calling function was called
   *(interrupted mid-response, resumed with:)* `export function submitFeedback... right`
   → Added `console.log` calls to `fetchForm`, `saveStep`, `submitFeedback` in `mockApi.ts`.

9. > Can you rename taliew to just "Brand Logo"
   → Renamed `LOGO_TEXT` constant in `FeedbackFormContainer`.

10. > where iss my main component whihc is renderinf all
    → Pointed to `App.tsx` and explained the render chain.

11. > no i am refering to tabs, forms header everyign where is it used from where i am able to render the ui
    → Pointed to `FeedbackForm.tsx` (composes header, tabs, section, navigation).

12. *(screenshot of `features/feedback` folder tree)* > why features/ feedbaclk
    → Explained the `features/feedback/` domain-namespacing rationale (matches spec's folder structure).

13. > what folder does feeeback have ?
    → Listed the 6 subfolders under `features/feedback/`.

14. > We even need to build the error handling to api, if api fails we need to tell user its failing, so error handling for this app needs to be added
    → Added try/catch around all 3 mock API calls, error toasts, and a retry screen for initial load failure.

15. > I see certain issues, when the user has already filled form, why are we again doing api call when we click on next you need to check if the user has made any chaneg in the filled form, only then we need to do api call and local storage upadte, if not the user is just navigating to another page, inst it?
    → Added a last-saved-values snapshot (`lastSavedResponsesRef`) and a dirty-check in `handleNext` — skips `saveDraft`/`saveStep` when the current tab's values are unchanged.

16. > Can you create a repository in github, not in talview, in github and push this up ther
    → Created public GitHub repo `SudharshanPaniDev/office-food-feedback`, initial commit, pushed.

17. > Can we clearly mention the readme of the repo?
    → Replaced Vite boilerplate README with real architecture/data-flow/run docs.

18. > In the readme can we mentipn the test cases and acceptance criteria
    → Added Acceptance Criteria checklist and Test Cases table (TC1–TC12) to README.

19. > In prompt log, can we remove the hydrateResponses entry, and can we have the main prompt which we used to generate this code
    → Removed the `hydrateResponses` Q&A entry, expanded entry 1 to the full original spec text.
