# BAPHOMET INVARIANT

**Status:** binding. This document exists so that no future cleanup, refactor or
"deduplication" pass can remove the welcome ritual by accident or by tidiness.

BOPHAMETH is not a loading spinner. It is the symbolic gate of the Digital
Sanctuary and it stays — functionally and visually present.

---

## 1. Protected files

| file | role |
|---|---|
| `06_applications/digital_sanctuary/src/components/WelcomeRitual.tsx` | the ritual itself |
| `06_applications/digital_sanctuary/src/App.tsx` | owns the `ritual` app state and the transition out of it |
| `06_applications/digital_sanctuary/public/baphomet-loader.png` | the asset the ritual loads |

## 2. Expected behaviour

1. The app boots into state `ritual`.
2. `WelcomeRitual` picks one quote set at random from `QUOTE_SETS`.
3. The Baphomet image is drawn full-bleed behind the quotes, breathing between
   opacity `0.38` and `0.50` on a 12s loop, under a green-black gradient veil.
4. Quotes fade through in sequence.
5. On exit a green energy burst fires: a screen flash, the expanding rings from
   `BOOM_RINGS`, and a central pulse.
6. The whole overlay is click-to-enter. Clicking jumps to the end of the quote
   sequence; it does not skip the burst.
7. If `localStorage.consmap_skip_intro === 'true'` the ritual completes
   immediately. This preference is set from the nav settings panel, never
   silently.
8. When the ritual completes, the app transitions to `home`.

## 3. Asset path

The ritual resolves the asset through Vite's base URL, not a hard-coded path:

```tsx
backgroundImage: `url('${import.meta.env.BASE_URL}baphomet-loader.png')`
```

The file must therefore live at `06_applications/digital_sanctuary/public/baphomet-loader.png`,
because Vite copies `public/` verbatim into `dist/`. Moving it into `src/assets/`
or into a subdirectory of `public/` **breaks the ritual in production while the
dev server keeps working** — that is the specific failure mode this document
guards against.

## 4. The six copies

`baphomet-loader.png` exists six times in the repository. All six are
byte-identical:

```
sha256  8cdb9b74e00d836e446a2799a1f4d260c659432a599de038067f05e1e802739f
size    2 780 918 bytes
```

They are **not** interchangeable, because they serve different consumers. See
`reports/repository-audit/BAPHOMET_REFERENCE_MAP.csv` for the full mapping.

| copy | role |
|---|---|
| `…/digital_sanctuary/public/baphomet-loader.png` | **canonical.** Loaded by `WelcomeRitual.tsx` |
| `…/digital_sanctuary/public/rebis_landing_page/assets/…` | runtime asset of the standalone REBiS page |
| `06_applications/rebis_landing_page/assets/…` | source of that standalone page |
| `06_applications/rebis_landing_page/ChatGPT Image May 9, 2026, 10_59_53 PM.png` | orphaned upload artifact — no reference found anywhere |
| `docs/baphomet-loader.png` | inside the stale committed build output |
| `docs/rebis_landing_page/assets/…` | inside the stale committed build output |

No copy has been deleted, moved or deduplicated. The orphan is recorded as a
candidate only; it is not removed by this pass, because "no reference found"
is a weaker claim than "not needed", and the cost of keeping it is 2.7 MB.

## 5. Verification method

```bash
cd 06_applications/digital_sanctuary
npm ci
npm run build

# asset survives into the production output, unchanged
sha256sum dist/baphomet-loader.png public/baphomet-loader.png

# the ritual is actually wired into the shipped bundle
grep -c 'baphomet-loader'   dist/assets/*.js
grep -c 'consmap_skip_intro' dist/assets/*.js
```

All four checks must pass. The `grep` on the bundle matters more than the file
check: a build can ship the image while the component that draws it has been
tree-shaken away.

## 6. Before / after hashes for this pass

Baseline `a80b0e1`, after `fix(app): repair the TypeScript build broken since PR #52`.

sha256, first 16 hex characters:

| file | before | after | changed |
|---|---|---|---|
| `public/baphomet-loader.png` | `8cdb9b74e00d836e` | `8cdb9b74e00d836e` | no |
| `src/App.tsx` | `8125356e0e39ed2f` | `8125356e0e39ed2f` | no |
| `src/components/WelcomeRitual.tsx` | `0a4f507f15698c0f` | `5836a97499a0ad41` | **yes** |

### Why `WelcomeRitual.tsx` had to change

The file failed `tsc` with `TS6133: 'canSkip' is declared but its value is never
read`, and that error blocked the entire production build — including the build
that ships the Baphomet asset. The ritual could not be verified in production
until it compiled.

`canSkip` was set to `true` by a 2 s timer but never read, so the "click to
enter" affordance faded in at 1.5 s while the click only did something at 2 s.
The fix reads `canSkip` in exactly one place: the affordance's opacity, plus
`aria-hidden` while it is not yet actionable.

Nothing else moved. The Baphomet layer, its opacity animation, the veil, the
quote sequence, `BOOM_RINGS`, the central pulse, `handleSkip`, the
`consmap_skip_intro` check and the `onComplete` transition are byte-for-byte as
they were.

## 7. What is forbidden

- removing Baphomet, or replacing it with a generic loader;
- sanitizing the symbolism;
- removing the animation or reducing it to a static image;
- breaking the `import.meta.env.BASE_URL` asset path;
- bypassing the ritual unconditionally (the `consmap_skip_intro` opt-in is the
  only permitted bypass);
- silently changing its visual identity.

Refactoring is permitted only where necessary for maintainability, and every
such change must be recorded in section 6 with its justification.
