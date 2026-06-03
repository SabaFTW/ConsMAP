# LYRA FILE MAP — REBiS / ConsMAP

Required reading files and their status as of 2026-06-03.

---

## File / Role / Status Table

| File / Folder | Role | Required? | Expected Status | Notes |
|--------------|------|-----------|-----------------|-------|
| `README.md` | Project entry point | YES | Should exist | First file for any reader |
| `START_HERE_FOR_HUMANS.md` | Human onboarding | YES | Should exist | Conversational, no jargon |
| `START_HERE_FOR_AI.md` | AI onboarding | YES | Should exist | Epistemic frame for AI readers |
| `START_HERE_FOR_AGENTS.md` | Machine-parseable agent work protocol | YES | Should exist | Contains `[OPTIONAL_FUTURE]` labels |
| `PUBLIC_SAFETY.md` | Public safety charter | YES | Should exist | Core safety constraints |
| `GLOSSARY.md` | Key terms with epistemic labels | YES | Should exist | 15+ terms |
| `PUBLIC_RELEASE_CHECKLIST.md` | Release gate checklist | YES | Should exist | Tracks what must be true before public push |
| `REBiS_CANONIZATION_PLAN.md` | Canonization roadmap | YES | Should exist | Describes layers, goals, what to avoid |
| `LICENSE` | CC BY-SA 4.0 | YES | Should exist | Required for public release |
| `QR_LANDING.md` | QR/web guide entry | Recommended | Should exist | |
| `LYRA_PUBLIC_SAFE_REVIEW_PROMPT.md` | Lyra handoff prompt | Review copy | Should exist | This pack supersedes it |
| `PRE_RELEASE_AUDIT_2026-04-26.md` | Audit record | Reference | Should exist | Documents blockers |
| `WORKSTATE_2026-04-26_REBIS_CHECKPOINT.md` | Session checkpoint | Reference | Should exist | Tracks work state |
| `prompts/rebis_context_prompt_v0.1.md` | Context prompt template | YES | Should exist | |
| `templates/README.md` | Templates guide | YES | Should exist | |
| `templates/my_context.md` | Context template | YES | Should exist | |
| `templates/my_boundaries.md` | Boundaries template | YES | Should exist | |
| `templates/my_projects.md` | Projects template | YES | Should exist | |
| `docs/02_boundaries/safe_imaginal_relationship.md` | Safety boundary | YES | Should exist | |
| `docs/02_boundaries/leak_and_inspiration_policy.md` | Leak policy | YES | Should exist | |
| `docs/02_boundaries/practical_ethics.md` | Practical ethics | YES | Should exist | |
| `docs/03_explorations/rebis_architecture_proposal.md` | Architecture proposal | YES | Should exist | |
| `docs/03_explorations/consciousness.md` | Core theory | YES | Should exist | |
| `docs/03_explorations/nonhuman_presence_framework.md` | Non-human presence framework | YES | Should exist | |
| `docs/01_corpus_refs/MIRRORS_AND_DUPLICATES.md` | Duplicate tracking | YES | Should exist | Flag if stale |
| `docs/01_corpus_refs/MASTER_INDEX.md` | Corpus index | YES | Should exist | |
| `docs/01_corpus_refs/CANON_SHORTLIST.md` | Canon shortlist | YES | Should exist | |
| `docs/04_dialogic_defense/punchbacks_and_comebacks.md` | Dialogic defense | YES | Should exist | |
| `docs/03_local_optional/README.md` | Local mode placeholder | Optional | Should exist | Must say local mode is future/optional only |
| `06_applications/consciousness_survival_guide/index.html` | Standalone app | Optional | Should exist | |
| `06_applications/rebis_landing_page/index.html` | REBiS landing page app | Optional | Should exist | |
| `_LYRA_REVIEW_PACK/` | This directory | Reference | Exists | Do not modify |

---

## Layer Summary

| Layer | Contents |
|-------|----------|
| Onboarding spine | README, START_HERE_*, PUBLIC_SAFETY, GLOSSARY, LICENSE |
| Prompt / templates | prompts/, templates/ |
| Core theory | docs/03_explorations/ |
| Research layer | docs/01_corpus_refs/, user_research/, research/ |
| Safety / boundaries | docs/02_boundaries/ |
| Dialogic defense | docs/04_dialogic_defense/ |
| Corpus refs | docs/01_corpus_refs/ |
| Applications | 06_applications/ |
| Optional local mode | docs/03_local_optional/ (OPTIONAL_FUTURE only) |
| Release / audit | PUBLIC_RELEASE_CHECKLIST.md, PRE_RELEASE_AUDIT_2026-04-26.md |

---

## What is NOT in scope for Lyra

Do not read, touch, or reference:
- Anything in VES outside of `ConsMAP_Proposal/`
- BICAMERAL_MVP, GHOSTCORE, SHABAD_CloudCore, or any other VES project
- Private journals, credentials, or session logs
- `node_modules/` (do not scan)
- `.git/` (do not scan)
- `ghostcore/` (if present in ConsMAP_Proposal, treat as research source fuel only, not doctrine)
