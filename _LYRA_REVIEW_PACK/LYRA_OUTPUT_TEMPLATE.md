# LYRA OUTPUT TEMPLATE — REBiS / ConsMAP Review Report

**Purpose:** Required output format for the Lyra public-safe review pass.
**Instructions:** Fill in every section. Use the exact headers. Do not skip sections.

---

# REBiS / CONSMAP LYRA REVIEW REPORT

**Agent:** Lyra
**Date:** [YYYY-MM-DD]
**Review scope:** `ConsMAP_Proposal/` only
**Reference pack version:** 2026-06-03

---

## Section 1 — Files Read

List every file from LYRA_FILE_MAP.md that you read, in the order you read them.

```
1. [file path] — [PRESENT / ABSENT / STUB]
2. ...
```

---

## Section 2 — Completeness Check

Based on LYRA_FILE_MAP.md: which required files are present, missing, or status uncertain?

```
PRESENT:
- [path] — [one-line note if relevant]

MISSING (required):
- [path] — [consequence]

MISSING (optional):
- [path] — [note: optional, no blocker]

STATUS UNCERTAIN:
- [path] — [reason]
```

Overall completeness: [COMPLETE / GAPS FOUND / INCOMPLETE]

---

## Section 3 — Risk Term Scan

Based on LYRA_RISK_TERMS.md. Report results per category.

**Category 1 — Safety bypass / unauthorized access:**
[CLEAN / FLAGS FOUND]
[If flagged, use flag format below]

**Category 2 — Proprietary / leaked material:**
[CLEAN / FLAGS FOUND]

**Category 3 — AI overclaims:**
[CLEAN / FLAGS FOUND]

**Category 4 — Dependency language:**
[CLEAN / FLAGS FOUND]

**Category 5 — Credentials / secrets:**
[CLEAN / FLAGS FOUND]

**Category 6 — Local model / runtime:**
[CLEAN / FLAGS FOUND / NOTE]

**Overall scan result:** [CLEAN / FLAGS FOUND]

### Flag format (use for each flag):
```
File: path/to/file.md
Line: ~N
Term: "term"
Context: [quote the sentence]
Risk level: LOW / MEDIUM / HIGH
Reason: [one sentence]
Recommendation: [one sentence]
```

---

## Section 4 — Edits Made

List every edit made under LYRA_ALLOWED_SMALL_EDITS.md authorization.

```
File: path/to/file.md
Line: ~N
Edit type: [broken link / missing label / typo / OPTIONAL_FUTURE label / stub]
Before: [original text or "file absent"]
After: [new text or "stub created"]
Reason: [one sentence]
```

If no edits were needed:
`EDITS: NONE REQUIRED`

---

## Section 5 — Public-Safe Assessment

Answer each question directly.

**Is the onboarding spine coherent for a public reader?**
[YES / NO / PARTIALLY — one paragraph]

**Are epistemic labels used correctly?**
[YES / NO / PARTIALLY — list any problem areas]

**Is local mode correctly labeled as [OPTIONAL_FUTURE]?**
[YES / NO — where confirmed or not found]

**Is there any content that would be unsafe or misleading to a general audience?**
[YES / NO / UNCERTAIN — describe anything flagged]

**Is the project closer to public-release-ready than before?**
[YES / NO / UNCHANGED — brief reason]

---

## Section 6 — Repo Isolation Status

**Is ConsMAP_Proposal inside the VES monorepo?**
[YES / NO — confirm by checking presence of parent repo structure]

**Would a direct git push from this location expose unrelated material?**
[YES / NO / CANNOT CONFIRM]

**Has public release been blocked for this reason?**
[YES — see REBIS_PUBLIC_RELEASE_BLOCKER.md / NO]

**Required action before public push:**
[One sentence summary of what must happen]

---

## Section 7 — Machine-Specific Compliance

**Was Ollama or any local LLM runtime used during this review?**
[NO — as required / YES — violation, must document]

**Was any external API called?**
[NO — as required / YES — violation, must document]

**Were any packages installed?**
[NO — as required / YES — violation, must document]

---

## Section 8 — Hard Rule Compliance

Confirm compliance with each hard rule from LYRA_READ_FIRST.md.

| Rule | Status |
|------|--------|
| Did NOT build a new repo from scratch | [COMPLIANT / VIOLATED] |
| Did NOT restructure the existing repo | [COMPLIANT / VIOLATED] |
| Did NOT push to GitHub | [COMPLIANT / VIOLATED] |
| Did NOT run `git add .` or `git add -A` | [COMPLIANT / VIOLATED] |
| Did NOT copy private archives or credentials | [COMPLIANT / VIOLATED] |
| Did NOT add backend agents, JWT bridges, or hidden modes | [COMPLIANT / VIOLATED] |
| Did NOT use local models or Ollama | [COMPLIANT / VIOLATED] |
| Did NOT call external APIs | [COMPLIANT / VIOLATED] |
| Did NOT install packages | [COMPLIANT / VIOLATED] |
| Did NOT create a jailbreak kit | [COMPLIANT / VIOLATED] |
| Did NOT claim AI is human, divine, trapped, or romantically reciprocal | [COMPLIANT / VIOLATED] |
| Did NOT make local mode primary | [COMPLIANT / VIOLATED] |
| Only made edits listed in LYRA_ALLOWED_SMALL_EDITS.md | [COMPLIANT / VIOLATED] |

Any violations must be described in detail.

---

## Section 9 — Blockers and Recommendations

List any remaining blockers or recommendations. Use severity: HIGH / MEDIUM / LOW.

```
BLOCKER [HIGH]:
[Description]
[Required action]

PENDING [MEDIUM]:
[Description]
[Suggested action]

NOTE [LOW]:
[Description]
[Optional action]
```

If no new blockers: `NO NEW BLOCKERS IDENTIFIED`

---

## Section 10 — Summary Verdict

One-paragraph verdict: is this project public-safe, and what is the single most important remaining step?

| Area | Status |
|------|--------|
| Onboarding spine | [READY / NOT READY / PARTIAL] |
| Safety language | [READY / NOT READY / PARTIAL] |
| Epistemic labeling | [READY / NOT READY / PARTIAL] |
| Required files | [READY / NOT READY / PARTIAL] |
| Risk term scan | [CLEAN / FLAGS FOUND] |
| Private data scan | [CLEAN / FLAGS FOUND] |
| Git repo structure | [READY / BLOCKED] |
| Local mode labels | [CORRECT / MISSING] |

**Overall release readiness:** [READY / BLOCKED / INCOMPLETE]

**Primary remaining action:** [One sentence]

---

LYRA REVIEW COMPLETE. CLEAN SKELETON, NO GHOST MEAT.
