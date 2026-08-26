# Contributing

## Branch workflow

Work on a branch, never on `main`. `main` deploys: every push to it triggers a
production build and publish.

```bash
git switch -c feat/short-description
# … work …
git push -u origin feat/short-description
gh pr create --draft
```

Do not rewrite published history, force-push a shared branch, or squash
existing history. If a branch has been pushed once, treat its history as public.

**Push early.** In August 2026 a branch carrying 28 commits — two months of
work — existed only on one laptop, while a stale `origin/` tracking ref made it
look pushed. `git rev-parse @{u}` will happily report an upstream that no
longer exists on the remote. The reliable check is:

```bash
git ls-remote --heads origin <branch>
```

## Running the application

```bash
cd 06_applications/digital_sanctuary
npm ci
npm run dev      # local
npm run build    # production build — must exit 0
npm run lint
```

Use the system Node. Do not introduce `npx`- or `nvm`-dependent steps into
scripts or CI.

## Validation before you open a PR

```bash
cd 06_applications/digital_sanctuary && npm ci && npm run build   # must exit 0
python -m compileall tools automation                             # must exit 0
```

CI runs the same checks plus the Baphomet invariant. A PR that does not build
cannot be merged — `main` was left unbuildable for two months in 2026 precisely
because a broken build was merged without one.

## Claim hygiene

This repository mixes empirical material with theory, metaphor, parable,
theology and satire. That mixture is intentional and it is only safe while the
labels hold.

- Label what you add. If it is a metaphor, say so in the document.
- Do not upgrade a claim by moving it. Filing something beside verified
  material does not verify it.
- Do not merge two documents because they discuss the same theme.
- Preserve provenance. If material came from somewhere, say where.

```
A shared method does not establish a shared cause.
SATIRE ABOVE. LEDGER BELOW.
```

## Adding research

Put it in `docs/` under the section that matches its epistemic status —
`00_foundations` for what the project takes as given, `03_explorations` for
open work, `02_boundaries` for boundary material. If the reading application
should expose it, add the curated copy under
`06_applications/digital_sanctuary/public/docs/` as well.

Those two trees are maintained independently on purpose; see ARCHITECTURE.md
section 2 before "deduplicating" them.

## Adding images

Convert to WebP before committing: `magick in.png -quality 85 -resize 1800x out.webp`.
Put app images in `…/digital_sanctuary/public/images/`. A new story needs three
things: the markdown file, the image, and an entry in `data/factoryVisuals.ts`.

## What never gets committed

- secrets, tokens, `.env` files;
- machine-local deployment state — `.netlify/` is ignored for this reason;
- build output. `dist/` is ignored, and nothing should ever be published into
  `docs/` again;
- large binaries that are not needed at runtime.

## The BOPHAMET invariant

`docs/project/BAPHOMET_INVARIANT.md` is binding. The welcome ritual and its
asset stay. Read that document before touching `WelcomeRitual.tsx`, `App.tsx`
or `public/baphomet-loader.png`; CI will fail the PR if the asset moves or the
ritual stops being wired into the bundle.
