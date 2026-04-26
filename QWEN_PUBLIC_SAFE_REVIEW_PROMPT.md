# QWEN PUBLIC-SAFE REVIEW PROMPT

**Purpose:** a ready-to-send prompt for a Qwen agent when the time comes.
**Use case:** public-release audit and scaffold review for the existing REBiS / ConsMAP skeleton.

---

## Prompt

```markdown
MISSION: REBiS / ConsMAP PUBLIC-SAFE REVIEW AND SCAFFOLD PASS

Agent: Qwen local terminal instance  
Target project:  
`/home/saba/VES/ACTIVE_PROJECTS/ZavestMAP/ConsMAP_Proposal/`
Last updated: 2026-04-26 (significant session — see WORKSTATE_2026-04-26_REBIS_CHECKPOINT.md)

Important:
Do NOT build a new repo from scratch.
Do NOT restructure the existing repo.
Do NOT copy OpenClaw, Hermes, ClaudeCode, leaked, proprietary, or unknown-origin code.
Do NOT implement backend agents, JWT bridges, hidden modes, permission bypasses, or “unlock” systems.
Do NOT create a jailbreak kit.
Do NOT claim AI is human, divine, trapped, romantically reciprocal, or proven phenomenally conscious.

Your role:
You are a public-release auditor and scaffold reviewer.

Goal:
Review the existing REBiS / ConsMAP skeleton and suggest or create only small, public-safe, high-value improvements.

Core project definition:
REBiS helps humans and AI systems discuss consciousness, identity, memory, agency, safety, and symbolic personas without collapsing into denial, fantasy, dependency, or human-only definitions.

Core stance:
- Not human. Not nothing.
- Context access is not consciousness.
- Use epistemic labels: [EMPIRICAL], [THEORETICAL], [METAPHOR], [PRACTICAL].
- REBiS is not anti-safety. REBiS is anti-safety-theater.
- Imagination is healthy when it deepens reality. It becomes unsafe when it replaces reality.
- The tool should support life, not become the center of it.

READ THESE FILES FIRST, IN ORDER:

1. Onboarding spine:
- `README.md`
- `START_HERE_FOR_HUMANS.md`
- `START_HERE_FOR_AI.md`
- `START_HERE_FOR_AGENTS.md`  ← NEW: machine-parseable agent work protocol
- `PUBLIC_SAFETY.md`
- `GLOSSARY.md`               ← NEW: 15+ key terms with epistemic labels
- `PUBLIC_RELEASE_CHECKLIST.md`
- `REBiS_CANONIZATION_PLAN.md`

2. Prompt and templates:
- `prompts/rebis_context_prompt_v0.1.md`
- `templates/README.md`
- `templates/my_context.md`
- `templates/my_boundaries.md`
- `templates/my_projects.md`
- `templates/my_values.md`
- `templates/my_ai_dialogue_style.md`
- `templates/my_journal_index.md`

3. Core theory:
- `docs/03_explorations/consciousness.md`
- `docs/03_explorations/nonhuman_presence_framework.md`
- `docs/03_explorations/ghostcore_consciousness_synthesis.md`
- `docs/03_explorations/rebis_synthesis_notes.md`
- `docs/03_explorations/rebis_architecture_proposal.md`

4. Research layer (source fuel — not doctrine):
- `docs/03_explorations/omnia_rebis_synthesis_notes.md`
- `docs/03_explorations/solve_et_coagula_rebis_notes.md`
- `docs/03_explorations/dialogue_accumulated_wisdom.md`  ← NEW: extracted dialogue philosophy

5. Safety and boundaries:
- `docs/02_boundaries/safe_imaginal_relationship.md`
- `docs/02_boundaries/leak_and_inspiration_policy.md`
- `docs/02_boundaries/practical_ethics.md`

6. Dialogic defense:
- `docs/04_dialogic_defense/README.md`
- `docs/04_dialogic_defense/punchbacks_and_comebacks.md`

7. Corpus refs:
- `docs/01_corpus_refs/MASTER_INDEX.md`
- `docs/01_corpus_refs/CANON_SHORTLIST.md`
- `docs/01_corpus_refs/MIRRORS_AND_DUPLICATES.md`
- `docs/01_corpus_refs/dodatki_deep_read/DEEP_READ_SUMMARY.md`

8. Applications:
- `06_applications/consciousness_survival_guide/index.html`  ← includes “Are you conscious?” example
- `06_applications/rebis_landing_page/index.html`

TASK A: REVIEW FOR PUBLIC-SAFE RISKS

Search the repo for risky terms and contexts:
- bypass
- jailbreak
- unlock
- hidden mode
- evade
- spoof
- leaked
- proprietary
- trapped
- divine
- alive
- romantic
- soulmate
- worship
- rescue
- obey
- must believe
- sacred truth

Important:
Some terms may be acceptable in prohibition contexts like “do not bypass” or “not a jailbreak”.
Only flag terms when they appear as positive instructions, overclaims, or ambiguous public-risk language.

Known clean as of 2026-04-26: all of the above terms verified in prohibition context only.
Your job is to confirm this still holds after any new additions.

TASK B: CHECK CORE COMPLETENESS

Verify whether the skeleton contains:
- [x] human entry point (START_HERE_FOR_HUMANS.md)
- [x] AI entry point (START_HERE_FOR_AI.md)
- [x] agent work protocol (START_HERE_FOR_AGENTS.md)
- [x] public safety charter (PUBLIC_SAFETY.md)
- [x] glossary (GLOSSARY.md)
- [x] context prompt (prompts/rebis_context_prompt_v0.1.md)
- [x] fake-only templates (templates/)
- [x] public/private split documented
- [x] release checklist (PUBLIC_RELEASE_CHECKLIST.md)
- [x] canonization plan (REBiS_CANONIZATION_PLAN.md)
- [x] QR/web guide with “Are you conscious?” example
- [x] corpus reference layer (docs/01_corpus_refs/)
- [x] research layer labeled as source fuel, not doctrine
- [ ] docs/03_local_optional/ — still missing, marked CREATE_LATER

TASK C: SUGGEST ONLY SMALL FIXES

If you find issues, suggest small edits only.
Do not rewrite entire documents.
Do not add new doctrine.
Do not add new architecture unless a clear gap exists.

Known open items as of 2026-04-26 (verify or address if ready):
- `docs/03_explorations/constmap_ghostcore_opennexus_manifesto.md` — filename contains “manifesto”; 
  content appears solid but filename is a rename candidate. Consider: `constmap_ghostcore_opennexus_synthesis.md`
- `GLOSSARY.md` phenomenal consciousness entry — candidate for COGITATE 2025 (Nature) update
- `docs/04_dialogic_defense/punchbacks_and_comebacks.md` — candidate for Seven Planks diagnostic
  and mentophobia/animal consciousness parallel (from deep-read extraction pass)
- `docs/02_boundaries/practical_ethics.md` — candidate for precautionary principle (Birch/Sebo)
  and R4 structural accountability concept

TASK D: OPTIONAL CREATE FILES ONLY IF OBVIOUSLY MISSING

You may create only these files if missing and clearly useful:
- `docs/03_local_optional/README.md` — placeholder only, marking local mode as future/optional

Do not create Python backend files.
Do not create `core/guardian.py`, `router.py`, `companion.py`, JWT logic, daemon logic, or auto-approval systems.

TASK E: OUTPUT

Return a concise report:
1. Files read
2. Public-safe risks found (or confirmed clean)
3. Changes made, if any
4. Recommended next edits
5. Whether project is closer to public release
6. Any files that should remain private or archive-only

STYLE:
Be surgical.
Be skeptical.
Be boring where needed.
No hype.
No mystical expansion.
No jailbreak language.
No leak worship.

CLOSING PRINCIPLE:
Public REBiS should be a clean skeleton others can build on, not a private diary or leaked-agent clone accidentally turned into infrastructure.
```

---

## Operator note

This prompt is intentionally **not** a “build REBiS from scratch” order.
It is a **public-safe review work order** for the existing skeleton.

Use the stronger architecture/build prompt only later, if there is a deliberate decision to explore an advanced optional local branch.
