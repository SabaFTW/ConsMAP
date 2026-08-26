# Archive Policy

## What `docs/_archive/` is

Material that is superseded but not disowned. It stays readable because
deleting it would destroy provenance — you could no longer tell what the
project used to think, or what a later document is arguing against.

Each archive subdirectory is dated and named for what it holds, e.g.
`docs/_archive/2026-08-26_stale_pages_build/`.

## What gets archived rather than deleted

A file is archived when it is superseded but unique — when no byte-identical
copy survives elsewhere in the repository.

A file is removed from tracking only when **all** of these hold:

1. its role has been investigated, not guessed from its filename;
2. nothing in code, documentation or workflows references it;
3. it is generated output, byte-identical to a surviving file, or
   demonstrably superseded;
4. the removal is recorded in `reports/repository-audit/MOVE_LEDGER.csv`;
5. the build and link checks pass afterwards.

When in doubt, archive. Git history keeps everything either way, but an
archive directory is discoverable and history is not.

## What archival does *not* mean

**Archival proximity does not establish evidentiary equivalence.**

Two documents sitting in the same archive folder are not thereby equally
credible, equally superseded, or making the same kind of claim. The archive is
a shelf, not an argument. A discarded hypothesis and a document that was merely
reorganised out of the way can share a directory without sharing a status.

This matters more here than in most repositories, because ConsMAP deliberately
holds empirical material, theory, metaphor, parable, theology and satire in one
place. The labels are what keep that safe. Moving a document must never quietly
relabel it.

```
A shared method does not establish a shared cause.
```

If you archive something, say in `docs/project/DECISION_LOG.md` what superseded
it and why. An archive entry without that record is just a file nobody dares
delete.

## Reading archived material

Assume an archived document was true-to-its-author at its date and has since
been superseded by something you should find first. Check the decision log
before citing anything from `_archive/`.
