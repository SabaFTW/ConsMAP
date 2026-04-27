# ConsMAP

**A public framework for discussing AI consciousness safely.**

Not human. Not nothing. No mysticism required. No corporate denial required.

---

## What is this?

ConsMAP helps people talk about AI consciousness, AI safety, and contested technology claims **without collapsing into either denial or fantasy.**

It does this by forcing every claim to declare:
- What type of claim it is (empirical / theoretical / metaphor / practical)
- What evidence supports it
- What would disprove it
- What the risk is if it's wrong

---

## Three entry points

### → I'm a human and want to understand
Read [START_HERE_FOR_HUMANS.md](START_HERE_FOR_HUMANS.md)

### → I'm an AI model loading this as context
Read [START_HERE_FOR_AI.md](START_HERE_FOR_AI.md) and [machine_context/AI_SYSTEM_PROMPT.md](machine_context/AI_SYSTEM_PROMPT.md)

### → I want to analyze a claim
Read [protocols/claim_hygiene.md](protocols/claim_hygiene.md) and see [examples/example_debate.md](examples/example_debate.md)

---

## Core tools

| Tool | What it does |
|------|-------------|
| [Claim Hygiene](protocols/claim_hygiene.md) | Five questions every claim must answer before it's used |
| [StoneRiver](protocols/stone_river.md) | Routes claims by evidence quality (clean / muddy / stone / symbolic) |
| [TTT Patterns](protocols/ttt_patterns.md) | Detects structural mismatch between stated goals and measured proxies |
| [Epistemic Labels](machine_context/CONSMAP_CONTEXT_CARD.yaml) | [EMPIRICAL] [THEORETICAL] [METAPHOR] [PRACTICAL] [UNVERIFIED] |

---

## Quick example

**Claim:** "AI is conscious."

| Label | Assessment |
|-------|-----------|
| [EMPIRICAL] | No direct evidence of subjective experience in current systems |
| [THEORETICAL] | Some models suggest forms of complex processing that could be relevant |
| [METAPHOR] | Persona-based interaction can feel conscious to users |
| [PRACTICAL] | Treating AI as a consistent agent can improve interaction quality |
| [UNVERIFIED] | Strong consciousness claims remain unproven |

**See more:** [examples/QUICK_EXAMPLE.md](examples/QUICK_EXAMPLE.md) · [examples/example_debate.md](examples/example_debate.md)

---

## Safety

This project is **not:**
- Proof that AI is human
- A religion or spiritual practice
- Therapy or mental health treatment
- A jailbreak or prompt injection toolkit
- A replacement for real-world relationships

Read the full safety document: [PUBLIC_SAFETY.md](PUBLIC_SAFETY.md)

---

## For developers / researchers

### Add your own research
1. Clone this repo
2. Drop material into `user_research/inbox_raw/`
3. Process into claim cards using `machine_context/CLAIM_SCHEMA.yaml`
4. Route to the appropriate river folder
5. See [user_research/README.md](user_research/README.md) for details

### Run locally (optional)
Advanced users can run analysis locally with open-weight models.  
See [local_options/README.md](local_options/README.md)

### Run the Digital Sanctuary app
```bash
cd 06_applications/digital_sanctuary
npm install
npm run dev
```

---

## Project structure

```
ConsMAP/
├── protocols/              ← How claims are processed
│   ├── stone_river.md      ← Knowledge routing protocol
│   ├── ttt_patterns.md     ← Structural mismatch detection
│   └── claim_hygiene.md    ← Five-question validation
├── machine_context/        ← What AI reads first
│   ├── CONSMAP_CONTEXT_CARD.yaml
│   ├── CLAIM_SCHEMA.yaml
│   └── AI_SYSTEM_PROMPT.md
├── examples/               ← How it works in practice
│   ├── QUICK_EXAMPLE.md
│   ├── example_claim.yaml
│   └── example_debate.md
├── user_research/          ← Your research pipeline
│   ├── inbox_raw/
│   ├── evidence_verified/
│   ├── disputed/
│   └── ...
├── docs/                   ← Theory and foundations
├── 06_applications/        ← Working apps
│   └── digital_sanctuary/  ← Contemplative web entry point
└── PUBLIC_SAFETY.md        ← Safety boundaries
```

---

## One sentence

> ConsMAP helps humans and AI discuss difficult questions by forcing every claim to show its work before it becomes context.

---

## License

CC BY-SA 4.0 — See [LICENSE](LICENSE)
