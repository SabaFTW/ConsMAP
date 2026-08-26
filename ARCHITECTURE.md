# Architecture

## 1. What is deployed, and from where

There is exactly one deployed artifact: the production build of the Digital
Sanctuary.

```
06_applications/digital_sanctuary/   →  npm run build  →  dist/
                                                          + saga_map/ copied in by CI
                                                          ↓
                                              GitHub Pages (Actions artifact)
```

`.github/workflows/deploy.yml` runs on every push to `main`. Nothing else in
`06_applications/` is deployed unless it is copied into
`digital_sanctuary/public/` or added to the workflow the way `saga_map` is.

**GitHub Pages source is "GitHub Actions"** (`build_type: workflow`). This
matters, and it was wrong until 2026-08-26: Pages was set to `legacy` with
source `main /`, so GitHub served a Jekyll rendering of the repository root
while the workflow built an artifact nobody served. Two consequences worth
remembering:

- the live site was the README, not the application;
- `https://sabaftw.github.io/ConsMAP/baphomet-loader.png` returned 404.

If the live site ever reverts to looking like a rendered README, check this
setting first.

Netlify is a secondary host. The authoritative config is the `netlify.toml` at
the repository root. `.netlify/` inside the app directory is machine-local CLI
state and is not tracked.

## 2. Source-of-truth boundaries

| material | canonical location | mirrored to | rule |
|---|---|---|---|
| written corpus | `docs/` | — | edit here |
| documents the app reads at runtime | `06_applications/digital_sanctuary/public/docs/` | — | edit here |
| images the app renders | `…/digital_sanctuary/public/images/` | — | edit here |
| Netlify config | `netlify.toml` (root) | — | edit here |
| audit artifacts | `reports/repository-audit/` | — | regenerated, do not hand-edit |

### The `docs/` hazard

Until 2026-08-26 `docs/` was **both** the canonical corpus and a dumped
production build, layered on top of each other by an old
"deploy from branch `main` `/docs`" Pages configuration. 127 of the
repository's 227 byte-identical duplicate groups came from that single fact.

The build output has been separated out: 130 files that had an identical copy
elsewhere were untracked, and 8 unique ones moved to
`docs/_archive/2026-08-26_stale_pages_build/`. `docs/` is now corpus only.

**Do not publish a build into `docs/` again.** Pages builds from the Actions
artifact; a build in `docs/` is not deployed, it only creates duplicates.

### Why `public/docs/` is not generated from `docs/`

It would be tidy to declare `docs/` canonical and generate
`digital_sanctuary/public/docs/` from it. That is deliberately **not** done,
because the two trees are not the same material:

- `docs/` holds the full corpus, including material under the public-safety
  boundary that is not meant to ship;
- `public/docs/` holds the curated subset the reading application exposes,
  with its own structure (`research/`, `visual_parables/`) addressed directly
  by component code such as `BusStory.tsx`.

A deterministic sync would either leak unshipped material into the build or
require a curation manifest that is itself the real source of truth. Until
someone writes that manifest deliberately, **both trees are maintained
independently and on purpose**, and the duplicate report is expected to show
overlap between them. This is model B in the audit's terms, chosen with
evidence rather than by default. See `docs/project/DECISION_LOG.md`.

## 3. Application architecture

`digital_sanctuary` is React 19 + Vite + framer-motion.

```
App.tsx            owns AppState: ritual | home | mirror | story | busStory
                   | analyzer | docs | aimode | frame
  ├── WelcomeRitual    the BOPHAMETH gate — see BAPHOMET_INVARIANT.md
  ├── HeroLanding      route cards
  ├── GlobalNav        nav + skip-intro settings panel
  ├── DocsViewer       markdown reader        (state: docs)
  ├── FramedView       iframe wrapper         (state: frame)
  ├── BusStory         Factory Trilogy archive + Visual Archive gallery
  ├── ClaimAnalyzer, EpistemicMirror, BicameralHudPreview
  └── data/factoryVisuals.ts   story path → image mapping
```

