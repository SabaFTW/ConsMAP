# Handoff to Claude Code — Story Tab / Factory Archive UI Polish

## Mission

Polish the GitHub Pages Story tab / Factory Trilogy Archive UI.

Do:

- make the Story view feel slick, readable, tactile, and mobile-friendly
- aim for a subtle iPhone-like feel: smooth spacing, clean cards, soft glass, responsive layout, good tap targets
- reduce visual clutter
- make the archive easier to read and navigate
- preserve ConsMAP safety labels and boundary notes
- keep build simple and stable

Do NOT:

- rewrite corpus texts
- remove claim-hygiene warnings
- remove Story tab behavior
- add heavy dependencies
- rebuild the whole app
- turn symbolic corpus into factual claims

## Mandatory preservation rule

BOPHAMETH MUST STAY.

Search for:

- BOPHAMETH
- Bophameth
- bophameth
- Baphomet
- baphomet
- buffometric
- checkerboard
- cow
- shark

Do not delete, hide permanently, rename away, or remove the BOPHAMETH / checkerboard / cow / shark symbolic layer.

It may be visually refined.
It may be made subtler.
It may be better integrated.
But it must remain present.

This is non-negotiable.

## Likely files

Main app:

- 06_applications/digital_sanctuary/src/App.tsx
- 06_applications/digital_sanctuary/src/components/HeroLanding.tsx
- 06_applications/digital_sanctuary/src/components/BedtimeStory.tsx
- 06_applications/digital_sanctuary/src/index.css or related CSS files

Story archive currently lives in:

- 06_applications/digital_sanctuary/src/components/BedtimeStory.tsx

## Desired UI direction

Make it feel like:

- sacred archive shelf
- slick iPhone reading UI
- soft dark glass
- readable cards
- minimal bloat
- no corporate dashboard smell
- no giant unnecessary text walls before the links
- clear sections:
  - Prelude
  - Main Trilogy
  - Companion Texts

## Acceptance checks

Run:

cd 06_applications/digital_sanctuary
npm run build

Then report:

- files changed
- build status
- BOPHAMETH preservation confirmed
- Story tab still opens Factory Trilogy Archive
- no corpus text rewritten

One-line baton:
“The Story door is built. Make it beautiful, but do not remove the goat.”
