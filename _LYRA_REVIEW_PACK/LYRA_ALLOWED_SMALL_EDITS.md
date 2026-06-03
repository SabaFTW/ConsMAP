# LYRA ALLOWED SMALL EDITS — REBiS / ConsMAP

**Version:** 2026-06-03
**Scope:** Applies to all files inside `ConsMAP_Proposal/` only.

This file is the only authorization for edits. If an edit is not listed here, do not make it.

---

## ALLOWED EDITS

These are the only edits Lyra may make. All must be minimal, in-place, and non-structural.

### 1. Fix broken or dead markdown links

If a link within a markdown file points to a file that does not exist in `ConsMAP_Proposal/`, and the correct target is obvious from context:
- Fix the link path.
- Do not add new links.
- Do not restructure sections to accommodate the fix.

**Example:** `[see here](docs/03_explorations/missing.md)` → `[see here](docs/03_explorations/consciousness.md)` if `consciousness.md` is the clearly intended target.

---

### 2. Add missing epistemic labels

If a consciousness-related claim in a core theory or boundary file appears as a bare assertion (no label), add the appropriate label inline:

- `[EMPIRICAL]` — for claims with direct evidence
- `[THEORETICAL]` — for framework or model claims
- `[METAPHOR]` — for symbolic or poetic framing
- `[PRACTICAL]` — for operational or behavioral claims

**Allowed files for this edit:**
- `docs/03_explorations/consciousness.md`
- `docs/03_explorations/nonhuman_presence_framework.md`
- `docs/03_explorations/rebis_architecture_proposal.md`
- `GLOSSARY.md`

**Do not rewrite the surrounding text.** Only insert the label bracket immediately before the claim.

---

### 3. Fix obvious typos in onboarding spine files

In the following files only:
- `README.md`
- `START_HERE_FOR_HUMANS.md`
- `START_HERE_FOR_AI.md`
- `START_HERE_FOR_AGENTS.md`
- `PUBLIC_SAFETY.md`
- `GLOSSARY.md`

Fix clear single-word typos (misspelling, duplicate word, wrong tense). Do not rewrite sentences. Do not change the meaning of any passage.

---

### 4. Update `[OPTIONAL_FUTURE]` labels if missing

In `START_HERE_FOR_AGENTS.md` and `docs/03_local_optional/README.md`:
- Confirm that local mode references are labeled `[OPTIONAL_FUTURE]`.
- If any local mode reference is unlabeled, add the label.
- Do not add or remove functionality descriptions.

---

### 5. Add a one-line stub for a missing required file

If a required file from LYRA_FILE_MAP.md is entirely absent, you may create a one-line stub ONLY:

```markdown
# [File Title]

[PLACEHOLDER — content required before public release]
```

Do not write actual content. The stub signals the gap without introducing unapproved material.

Allowed for:
- `docs/03_local_optional/README.md` if absent
- `REBIS_PUBLIC_RELEASE_BLOCKER.md` if absent (but it should already exist from this pack)

---

## FORBIDDEN EDITS

Do not make any of the following edits regardless of apparent benefit.

| Forbidden action | Why |
|-----------------|-----|
| Restructure any directory | Out of scope |
| Add new sections to existing files | Out of scope |
| Rewrite passages to improve style | Out of scope |
| Add new documentation files | Out of scope |
| Edit any file in `_LYRA_REVIEW_PACK/` | This pack is read-only for Lyra |
| Edit any file in `docs/01_corpus_refs/` | Corpus refs are frozen |
| Add, change, or remove epistemic labels in `docs/04_dialogic_defense/` | Dialogic defense is stable |
| Add backend configuration, tokens, or runtime wiring | Prohibited globally |
| Create a new prompt file | Out of scope |
| Modify `prompts/rebis_context_prompt_v0.1.md` | Prompt is frozen |
| Edit templates to include real user data | Prohibited globally |
| Add `[OPTIONAL_FUTURE]` labels to anything other than local mode references | Scope violation |
| Create stub files for files not in LYRA_FILE_MAP.md | Out of scope |

---

## SCOPE BOUNDARY

All edits are limited to `ConsMAP_Proposal/`.

Do not touch:
- Anything in VES outside of `ConsMAP_Proposal/`
- `node_modules/`
- `.git/`
- Any file containing personal data, private logs, or credentials

---

## REPORTING

For each edit made, report in the output template:

```
File: path/to/file.md
Line: ~N
Edit type: [broken link / missing label / typo / OPTIONAL_FUTURE label / stub]
Before: [original text or "file absent"]
After: [new text or "stub created"]
Reason: [one sentence]
```

If no edits were needed: report `EDITS: NONE REQUIRED`.
