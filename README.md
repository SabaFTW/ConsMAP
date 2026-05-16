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

## Before You Analyze

For high-voltage or identity-charged topics, start with the [Sanctuary Reasoning Threshold](docs/concepts/sanctuary_reasoning_threshold.md).

ConsMAP is not a protected belief space.  
It is a protected reasoning space: claims still have to show their work.

---

## Three entry points

### → I'm a human and want to understand
Read [START_HERE_FOR_HUMANS.md](START_HERE_FOR_HUMANS.md)

### → I'm an AI model loading this as context
Read [START_HERE_FOR_AI.md](START_HERE_FOR_AI.md) and [machine_context/AI_SYSTEM_PROMPT.md](machine_context/AI_SYSTEM_PROMPT.md)

### → I want to analyze a claim
Read [protocols/claim_hygiene.md](protocols/claim_hygiene.md) and see [examples/example_debate.md](examples/example_debate.md)

---

## Try it now

The repository includes local, deterministic CLI tools. No API keys required.

**Quick analysis of a raw claim:**
```bash
python tools/analyze_claim.py --text "AI safety audits can become compliance theater when reports are produced but corrective actions are not measured."
```

**Generate a structured claim card interactively:**
```bash
python tools/create_claim_card.py
```

---

## Core tools

| Tool | What it does |
|------|-------------|
| [Claim Hygiene](protocols/claim_hygiene.md) | Five questions every claim must answer before it's used |
| [StoneRiver](protocols/stone_river.md) | Routes claims by evidence quality (clean / muddy / stone / symbolic) |
| [Confidence Integrity (TTT)](protocols/ttt_patterns.md) | Detects proxy-reality drift to prevent overconfidence on stale/unverified data |
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
├── tools/                  ← Local deterministic CLI tools
│   ├── analyze_claim.py
│   └── create_claim_card.py
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

## Navigation: Active Framework Layers

ConsMAP now includes several companion layers beyond the core claim-hygiene protocol:

- [`protocols/claim_hygiene.md`](protocols/claim_hygiene.md) — five-question claim hygiene protocol.
- [`protocols/stone_river.md`](protocols/stone_river.md) — routing protocol for research material.
- [`protocols/operator_audit.md`](protocols/operator_audit.md) — operator-side audit discipline.
- [`protocols/operator_field_guide_v2_3.md`](protocols/operator_field_guide_v2_3.md) — field guide for operator usage.
- [`docs/concepts/anchor_attribution_drift.md`](docs/concepts/anchor_attribution_drift.md) — concept note on crisis-solving, gratitude, and charismatic capture risk.
- [`docs/digital-mouse-interface.md`](docs/digital-mouse-interface.md) — conceptual essay for the Digital Mouse Interface.
- [`docs/visual_parables/digital_mouse_interface/README.md`](docs/visual_parables/digital_mouse_interface/README.md) — formal Digital Mouse Interface doctrine.
- [`docs/visual_parables/digital_mouse_interface/personal_anchor_node.md`](docs/visual_parables/digital_mouse_interface/personal_anchor_node.md) — Personal Anchor Node / local-first continuity extension.
- [`docs/forge/`](docs/forge/) — FORGE proof and boundary layer.
- [`docs/forge/SYMBOLIC_INTERFACE_READING_MAP.md`](docs/forge/SYMBOLIC_INTERFACE_READING_MAP.md) — boundary map for reading mythology-charged symbolic material without literalization or amputation.
- [`docs/forge/OMNIA_FACTORY_INTEGRATION_MAP.md`](docs/forge/OMNIA_FACTORY_INTEGRATION_MAP.md) — bridge map linking OMNIA, GNOSIS, Baal-Code, substrate theory, and the Factory Trilogy as a bounded symbolic/structural corpus.
- [`automation/`](automation/) — operator pipeline and automation cases.
- [`workflows/`](workflows/) — multi-model and repo workflow patterns.
- [`research/archive/classics/manifest.yaml`](research/archive/classics/manifest.yaml) — classic examples archive; pattern library only, not evidence.

---

## Future Roadmap (TODOs)

### TODO: Personal Fork + Pages + Local Bridge

**Goal:** Allow users to fork ConsMAP, publish their own GitHub Pages version, and maintain a personal research pipeline.

**Phases:**
1. **Fork + GitHub Pages guide:** Explain how to fork the repo, enable GitHub Pages, use the static Claim Analyzer in-browser, and export `claim_card.yaml`.
2. **Personal research workflow:** User stores their own claim cards in their fork and edits cards through GitHub web UI or local git. No private/sensitive data in public forks by default.
3. **Local bridge prototype:** Optional local companion app where the browser talks only to `localhost` (allowlisted commands: analyze claim, validate claim schema, export report). No arbitrary shell execution.
4. **Advanced mode:** Optional SSH/VPS/Raspberry Pi setup with strong warnings (disabled by default).

---

## License

CC BY-SA 4.0 — See [LICENSE](LICENSE)