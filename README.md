# Jobsity Calendar

A calendar application built for the Jobsity coding challenge. The implemented version on the `develop` branch lets a user pick a day, create reminders with a title, time, colour, user, and city, and see the current weather for the selected city.

The current `master` branch contains the Create React App scaffold. The real implementation lives on `develop`, which the original README explicitly calls the main branch.

## Features

- Month calendar with day selection (`react-day-picker`).
- Create, edit, and delete reminders for a selected date.
- Reminder fields: title, time, username, colour, and city.
- City autocomplete through Algolia Places.
- Current weather for the selected city through OpenWeather.
- Redux store for reminders and modal state.
- Jest snapshot tests for the main components and store.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | React 16 (Create React App 3) |
| State | Redux + React Redux |
| UI | Material UI 4 + SCSS |
| Calendar | react-day-picker 7 |
| Services | Axios + Algolia Places + OpenWeather |
| Testing | Jest + Enzyme + snapshots |

## Project structure

```text
jobsityCalendar/            # master = CRA scaffold; develop = implementation
├── src/
│   ├── containers/HomeContainer/
│   ├── shared/
│   │   ├── components/       # Calendar, CalendarForm, Header, Footer
│   │   ├── services/weather/ # OpenWeather client
│   │   └── store/            # Reminder actions, reducers, store
│   ├── App.js
│   └── index.js
├── public/
└── package.json
```

## Getting started

### Requirements

- Node.js 14 or 16 recommended; `node-sass` 4 and CRA 3 do not build cleanly on current Node versions.
- Yarn 1.x (a `yarn.lock` is committed on `develop`).
- Internet access for Algolia Places and OpenWeather.

### 1. Install dependencies

```bash
git checkout develop
yarn install
```

### 2. Run locally

**Start the development server**

```bash
yarn start
```

Open http://localhost:3000.

If Node 17+ reports an OpenSSL error, run with `NODE_OPTIONS=--openssl-legacy-provider` or use Node 16.

### Available scripts

| Command | Description |
| --- | --- |
| `yarn start` | Start CRA on port 3000. |
| `yarn build` | Create a production build. |
| `yarn test` | Run the Jest suite (develop branch). |
| `yarn eject` | Eject CRA configuration (irreversible). |

## How it works

`HomeContainer` renders the calendar. Selecting a day opens `CalendarForm`, which dispatches reminder actions and reads the current reminder list from Redux.

`shared/store/` holds reminder action types, actions, reducers, and the store. The form and calendar both read from this single source of truth.

`shared/services/weather/weather.service.js` calls OpenWeather with the selected city. Algolia Places supplies the city autocomplete in the form.

The `develop` branch also adds Babel/Jest configuration and snapshot tests; `master` only has the default CRA screen.

## Deployment

- Target: GitHub Actions builds the `develop` branch and publishes `build/` to GitHub Pages. Configure the repository `homepage` before deploying.
- Because the app calls third-party APIs from the browser, review key restrictions and CORS before making it public.
- No backend or database is required.

## Notes and limitations

- The implementation is on `develop`, not `master`. Check out `develop` before running the app.
- An OpenWeather API key is hardcoded in the weather service on `develop`. Move it to an environment variable before publishing the repository.
- `node-sass` 4 is incompatible with modern Node; the project needs an older Node or a migration to Dart Sass.
- The README in the repository root describes the develop-branch workflow; keep that branch note visible.

---

**Author:** Mario Granada
