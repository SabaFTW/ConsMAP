# Decision Log

Architectural decisions and the open questions behind them. Newest first.

---

## 2026-08-26 — `docs/` is corpus, not a publish directory

**Decision.** `docs/` holds the canonical written corpus only. The production
build that had been layered into it was separated out.

**Evidence.** `docs/index.html` carried a `/ConsMAP/` base and
`docs/assets/index-CDDAHRjq.js|css` were Vite-hashed bundles — an old
"deploy from branch `main` `/docs`" Pages setup. But `docs/00_foundations/`,
`docs/concepts/`, `docs/theology/` and eleven other directories had no
counterpart in the app's `public/`, so `docs/` was never *only* a build.
Measured split: 122 canonical files (1.34 MB) against 138 build files
(30.22 MB).

**Method.** Every one of the 138 was hashed against the rest of the repository.
130 had a byte-identical survivor elsewhere and were untracked; 8 were unique
and were archived rather than deleted. Nothing was classified by filename.

**Consequence.** 127 of 227 duplicate groups disappear. Do not publish a build
into `docs/` again.

---

## 2026-08-26 — Pages source switched to GitHub Actions

**Decision.** `build_type` changed from `legacy` to `workflow`.

**Evidence.** Pages was serving `main /` through Jekyll, so the live site was a
rendering of README.md (`<title>ConsMAP | guide</title>`) and
`/ConsMAP/baphomet-loader.png` returned 404 — while `deploy.yml` had been
building an artifact nobody served. Three deployment strategies had accumulated:
the `docs/` folder, the `gh-pages` branch, and the Actions workflow.

**Open question.** The `gh-pages` branch (last commit 2026-06-03) is now
inert. It has not been deleted. Someone should decide whether it is history
worth keeping or dead weight.

---

## 2026-08-26 — `public/docs/` is not generated from `docs/`

**Decision.** The two document trees are maintained independently. No
deterministic sync script was added.

**Why not.** A sync would be the tidier architecture, but the trees are not the
same material. `docs/` is the full corpus including material held under the
public-safety boundary; `public/docs/` is the curated subset the reading
application exposes, with its own structure that component code addresses
directly. Generating one from the other would either ship unshipped material or
require a curation manifest — and that manifest, not either tree, would be the
real source of truth.

**Open question.** If someone writes that curation manifest deliberately, this
decision should be revisited. Until then the overlap between the trees is
expected, not a defect, and the duplicate report will keep showing it.

---

## 2026-08-26 — Six identical Baphomet copies retained

**Decision.** None of the six byte-identical `baphomet-loader.png` copies was
deleted, moved or deduplicated.

**Why.** They serve four distinct consumers: the ritual's canonical asset, the
standalone REBiS page's runtime asset, that page's source, and an orphaned
upload artifact. Their mapping is recorded in
`reports/repository-audit/BAPHOMET_REFERENCE_MAP.csv`.

**Open question.** `06_applications/rebis_landing_page/ChatGPT Image May 9, 2026, 10_59_53 PM.png`
has no reference anywhere in the repository. "No reference found" is a weaker
claim than "not needed", and it costs 2.7 MB. Left in place; a human should
decide.

---

## 2026-08-26 — The build was repaired, not worked around

**Decision.** The 24 TypeScript errors blocking `npm run build` were fixed
rather than suppressed.

**Context.** `main` had been unbuildable since 2026-06-20 (PR #52), so no
deployment had succeeded since 2026-06-03. `BusStory.tsx` used `galleryImages`
in 19 places without ever defining it — the Visual Archive gallery had never
compiled.

**Method.** `galleryImages` was composed from data already in the file
(chronology entries resolving through `storyImageMap`, then the factory-bible
relics, deduplicated by src). No asset or path was invented. Four dead
constants were removed. `NavState` gained the `busStory` member `App.tsx`
already passed it.

**Open question.** `eslint` still exits 1 with 14 pre-existing errors, mostly
`react-hooks/set-state-in-effect`. Reduced from 18; not addressed here because
fixing them means changing runtime behaviour in components this pass had no
mandate to touch. CI reports lint but does not yet gate on it.
