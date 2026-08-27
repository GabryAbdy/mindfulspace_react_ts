# MindfulSpace

A minimal meditation app built with React and TypeScript, developed as a portfolio project for the **start2impact** Development Master program.

## Description

MindfulSpace is a mobile-first meditation web app focused on simplicity and calm. It lets users start a timed meditation session, optionally accompanied by a nature sound picked from the Freesound library, and shows a session-complete screen once the timer finishes. The project was built feature by feature with an emphasis on clean architecture, type safety, and deliberate design decisions over quick implementations — the goal being to demonstrate professional React + TypeScript practices rather than just a working prototype.

## Tech Stack

- **React 19** (function components, hooks)
- **TypeScript**
- **Vite**
- **Tailwind CSS v4** (custom theme)
- **React Router**
- **Axios**
- **Freesound API** (nature sounds)
- **FontAwesome** (icons)

## Features

- Programmable meditation timer with quick-start duration presets
- Optional nature sounds during a session, fetched from the Freesound API
- Explicit "silence" option, treated as a first-class choice rather than the absence of a sound
- Accessible sound selection (keyboard-navigable radiogroup with roving tabindex)
- Session-complete screen with a dynamic summary of the meditated duration
- Responsive, mobile-first layout with a centered desktop frame

## Architecture

The project follows a feature-folder structure to keep domain logic, UI, and shared concerns separated:

```
src/
├── components/
│   ├── layout/     # Header, Footer, PageWrapper
│   └── ui/         # Reusable UI primitive (Card)
├── features/
│   ├── sounds/     # Sound catalog, Freesound integration, sound picker UI
│   └── timer/      # Timer logic, session audio, timer UI
├── context/        # Global app state (duration, confirmed sound)
├── pages/          # Route-level components
├── services/       # Axios instance for Freesound
└── utils/          # Time formatting function
```

State that needs to be shared across features (selected duration, confirmed sound) lives in a dedicated `AppContext`, while state local to a single concern (e.g. timer countdown, audio playback) stays inside its own hook.

## Architectural Decisions

This section documents a few implementation choices that depart from the "obvious" approach, and why.

### Timer state sync: render-time sync vs. two-effect pattern

Most of the codebase follows a **two-`useEffect` pattern** for hooks with multiple concerns (e.g. `useSessionAudio`, where one effect reacts to the selected sound and another reacts to the running state). `useTimer` instead syncs `timeLeft` with `initialSeconds` via a **render-time sync** with a `prevInitialSeconds` reference — a deliberate exception, kept for stability rather than "fixed" for consistency.

A two-effect alternative was evaluated (one effect for syncing, one for the countdown interval), but it required excluding `isRunning` from the sync effect's dependencies to avoid `Pause` resetting `timeLeft`, meaning an intentionally suppressed `exhaustive-deps` warning. Since `useTimer` was already written, tested, and stable before the two-effect pattern was introduced elsewhere — and has no dependency to suppress in the first place — refactoring it would only gain stylistic uniformity, not correctness, at the risk of regressing a central hook every feature depends on.

### Discriminated unions over `null`/optional fields

`ConfirmedSound` (`{ kind: "silence" }` vs `{ kind: "sound"; ... }`) and `SoundFetchResult` model every possible state as an explicit, named variant instead of relying on `null` or optional properties. This makes "no sound selected" a first-class state rather than an absence of data, and lets TypeScript exhaustively check that every variant is handled wherever the union is consumed.

### Roving tabindex for the sound radiogroup

keyboard navigation across sound cards uses a single shared tabindex that moves with selection, following native radio-group behavior (arrows both move and select). This surfaced two bugs worth noting: a parent `Card` was intercepting Space/Enter meant for its child play button (fixed by checking `event.target === event.currentTarget`), and the play button's static `tabIndex` was breaking the group's tab order (fixed by tying it to `isSelected`, plus a native `disabled` state when the sound preview is unavailable).

## Getting Started

```sh
git clone <repository-url>
cd mindfulspace
npm install
```

Create a `.env.local` file in the project root with your Freesound API key:

```
VITE_FREESOUND_API_KEY=your_api_key_here
```

Then start the dev server:

```sh
npm run dev
```

## License

Distributed under the MIT License. See `LICENSE.txt` for details.

## Author

Gabriele Abd Alla Awad
