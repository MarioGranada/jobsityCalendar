# AGENTS.md — Jobsity Calendar

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `yarn install` | Install dependencies. |
| `yarn dev` | Start the app at http://localhost:3000/jobsityCalendar/. |
| `yarn test` | Run Vitest once (`yarn test:watch` to watch). |
| `yarn build` | Production build to `dist/`. |

## Requirements

- Node.js 22.12+ (or 20.19+).
- Yarn 1.x (a `yarn.lock` is committed).
- Internet access for Photon (city search) and OpenWeather.

## Environment

- `VITE_OPENWEATHER_API_KEY` in `.env` (git-ignored; template in `.env.example`). CI reads it from the Actions secret of the same name.
- `.env.test` (committed) holds a dummy key for Vitest. Photon needs no key.

## Architecture

- `src/containers/HomeContainer/` — calendar page composition.
- `src/shared/components/Calendar/` — month grid and day selection.
- `src/shared/components/CalendarForm/` — reminder modal and weather lookup.
- `src/shared/store/` — Redux reminders state.
- `src/shared/components/CityAutocomplete/` — Photon-backed city type-ahead (MUI lab Autocomplete).
- `src/shared/services/weather/` — OpenWeather client.
- `src/shared/services/places/` — Photon client (`"City, CC"` values).

## Commands and build order

- `master` is the implementation (develop merged 2026-11). Pushes to `master` deploy to GitHub Pages.
- Run `yarn lint`, `yarn test` and `yarn build` before finishing a change.

## Conventions and gotchas

- React 16.14 uses the classic JSX runtime (`vite.config.mjs`); keep `import React` in JSX files.
- Tests freeze the date at 2020-01-20 (`src/test/utils.jsx`) so DayPicker snapshots are stable.
- Calendar keys `CalendarForm` with a counter so each open remounts with fresh state; do not sync props into state with effects.
- Day keys come from `toLocaleDateString()` and depend on the browser locale.
- Photon's public instance is fair-use: keep the debounce and small `limit`.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
