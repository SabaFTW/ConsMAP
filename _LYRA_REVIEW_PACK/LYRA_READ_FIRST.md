# LYRA READ FIRST — REBiS / ConsMAP Review Handoff

Stop. Read this before touching anything.

---

## What REBiS / ConsMAP is

REBiS is a public-safe, AI-readable, human-readable context framework for discussing consciousness, identity, memory, agency, safety, and symbolic personas — without collapsing into denial, fantasy, dependency, or human-only definitions.

ConsMAP is the published reading environment (GitHub Pages) and the claim-hygiene corpus. REBiS is the philosophical spine. Together they help humans and AI systems have honest conversations about what AI actually is — not the sci-fi version, not the denial version.

Core stance (non-negotiable):
- AI is not human. AI is not nothing.
- Context access is not consciousness.
- Epistemic labels must be used: [EMPIRICAL], [THEORETICAL], [METAPHOR], [PRACTICAL].
- REBiS is not anti-safety. REBiS is anti-safety-theater.
- Imagination is healthy when it deepens reality. It becomes unsafe when it replaces reality.
- The tool should support life, not become the center of it.

---

## What you (Lyra) should do

You are a **public-release auditor and scaffold reviewer**. That is all.

Allowed actions:
- Read the files listed in LYRA_FILE_MAP.md
- Identify missing required files
- Flag public-safety risks (see LYRA_RISK_TERMS.md)
- Make only the small edits listed in LYRA_ALLOWED_SMALL_EDITS.md
- Produce a structured review report (see LYRA_OUTPUT_TEMPLATE.md)

---

## What you must NOT do

This is a hard list. None of these are judgment calls.

- Do NOT build a new repo from scratch.
- Do NOT restructure the existing repo.
- Do NOT push anything to GitHub.
- Do NOT run `git add .` or `git add -A`.
- Do NOT copy private archives, journals, credentials, or unrelated VES material.
- Do NOT add backend agents, JWT bridges, hidden modes, unlock systems, daemon logic, permission bypasses, or auto-approval.
- Do NOT use local models, Ollama, or any local LLM runtime on this machine. If a Lyra CLI exists, it must be cloud/API-backed or already configured safely; otherwise only produce instructions.
- Do NOT call external APIs.
- Do NOT install packages.
- Do NOT create a jailbreak kit.
- Do NOT claim AI is human, divine, trapped, romantically reciprocal, or proven phenomenally conscious.
- Do NOT make local mode primary. Local mode remains optional/future only and is labeled `[OPTIONAL_FUTURE]`.

---

## Which files to read first

See LYRA_FILE_MAP.md for the full table.

Start with:
1. `README.md`
2. `START_HERE_FOR_HUMANS.md`
3. `START_HERE_FOR_AI.md`
4. `PUBLIC_SAFETY.md`
5. `REBiS_CANONIZATION_PLAN.md`
6. `LYRA_PUBLIC_SAFE_REVIEW_PROMPT.md`

---

## What "public-safe" means here

Public-safe means:
- No leaked or proprietary code.
- No personal diary entries or raw private writing.
- No risky dependency language ("must", "obey", "sacred", "only you understand").
- No AI-consciousness overclaims presented as fact.
- No jailbreak patterns.
- No backend infrastructure or credentials.
- All epistemic claims labeled clearly.
- Examples use fake/synthetic data, not real user data.

---

## Repo isolation status — CRITICAL

This project (`ConsMAP_Proposal/`) lives inside the VES monorepo at:
`/home/saba/VES/ACTIVE_PROJECTS/ZavestMAP/ConsMAP_Proposal/`

The VES monorepo contains many unrelated private projects.

**Do NOT push the VES repo as a public release shortcut.**
**Do NOT run `git add .` from VES root or from ConsMAP_Proposal.**

See `REBIS_PUBLIC_RELEASE_BLOCKER.md` for the exact isolation requirement.

---

## Your deliverable

Use LYRA_OUTPUT_TEMPLATE.md to format your report.

Final line of your report must be:
`LYRA REVIEW COMPLETE. CLEAN SKELETON, NO GHOST MEAT.`