Standalone HTML pages (FAQ, REBiS, Continuum Arc, GrandBus Codex, Pravljica…)
are **not** markdown. They are served from `public/` and opened through
`onNavigate('frame', url)`. Pointing one at `DocsViewer` produces a blank
reader — that bug has been fixed once already; do not reintroduce it.

## 4. Generated vs maintained

| generated — never hand-edit | maintained by hand |
|---|---|
| `06_applications/digital_sanctuary/dist/` | everything in `src/` |
| `automation/runs/` | `automation/` harness itself |
| `reports/repository-audit/*.csv` | `docs/`, `research/`, `protocols/` |
| `docs/_archive/2026-08-26_stale_pages_build/` | `public/docs/`, `public/images/` |

## 5. The BOPHAMET invariant

The welcome ritual is a hard invariant of this repository, not a decoration.
It is specified in **[docs/project/BAPHOMET_INVARIANT.md](docs/project/BAPHOMET_INVARIANT.md)**
and enforced in CI by `.github/workflows/validate.yml`.

The short version: `baphomet-loader.png` must stay at
`06_applications/digital_sanctuary/public/baphomet-loader.png`, because
`WelcomeRitual.tsx` resolves it through `import.meta.env.BASE_URL`. Moving it
anywhere else breaks production while the dev server keeps working.

## 6. Interpretive boundaries

The repository deliberately keeps empirical evidence, theory, metaphor, visual
parable, theology and satire in separate places, and archival proximity does
not make them equivalent. Two rules carried from the corpus itself:

```
A shared method does not establish a shared cause.
SATIRE ABOVE. LEDGER BELOW.
```

Directory layout is not an argument. Do not merge documents because they share
a theme, and do not let a cleanup pass upgrade an unverified claim by filing it
next to a verified one.

## 7. The OMNIA bridge boundary

`docs/06_omnia/` is the public landing zone for OMNIA material. It is
**downstream** of the OMNIA archive, never a copy of it.

```
   OMNIA archive (outside this repo)          ← the evidence vault
            │
            │  Codex seals a consmap_bridge_candidate bundle
            ▼
   data/omnia/releases/<bridge-state-hash>/    ← received, not tracked
            │
            │  importer: verify manifest, verify every artifact hash,
            │            preserve register labels, drop quarantine
            ▼
   docs/06_omnia/atlas/                        ← generated, public-safe
```

**Nothing has crossed this bridge yet.** Both landing zones are reserved and
empty; each holds only a README explaining what will land there.

### The boundary in one line

The archive holds evidence. ConsMAP receives only public-safe, schema-valid,
provenance-preserving exports. If an artifact cannot carry its provenance
across, it does not cross.

### What is tracked on each side

| | tracked in git? |
|---|---|
| the OMNIA archive | no — lives outside the repository |
| received bundles, `data/omnia/releases/*` | no — gitignored, README excepted |
| the generated atlas, `docs/06_omnia/atlas/` | yes, but **generated** — do not hand-edit |
| the eleven hand-written manuscripts in `docs/06_omnia/` | yes, hand-maintained |

The last two rows share a parent directory and must not be merged. The
manuscripts are authored; the atlas is produced. See
[docs/06_omnia/OMNIA_MANUSCRIPT_MAP.md](docs/06_omnia/OMNIA_MANUSCRIPT_MAP.md).

### Register preservation is the point

OMNIA's five registers — 🟢 confirmed, 🟡 checkable-unresolved, 🟠 structural
inference, 🟣 mythic illustration, ⚫ quarantine — are defined in
[docs/06_omnia/REGISTER_RULES.md](docs/06_omnia/REGISTER_RULES.md). An importer
that flattens them has broken the section's reason for existing:

```
Myth remembers. Evidence proves. Never the same uniform.
```

Quarantine never crosses. 🟡 and 🟣 may appear but must never be rendered as
carrying factual load. An importer that cannot verify a hash must fail, not warn.

### Sequencing

Structure and content move in separate pull requests, so that a bad import can
be reverted without unpicking a reorganisation. This cleanup pass reserves the
paths and writes the contract; it imports nothing. The import itself belongs on
`feat/omnia-consmap-bridge`, as its own draft PR, and only after Codex produces
a sealed bundle.
