# Jobsity Calendar — Working Memory

_Last updated: 2026-11-12_

## Current status

- `develop` merged into the Vite-migrated `master` (2026-11); 47 Vitest tests; GitHub Pages workflow.
- Algolia Places (shut down 2022) replaced by Photon (OpenStreetMap, free, no key).

## Key decisions

- Chose Photon over Geoapify/OpenCage because it needs no API key.
- Used Redux because the calendar and modal need shared reminder state.

## Known limitations and follow-ups

- The old OpenWeather key remains in git history; it must be revoked (now read from `VITE_OPENWEATHER_API_KEY`).
- Reminders do not persist across reloads.

## Mistakes to avoid

- Do not hardcode API keys; use `.env` / Actions secrets.
- Do not remove the frozen date in tests (snapshots depend on January 2020).

## Next steps

- Persist reminders (localStorage).
- Add the OpenWeather key secret and revoke the old key.

---

Keep this file under ~60 lines. Summarise or delete notes that no longer add value.
