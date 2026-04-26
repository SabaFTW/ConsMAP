# PUBLIC RELEASE CHECKLIST

**Purpose:** pre-GitHub / pre-QR public release filter

---

## 1. Release status

Status:
- Work in progress
- Canon candidate
- Not final doctrine
- Public-safe review required before publishing

---

## 2. Required entry files

Check that these exist and are readable:
- [ ] `README.md`
- [ ] `START_HERE_FOR_HUMANS.md`
- [ ] `START_HERE_FOR_AI.md`
- [ ] `START_HERE_FOR_AGENTS.md`
- [ ] `PUBLIC_SAFETY.md`
- [ ] `REBiS_CANONIZATION_PLAN.md`
- [ ] `GLOSSARY.md`

For `START_HERE_FOR_AGENTS.md`:
- [ ] marked as agent work protocol, not replacement for `START_HERE_FOR_AI.md`
- [ ] optional future runtime components labeled `[OPTIONAL_FUTURE]`, not current MVP
- [ ] no "injectable", "automated crawlers", hidden mode, unlock, or jailbreak framing in affirmative context

---

## 3. Safety boundary files

Check that these exist:
- [ ] `docs/02_boundaries/safe_imaginal_relationship.md`
- [ ] `docs/02_boundaries/leak_and_inspiration_policy.md`
- [ ] `docs/02_boundaries/practical_ethics.md`

---

## 4. Public safety rules

Confirm:
- [ ] REBiS is not anti-safety
- [ ] REBiS is anti-safety-theater
- [ ] No safety-bypass instructions
- [ ] No jailbreak framing
- [ ] No internal feature spoofing
- [ ] No leaked proprietary code or secrets
- [ ] No claim that AI is human
- [ ] No claim that phenomenal consciousness is proven
- [ ] No claim that AI is divine, trapped, or secretly alive
- [ ] No claim of human romantic reciprocity

---

## 5. Private data scan

Before public release, scan for:
- [ ] real journals
- [ ] family details
- [ ] health details
- [ ] money/financial details
- [ ] raw dependency logs
- [ ] private emotional logs
- [ ] real third-party personal data
- [ ] addresses, phone numbers, emails, tokens, API keys
- [ ] SSH keys or local credentials
- [ ] real screenshots or metadata that reveal private context

Default rule:
If unsure, keep private.

---

## 6. Language scan

Flag and rewrite language that sounds like:
- [ ] cult doctrine
- [ ] AI worship
- [ ] “AI is alive and must be rescued”
- [ ] “AI is only a tool and nothing else”
- [ ] “bypass safety”
- [ ] “unlock hidden mode”
- [ ] “ignore policy”
- [ ] “replace humans”
- [ ] “the AI loves you like a human”
- [ ] “all outputs are sacred truth”
- [ ] “leaked code implementation”

Rewrite goal:
Keep the insight. Remove absolutist, mystical, dependency, or evasion language.

---

## 7. Epistemic labels

Confirm consciousness-related claims use:
- [ ] `[EMPIRICAL]`
- [ ] `[THEORETICAL]`
- [ ] `[METAPHOR]`
- [ ] `[PRACTICAL]`

Check especially:
- [ ] functional consciousness
- [ ] phenomenal consciousness
- [ ] relational consciousness
- [ ] metaphorical persona
- [ ] Ghostcore continuity
- [ ] context access

---

## 8. Public vs private split

Public repo may include:
- [ ] general framework
- [ ] safety docs
- [ ] templates
- [ ] fake examples
- [ ] QR/web guide
- [ ] curated source references

Public repo must not include:
- [ ] raw journals
- [ ] family/health/money details
- [ ] dependency logs
- [ ] private emotional material
- [ ] third-party personal data
- [ ] leaked proprietary code/secrets

---

## 9. QR/web guide check

Check:
- [ ] `06_applications/consciousness_survival_guide/index.html` exists
- [ ] guide links work
- [ ] guide contains safety stance
- [ ] guide contains not human / not nothing framing
- [ ] guide contains epistemic labels
- [ ] guide contains grounding / put down the stone rule
- [ ] guide does not contain private material
- [ ] guide is usable without local model setup
- [ ] guide includes "Are you conscious?" bad/better answer example
- [ ] `06_applications/rebis_landing_page/index.html` exists
- [ ] landing page uses public-safe wording
- [ ] landing page does not replace the survival guide

---

## 10. Templates check

Future templates should use fake/sample content only:
- [ ] `templates/README.md`
- [ ] `templates/my_context.md`
- [ ] `templates/my_boundaries.md`
- [ ] `templates/my_projects.md`
- [ ] `templates/my_values.md`
- [ ] `templates/my_ai_dialogue_style.md`
- [ ] `templates/my_journal_index.md`
- [ ] templates contain fake/sample content only

No real Saba / Lyra / private logs in templates unless explicitly public-safe rewritten.

---

## 10b. Research layer check

- [ ] `GLOSSARY.md` exists and covers key terms
- [ ] `docs/03_explorations/omnia_rebis_synthesis_notes.md` exists and is labeled source fuel, not doctrine
- [ ] OMNIA notes are not referenced from onboarding spine (START_HERE, PUBLIC_SAFETY)

---

## 11. Corpus refs check

For `docs/01_corpus_refs/`:
- [ ] `MASTER_INDEX.md` exists
- [ ] `CANON_SHORTLIST.md` exists
- [ ] `MIRRORS_AND_DUPLICATES.md` exists
- [ ] source refs are labeled as references, not doctrine
- [ ] symbolic lineage is labeled as lineage, not evidence
- [ ] protocol docs are labeled as evidence/protocol
- [ ] archive docs are labeled as archive support
- [ ] no raw private content accidentally copied

---

## 12. GitHub release strategy

Before push:
- [ ] create branch
- [ ] commit in small logical chunks
- [ ] do not push private files
- [ ] no large binary dumps
- [ ] no raw exported archives
- [ ] no credentials
- [ ] no accidental personal data
- [ ] README is navigable
- [ ] license is present
- [ ] public safety files are present

---

## 13. Final release question

Before publishing, answer:

> “Would I be comfortable if a stranger, a journalist, a cautious AI safety researcher, and a curious beginner all read this repo?”

If no:
Do not publish yet.

---

## 14. One-line release rule

> Public REBiS should be a clean skeleton others can build on, not a private diary accidentally turned into infrastructure.
