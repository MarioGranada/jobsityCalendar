# Jobsity Calendar

A calendar application built for the Jobsity coding challenge. It lets a user pick a day, create reminders with a title, time, colour, user, and city, and see the current weather for the selected city.

**Live demo:** https://mariogranada.github.io/jobsityCalendar/

## Features

- Month calendar with day selection (`react-day-picker`).
- Create, edit, and delete reminders for a selected date.
- Reminder fields: title, time, username, colour, and city.
- City autocomplete through [Photon](https://photon.komoot.io) (free OpenStreetMap geocoder, no API key). It replaced Algolia Places, which shut down in 2022.
- Current weather for the selected city through OpenWeather.
- Redux store for reminders and modal state.
- Vitest + React Testing Library tests (snapshots, interactions, store, services).

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | React 16 + Vite 8 |
| State | Redux + React Redux |
| UI | Material UI 4 (+ lab Autocomplete) + SCSS (dart-sass) |
| Calendar | react-day-picker 7 |
| Services | Axios + Photon (OpenStreetMap) + OpenWeather |
| Testing | Vitest + React Testing Library + jsdom |

## Project structure

```text
jobsityCalendar/
├── src/
│   ├── containers/HomeContainer/
│   ├── shared/
│   │   ├── components/       # Calendar, CalendarForm, CityAutocomplete, Header, Footer
│   │   ├── services/weather/ # OpenWeather client
│   │   ├── services/places/  # Photon city search
│   │   └── store/            # Reminder actions, reducers, store
│   ├── test/utils.jsx        # test helpers (stores, frozen date)
│   ├── App.jsx
│   └── index.jsx
├── public/
├── index.html                # Vite entry
├── .env.example
├── vite.config.mjs
└── package.json
```

## Getting started

### Requirements

- Node.js 22.12+ (or 20.19+).
- Yarn 1.x (a `yarn.lock` is committed).
- A free OpenWeather API key (city search needs no key).
- Internet access for Photon and OpenWeather.

### 1. Install dependencies

```bash
yarn install
cp .env.example .env   # then paste your OpenWeather key
```

| Variable | Purpose | Required |
| --- | --- | --- |
| `VITE_OPENWEATHER_API_KEY` | OpenWeather API key for the city forecast. Inlined into the public bundle at build time. | Yes (forecast hidden without it) |

### 2. Run locally

**Start the development server**

```bash
yarn dev
```

Open http://localhost:3000/jobsityCalendar/.

### Available scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the Vite dev server on port 3000. |
| `yarn build` | Create a production build in `dist/`. |
| `yarn preview` | Serve the production build locally. |
| `yarn test` | Run the Vitest suite once (`yarn test:watch` to watch). |
| `yarn lint` | Run ESLint. |

## How it works

`HomeContainer` renders the calendar. Selecting a day opens `CalendarForm`, which dispatches reminder actions and reads the current reminder list from Redux.

`shared/store/` holds reminder action types, actions, reducers, and the store. The form and calendar both read from this single source of truth.

`CityAutocomplete` queries Photon (debounced, cities only) and stores the pick as `"City, CC"`. `shared/services/weather/weather.service.js` sends that value to OpenWeather's current-weather endpoint.

## Deployment

- GitHub Actions (`.github/workflows/deploy.yml`) runs tests, builds with `base: '/jobsityCalendar/'`, copies `index.html` to `404.html`, and publishes `dist/` to `gh-pages` on every push to `master`.
- Add `VITE_OPENWEATHER_API_KEY` as a repository Actions secret; the workflow passes it to `yarn build`.
- The OpenWeather key ships to the browser, and OpenWeather keys cannot be restricted by domain. Use a free-plan key you can rotate.
- No backend or database is required.

## Notes and limitations

- `develop` was merged into `master` (2026-11); `master` is now the implementation.
- The OpenWeather key that used to be hardcoded is in the git history. Revoke it and use a new key from `.env` / Actions secrets.
- Photon's public instance is fair-use: requests are debounced and limited to 6 results. Attribution to OpenStreetMap is shown under the city field.
- Reminders live in Redux memory only; they reset on reload.

---

**Author:** Mario Granada
