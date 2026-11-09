# AGENTS.md — Jobsity Calendar

Compact guide for future OpenCode sessions. It records only the facts an agent is likely to miss or get wrong.

## Quickstart

| Command | Description |
| --- | --- |
| `git checkout develop` | Switch to the branch with the implementation. |
| `yarn install` | Install dependencies. |
| `yarn start` | Start the app at http://localhost:3000. |
| `yarn test` | Run the snapshot tests. |

## Requirements

- Node.js 14 or 16 recommended; `node-sass` 4 and CRA 3 do not build cleanly on current Node versions.
- Yarn 1.x (a `yarn.lock` is committed on `develop`).
- Internet access for Algolia Places and OpenWeather.

## Environment

- No environment variables are required for local development.
- No environment file exists. The OpenWeather key is currently hardcoded on `develop` and should be moved to `REACT_APP_*` before any public deployment.

## Architecture

- `src/containers/HomeContainer/` — calendar page composition.
- `src/shared/components/Calendar/` — month grid and day selection.
- `src/shared/components/CalendarForm/` — reminder modal and weather lookup.
- `src/shared/store/` — Redux reminders state.
- `src/shared/services/weather/` — OpenWeather client.

## Commands and build order

- Work on `develop`; `master` is only the scaffold.
- Run `yarn test` after changing components or reducers.
- Use `yarn build` as the production gate.

## Conventions and gotchas

- CRA 3 and node-sass 4 are old; modern Node may need `--openssl-legacy-provider` or Node 16.
- The weather key is hardcoded and must not be treated as a secret in documentation.
- Algolia Places and OpenWeather are browser-side calls; they fail visibly when offline.

## Memory

- Read `MEMORY.md` first to understand the current status and decisions.
- Before changing behaviour, read `constitution.md` and keep the change aligned with it.
- After a task, update `MEMORY.md` with status, decisions, and mistakes to avoid. Keep it short.
- If a rule becomes permanent, move it into this file instead of leaving it in memory.
- Never store secrets, tokens, or personal data in `MEMORY.md`.
