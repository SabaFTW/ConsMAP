# Validation Report

Baseline: `a80b0e1` (merge of PR #53 into `main`, 2026-08-26).
Environment: Arch Linux, Node v26.7.0, npm 12.0.2, Python 3.12.
All commands run from the audit worktree, not from any existing checkout.

## Commands and exit codes

| # | command | working directory | exit |
|---|---|---|---|
| 1 | `npm ci` | `06_applications/digital_sanctuary` | **0** |
| 2 | `npm run build` | `06_applications/digital_sanctuary` | **0** |
| 3 | `npm run lint` | `06_applications/digital_sanctuary` | **1** |
| 4 | `python -m compileall -q tools automation` | repo root | **0** |
| 5 | no `.netlify/` tracked | repo root | **0** |
| 6 | no build output tracked in `docs/` | repo root | **0** |
| 7 | no credential-shaped files tracked | repo root | **0** |
| 8 | workflow YAML + root JSON parse | repo root | **0** |
| 9 | BOPHAMET invariant | `06_applications/digital_sanctuary` | **0** |

Every gating check passes. Command 3 is reported, not gated — see below.

## The build was broken before this branch

`npm run build` exited **2** on the baseline commit with 24 TypeScript errors,
and had done so on `main` since 2026-06-20 (PR #52). No GitHub Pages deployment
had succeeded since 2026-06-03. The CI failure for the merge of PR #53 is run
`32995393349`.

The errors were not caused by PR #53. `BusStory.tsx` referenced `galleryImages`
in 19 places without ever defining it — the Visual Archive gallery had never
compiled in any commit.

After the repair in `851ef8f`:

```
npm run build   →  exit 0
✓ 680 modules transformed
dist/index.html                   2.08 kB
dist/assets/index-BLl35fSp.css  135.92 kB
dist/assets/index-DGUPY8U-.js   703.62 kB
```

The bundle-size warning (>500 kB) is pre-existing and not addressed here.

## Lint

`npm run lint` exits 1. This is pre-existing and was made better, not worse:

| stage | problems | errors |
|---|---|---|
| baseline `a80b0e1` | 19 | 18 |
| after the build repair | 15 | 14 |
| after excluding `checkpoints/` from lint | **12** | **11** |

None of the remaining errors is in code introduced by this branch. They are
mostly `react-hooks/set-state-in-effect` in `App.tsx`, `HeroLanding.tsx`,
`DocsViewer.tsx`, `MarkdownReader.tsx` and `MouseTerminal.tsx`. Fixing them
means changing runtime behaviour in components this pass had no mandate to
touch, so CI reports lint with `continue-on-error: true` rather than gating on
it. Recorded as an open question in `docs/project/DECISION_LOG.md`.

## BOPHAMET verification

Run against the real production build, not by inspection alone:

```
public/baphomet-loader.png   sha256 8cdb9b74e00d836e446a2799a1f4d260c659432a599de038067f05e1e802739f
dist/baphomet-loader.png     sha256 8cdb9b74e00d836e446a2799a1f4d260c659432a599de038067f05e1e802739f
                             identical ✓

grep 'baphomet-loader'    dist/assets/*.js  →  found ✓
grep 'consmap_skip_intro' dist/assets/*.js  →  found ✓
grep 'click to enter'     dist/assets/*.js  →  found ✓
```

The asset check alone is insufficient — a build can ship an image whose
component has been tree-shaken away — so the bundle greps are part of the gate.

## Reference integrity after the moves

After separating the stale build output out of `docs/`:

```
grep for markdown links into docs/{assets,images,forge_faq,rebis_landing_page,
     continuum_arc,saga_map,consciousness_survival_guide,docs}/   →  no hits
grep for docs/docs/ or docs/index.html in *.md                    →  no hits
npm run build                                                     →  exit 0
```

## Live site

Pages was `build_type: legacy`, source `main /`, so GitHub served a Jekyll
rendering of the repository root:

```
https://sabaftw.github.io/ConsMAP/                    HTTP 200  <title>ConsMAP | guide</title>
https://sabaftw.github.io/ConsMAP/baphomet-loader.png HTTP 404
```

Switched to `build_type: workflow` on 2026-08-26. The site remained HTTP 200
throughout (the previous deployment persists until a new one succeeds).

**A successful Actions deployment still requires the build repair to reach
`main`.** Until this branch merges, the live site remains the old Jekyll
rendering.

## Not verified

- Runtime behaviour of the Visual Archive gallery in a browser. The build
  compiles and the data resolves from existing entries, but no one has clicked
  through the restored gallery.
- Netlify deployment. The root `netlify.toml` is untouched, but no Netlify
  build was triggered.
- The 12 remaining lint problems.
