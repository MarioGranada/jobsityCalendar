# Jobsity Calendar — Working Memory

_Last updated: 2026-11-02_

## Current status

- `master` contains the CRA scaffold; `develop` contains the calendar implementation.
- Reminder CRUD, city autocomplete, weather lookup, Redux store, and tests exist on `develop`.
- No deployment workflow yet.

## Key decisions

- Followed the original branch workflow: implementation on `develop`, release on `master`.
- Used Redux because the calendar and modal need shared reminder state.

## Known limitations and follow-ups

- OpenWeather key is hardcoded on `develop`.
- Old CRA/node-sass toolchain limits Node versions.
- Reminders do not persist across reloads.

## Mistakes to avoid

- Do not judge the project from `master`; it is intentionally a scaffold.
- Do not upgrade Node without checking node-sass 4.
- Do not publish the repository with the weather key in source.

## Next steps

- Move the weather key to `REACT_APP_OPENWEATHER_KEY`.
- Add a GitHub Actions Pages workflow.
- Consider migrating from node-sass to Dart Sass and CRA to Vite.

---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
