# Project Constitution — Jobsity Calendar

This document defines the non-negotiable foundations for this repository. Read it before adding or changing features.

## Guiding Principles

- **Simplicity first** — prefer the smallest solution that solves the problem. If a change needs a long explanation, it is probably over-engineered.
- **No hardcoded secrets or endpoints** — configuration belongs in environment variables; visual design tokens belong in styles, not in `.env` files.
- **Traceability** — every value, dependency, and route should make its origin and purpose obvious.
- **Debuggability** — fail loudly and visibly; avoid silent fallbacks that hide broken data.
- **Official patterns** — use the documented API of each framework and library before inventing a workaround.
- **Portfolio clarity** — this repository is part of a public portfolio. Code should read as clean, intentional, and easy for a reviewer to follow.

## Technology Stack Foundations

| Layer | Choice | Rationale |
| --- | --- | --- |
| Framework | React 16 + Vite 8 | Vite replaced the unmaintained Create React App. |
| State | Redux + React Redux | Reminders and modal state are shared between the calendar and the form. |
| UI | Material UI 4 + SCSS | Form controls and layout were built with the challenge-era component library. |
| Calendar | react-day-picker 7 | Provides the month grid and day selection. |
| Services | Axios + Photon (OpenStreetMap) + OpenWeather | City lookup (keyless) and weather are external service calls. |
| Testing | Vitest + React Testing Library + snapshots | The challenge required component tests. |

**Rule of thumb:** a new dependency must solve a concrete problem that the current stack cannot solve cleanly. Justify it in the change that introduces it.

## Core Premises

### 1. Scope

A challenge submission that demonstrates a calendar, reminder CRUD, Redux state, and third-party service integration. Keep the scope to the challenge; do not turn it into a full scheduling product.

### 2. Environment Isolation

- This project has no runtime secrets. Do not introduce `.env` files unless a real secret or environment-specific URL appears.
- If configuration is added, use environment variables and document them in the README.
- Never commit keys, tokens, database URLs, or credentials.

### 3. Architecture

- Reminder state belongs in Redux; the calendar and form read from the same store.
- External service calls stay in `shared/services/`.
- `master` is the integration and release branch; work in feature branches merged by PR.

### 4. Data and State

- Reminders are client-side Redux state and reset on reload.
- Weather and city data are fetched on demand; handle failures without breaking the form.
- No persistence or backend exists.

### 5. Styling and UX

- Material UI 4 and SCSS are used together; keep component styles in the matching `.scss` file.
- Preserve the challenge’s visual language rather than introducing a new design system.
- Ensure the reminder modal remains usable at small widths.

### 6. Quality Gates

- `yarn lint`, `yarn test` and `yarn build` are the gates.
- Manually test create, edit, delete, colour selection, city autocomplete, and weather failure.
- Keep snapshots updated when markup changes intentionally.

### 7. Deployment

- Publish the `master` build (`dist/`) to GitHub Pages through Actions.
- The weather key comes from the `VITE_OPENWEATHER_API_KEY` repository secret.
- No server or database deployment is needed.

## What to Avoid

- Running the app from `master` and assuming features are missing.
- Committing API keys or adding more hardcoded credentials.
- Upgrading React/MUI majors without a migration plan.
- Storing reminders outside Redux and duplicating state.

## Checklist Before Adding Anything New

- Does this solve a real problem for this project, or am I adding scope for its own sake?
- Is every new value configuration-driven rather than hardcoded?
- Does the change follow the existing folder and naming patterns?
- Is there a clear failure path when data, the network, or the environment is unavailable?
- Have I run the available lint/build/test command and fixed what it reports?
- Did I update `README.md` and `MEMORY.md` if behaviour or setup changed?

## Philosophy Statement

This repository exists to show thoughtful front-end engineering: clear structure, readable code, and deliberate trade-offs. The goal is not to use every tool available, but to make every file explain itself. Simplicity is the feature.
