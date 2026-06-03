# REBiS PUBLIC RELEASE BLOCKER

**Date documented:** 2026-04-26 (first audit) / 2026-06-03 (Lyra pack)
**Severity:** HIGH
**Status:** UNRESOLVED — blocks any public push

---

## The Blocker

`ConsMAP_Proposal/` is NOT its own git repository.

It lives inside the VES monorepo at:

```
/home/saba/VES/ACTIVE_PROJECTS/ZavestMAP/ConsMAP_Proposal/
```

The VES monorepo remote is:

```
https://github.com/SabaFTW/VES.git
```

This is a private, multi-project monorepo containing:
- BICAMERAL_MVP
- GHOSTCORE
- SHABAD_CloudCore
- Personal archives and unrelated project directories
- Private session logs and research material

---

## Why This Matters

A `git push` from inside `ConsMAP_Proposal/`, or from the VES root while ConsMAP files are staged, would push the **entire VES monorepo** — not just ConsMAP.

This would expose:
- Unrelated private projects
- Personal archives, journals, and session logs
- Any untracked or modified files in VES that were accidentally included in a `git add .`
- Files that have not been scanned for private data, credentials, or sensitive content

**REBiS content is public-safe. The surrounding VES monorepo is not.**

---

## What Must Happen Before Any Public Push

Choose one of the following. All three are valid; Option A is recommended.

### Option A — New dedicated repo (recommended)

1. Create a new empty GitHub repository: `SabaFTW/ConsMAP` or `SabaFTW/REBiS`
2. Copy the contents of `ConsMAP_Proposal/` into it (do not copy `.git/` from VES)
3. Run `git init` in the new directory
4. Add and commit only the public-safe files (follow the commit plan in `PRE_RELEASE_AUDIT_2026-04-26.md`, Section 5)
5. Set the new repo as origin
6. Push

**Advantages:** Clean history. No risk of VES contamination. Easy to verify before push.

---

### Option B — Git subtree extraction

Use `git subtree split` or `git filter-repo` to extract `ConsMAP_Proposal/` history into its own repo, preserving commit history.

```bash
# Example using git filter-repo (requires separate install)
cd /home/saba/VES
git filter-repo --subdirectory-filter ACTIVE_PROJECTS/ZavestMAP/ConsMAP_Proposal --to-subdirectory-filter . --force
```

**Advantages:** Preserves history.
**Risks:** Requires careful execution. Verify the extracted repo contains NO VES material before push. Do not run without understanding what filter-repo does.

---

### Option C — Git subtree push

Push only the ConsMAP subdirectory as a subtree to a separate remote, leaving VES intact.

```bash
# Push subtree to a new remote
git subtree push --prefix=ACTIVE_PROJECTS/ZavestMAP/ConsMAP_Proposal origin-consmap main
```

**Advantages:** VES monorepo stays intact. No restructuring.
**Risks:** Requires a pre-configured `origin-consmap` remote pointing to the new public repo. History includes VES-level commits — verify this is acceptable.

---

## What NOT to Do

- Do NOT run `git push` on the VES repo as a shortcut
- Do NOT run `git add .` or `git add -A` from VES root
- Do NOT run `git add .` from inside `ConsMAP_Proposal/` (still stages against VES history)
- Do NOT assume that pushing from inside a subdirectory isolates the push — git operates at repo root
- Do NOT copy the `.git/` directory from VES into the new repo

---

## Current Status

| Check | Status |
|-------|--------|
| ConsMAP content: public-safe | YES (2026-04-26 audit) |
| Dedicated public repo exists | NO |
| VES push isolation confirmed | NO |
| Blocker resolved | NO |

---

## Reference

See also:
- `PRE_RELEASE_AUDIT_2026-04-26.md` — Section 4 (original blocker documentation)
- `PUBLIC_RELEASE_CHECKLIST.md` — Section 12 (GitHub release strategy)
- `REBiS_CANONIZATION_PLAN.md` — public release roadmap

---

*This blocker does not affect the quality of the content. REBiS / ConsMAP is content-ready. The git structure is the only remaining obstacle.*
