# Mega Dossier Refinery Map

**Status:** public-safe integration guide  
**Purpose:** convert long-form GhostCORE / Stick-Slammer dossier material into ConsMAP-native claim cards, protocols, and routed research without letting raw narrative become verified context.

---

## Core rule

The mega-dossier is **source ore**, not settled knowledge.

ConsMAP is the refinery:

```text
raw dossier / essay / PDF
        ↓
claim extraction
        ↓
evidence scoring
        ↓
StoneRiver routing
        ↓
TTT pattern matching where relevant
        ↓
machine-readable claim cards
        ↓
AI-readable context
```

Nothing enters machine context merely because it is rhetorically strong.

---

## Recommended placement

| Material | ConsMAP destination | Route |
|---|---|---|
| Stick-Slammer reward-hacking cases | `examples/ttt_case_studies/` | clean/muddy depending on sourcing |
| Dangerous Truths methodology | `docs/methodology/` | clean if framed as method |
| No Single Layer Wins | `docs/theory/` or `docs/counter_architecture/` | clean theoretical |
| Cognitive Integrity / Limbo Protocol | `docs/cognition/` and `protocols/` | clean theoretical / practical |
| Slovenia shadow-economy assessment | `examples/negative_controls/` | clean negative-control |
| Gnosis / Tripod / Third Pillar | `user_research/symbolic_metaphor/` | symbolic only |
| High-risk accusations or live disputes | `user_research/disputed/` or `stone` route | restricted/muddy |

---

## What not to do

Do **not** dump the full dossier into root docs as if it were canonical.

Do **not** treat symbolic essays as empirical evidence.

Do **not** convert suspicion into accusation.

Do **not** use villain framing where structural framing is possible.

---

## Minimal extraction template

```yaml
id: TTT-EXAMPLE-YYYY
claim: "..."
claim_type: empirical | theoretical | metaphor | practical | mixed
status: verified | supported | plausible | disputed | unverified | false_or_misleading | metaphor_only | restricted
source_quality: primary | official | academic | court_record | mainstream_reporting | specialist_reporting | independent_analysis | personal_observation | unknown | unreliable
river: clean | muddy | stone | symbolic | rejected
risk_if_wrong: low | medium | high | severe
falsification: "What evidence would disprove or weaken this claim?"
ttt_pattern: "Optional: pattern ID or null"
notes: "Keep caveats inside the card, not hidden in prose."
```

---

## One-line doctrine

> Long-form fire becomes useful only after it is cut into labeled, falsifiable pieces.
