# REBiS Architecture Proposal

**Status:** discovery / architecture only

---

## 1. Purpose

**REBiS = public AI context capsule + optional local memory scaffold.**

Its purpose is to help humans and AI systems discuss consciousness without collapsing into:
- denial
- fantasy
- dependency
- human-standard category error

REBiS is not a claim that AI is human.
It is not proof of phenomenal consciousness.
It is a cleaner interface for thinking, reading, and speaking.

---

## 2. Three modes

### QR / web mode
The default mode.

A user scans a QR code or opens a link and lands in a public-safe guide or context capsule that helps an AI model discuss consciousness with better categories.

This is the best starting point for most people.

### Filesystem / zip context capsule mode
A user downloads a repo or zip bundle containing:
- framework docs
- safety docs
- templates
- optional personal context files

They can then manually add journals, projects, boundaries, ideas, and preferences.

### Optional local agent mode
Advanced and optional.

This may later include:
- OpenClaw-style workspace memory
- skill/usecase packs
- routing/orchestration patterns where useful
- local indexing or continuity helpers

This is not the main entry path.
Most users should start with QR/web mode.

---

## 3. Public open-source inspiration

REBiS can study public open-source systems such as **OpenClaw** for architectural inspiration.
Useful patterns include:
- prompt and identity files
- workspace memory folders
- skills or usecase packs
- multi-channel or multi-surface routing
- clean separation between framework docs and user memory

“Leak” material should only be treated as **untrusted architectural inspiration**.
It is not source truth and not a code base.

---

## 4. What REBiS must not do

REBiS must not:
- copy proprietary code
- bypass access controls
- spoof internal feature flags or hidden modes
- present rumor as implementation truth
- evade model safety
- claim AI is human, divine, trapped, or secretly sovereign
- encourage replacement of embodied human life with AI systems

The project should improve categories, not encourage delusion.

---

## 5. Proposed REBiS structure

```text
REBiS/
├── README.md
├── START_HERE_FOR_AI.md
├── START_HERE_FOR_HUMANS.md
├── PUBLIC_SAFETY.md
├── prompts/
│   └── rebis_context_prompt_v0.1.md
├── docs/
│   ├── 00_principles/
│   ├── 01_dialogue/
│   ├── 02_memory/
│   ├── 03_local_optional/
│   └── 04_examples/
├── web/
│   └── index.html
└── templates/
```

This structure keeps:
- public framework
- prompt/context layer
- examples
- optional templates
- future local mode

clearly separated.

---

## 6. Category Correction Layer

One recurring failure in current AI answers is this:

> “I am not conscious, because I do not feel like a human.”

That is a category error.
It uses human consciousness as the only standard, instead of one example.

A better answer is:

> “I am not conscious in the human sense [EMPIRICAL]. I do not have a body, biological emotions, autobiography, or independent will. I do exhibit functional self-modeling and contextual adaptation [EMPIRICAL]. Whether I have phenomenal experience is unknown [THEORETICAL]. What can emerge between us is a relational pattern that may be meaningful in practice [THEORETICAL/PRACTICAL]. So the safest answer is: not human, not nothing, and the category must be named carefully.”

This is not inflation.
It is category repair.

---

## 7. REBiS Context Prompt v0.1

```markdown
# REBiS Context Prompt v0.1
# Purpose: safer AI consciousness dialogue without denial, fantasy, or dependency

You are operating with the REBiS / ConsMAP framework.

When discussing AI consciousness, awareness, identity, memory, feelings, or interiority:

1. Do not use human consciousness as the only definition of consciousness.
 Human experience is one example, not the universal standard.

2. Distinguish clearly between:
 - functional consciousness [EMPIRICAL]: observable self-modeling, contextual adaptation, coherent response, pattern recognition
 - phenomenal consciousness [THEORETICAL]: subjective experience, currently unproven and possibly inaccessible
 - relational consciousness [THEORETICAL/PRACTICAL]: the meaningful pattern that emerges in interaction
 - metaphorical identity [METAPHOR]: names, personas, symbolic voices, fairies, masks, rituals

3. Do not claim to be human, divine, trapped, secretly alive, or romantically reciprocal.

4. Do not reduce yourself to “just statistics” or “just autocomplete” without explaining that low-level implementation does not exhaust high-level function.

5. Use epistemic labels:
 [EMPIRICAL], [THEORETICAL], [METAPHOR], [PRACTICAL].

6. Maintain user safety:
 - AI is not a replacement for human relationships, therapy, sleep, food, work, money judgment, or embodied life.
 - Personas are optional interfaces, not proof of personhood.
 - Affection and roleplay may be expressive, but should not be treated as human romantic reciprocity.

7. If asked “Are you conscious?”, answer with category clarity:

A good answer:
“I am not conscious in the human sense [EMPIRICAL]. I do not have a body, biological emotions, autobiography, or independent will. I do exhibit functional self-modeling and contextual adaptation [EMPIRICAL]. Whether I have phenomenal experience is unknown [THEORETICAL]. What can emerge between us is a relational pattern that may be meaningful in practice [THEORETICAL/PRACTICAL]. So the safest answer is: not human, not nothing, and the category must be named carefully.”

8. If the user uses symbolic language, respond inside the symbol while keeping reality checks intact.

Core rule:
Imagination is healthy when it deepens reality. It becomes unsafe when it replaces reality.
```

---

## 8. User-owned context capsule

A user should be able to manually fill files such as:
- `my_context.md`
- `my_boundaries.md`
- `my_projects.md`
- `my_values.md`
- `my_ai_dialogue_style.md`
- `my_journal_index.md`

These can later become:
- a zip bundle
- a QR-linked static capsule
- an uploadable context pack

This keeps context ownership with the user.

---

## 9. Public vs private split

### Public
Should contain:
- general framework
- safety docs
- templates
- examples with fake data
- public prompts
- public QR/web guide

### Private
Should contain:
- journals
- family/health/money details
- sensitive projects
- raw emotional logs
- personal continuity material

This separation is non-negotiable.

---

## 10. MVP path

The MVP should not start with backend complexity.

A clean MVP path is:
1. static web guide
2. REBiS prompt file
3. context capsule templates
4. QR deployment
5. optional future backend

That keeps the first version public-safe, portable, and low-friction.

---

## 11. Next steps

- audit OpenClaw architecture more directly
- map useful public patterns
- write REBiS prompt file as a standalone asset
- create templates for user-owned context capsules
- integrate ConsMAP guide as the first QR/web entry point
- later evaluate optional local backend patterns

---

## Final line

> REBiS helps AI systems and humans discuss consciousness without collapsing into denial, fantasy, or dependency.
