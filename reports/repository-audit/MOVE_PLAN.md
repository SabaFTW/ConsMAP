# Move Plan

What this pass moved, what it deliberately did not, and why.

## Executed

| # | action | scope | evidence |
|---|---|---|---|
| 1 | untrack stale build output from `docs/` | 130 files, ~29 MB | sha256: byte-identical copy survives outside `docs/` |
| 2 | archive unique stale build output | 8 files → `docs/_archive/2026-08-26_stale_pages_build/` | sha256: no surviving identical copy |
| 3 | untrack machine-local Netlify state | 2 files | content inspection: siteId + absolute local paths |

Per-path detail is in `MOVE_LEDGER.csv`.

## Deliberately not done

**`06_applications/` was not renamed to `apps/`.** The target architecture in
the brief suggests it. It was rejected: the numeric prefix is load-bearing in
`deploy.yml`, `netlify.toml`, `package-lock.json` paths, several component
source-link constants, and a large number of markdown links. The rename buys
cosmetic uniformity and costs a repository-wide reference rewrite in the same
pass as a 138-file separation. Correctness beat uniformity.

**No deterministic `docs/` → `public/docs/` sync was added.** The two trees are
not the same material — see `docs/project/DECISION_LOG.md`. A sync would either
ship material held under the public-safety boundary or require a curation
manifest that would itself become the source of truth. Model B (independently
maintained, documented as such) was chosen on evidence.

**No Baphomet copy was deduplicated.** Six byte-identical copies serve four
distinct consumers; mapping in `BAPHOMET_REFERENCE_MAP.csv`.

**`checkpoints/2026-06-14_175706-pre-zalasite-layer/` was kept.** 4 files, 64 KB,
and its contents *differ* from the live `src/` — a genuine historical snapshot,
not a duplicate. It was excluded from linting, not from the repository.

**`automation/runs/` was left alone.** 89 duplicate groups, but only 0.1 MB
total: these are per-run output directories whose README and YAML boilerplate
repeats by design. Deduplicating run outputs would destroy the record of what
each run produced.

**The `gh-pages` branch was not deleted.** It is inert since 2026-06-03 and no
longer serves anything, but deleting branches is out of scope for this pass.
Recorded as an open question.

## Not a duplicate — the taxonomy that mattered

The word "duplicate" hid five different things. Keeping them apart is what kept
this pass safe:

| kind | example | treatment |
|---|---|---|
| independent clone | `VES/PROJECTS/ConsMAP/ConsMAP` | untouched |
| git worktree | `VES/WORKTREES/consmap_nav_patch` | untouched — shares one `.git`, not a copy |
| non-git snapshot | `VES/APP_SALVAGE_INVENTORY/…` | untouched |
| backup / salvage copy | `VES/BACKUPS/consmap_classics_backup_…` | untouched |
| generated public mirror | `public/docs/` vs `docs/` | kept, documented as intentional |
| genuinely redundant tracked file | 130 stale build files in `docs/` | untracked |

A worktree is not a duplicate, and a backup is not automatically safe to delete.
