# ConsMAP Automation Layer

**Status:** optional local scaffold  
**Default:** OFF  
**Purpose:** Run the Operator Field Guide pipeline in a repeatable way without turning unverified model output into truth.

---

## What this is

The automation layer is a local helper for the multi-model pipeline:

```text
input
→ discovery
→ structure
→ fracture
→ synthesis
→ claim hygiene
→ archive draft
```

It does **not** make claims true.
It only makes the workflow repeatable.

---

## Safety model

Automation is dangerous when it moves faster than verification.

So this layer follows three rules:

1. **Manual by default** — nothing runs continuously.
2. **Dry-run first** — inspect planned steps before writing files.
3. **Claim hygiene required** — output is routed as draft material until reviewed.

---

## Directory layout

```text
automation/
├── README.md                 ← this file
├── config.example.yaml       ← copy to config.yaml locally
├── operator_pipeline.py      ← local runner scaffold
└── runs/                     ← generated locally, ignored later if desired
```

---

## Quick start

From the repository root:

```bash
cp automation/config.example.yaml automation/config.yaml
python automation/operator_pipeline.py --topic "AI safety rhetoric vs profit incentives" --dry-run
```

If the dry-run looks correct:

```bash
python automation/operator_pipeline.py --topic "AI safety rhetoric vs profit incentives" --run
```

---

## Turn automation ON

There is no daemon.
There is no background process.

To run it once:

```bash
python automation/operator_pipeline.py --topic "YOUR TOPIC" --run
```

To run from a text file:

```bash
python automation/operator_pipeline.py --input-file user_research/inbox_raw/topic.txt --run
```

---

## Turn automation OFF

Because there is no daemon, automation is off when the command exits.

If you later add cron/systemd/n8n, stop that external runner:

```bash
# systemd example, only if you created one later
systemctl --user stop consmap-operator.timer
systemctl --user disable consmap-operator.timer
```

For n8n:

```text
Open n8n → deactivate the ConsMAP workflow toggle.
```

---

## Configuration

Copy the example:

```bash
cp automation/config.example.yaml automation/config.yaml
```

Edit only local/private values in `config.yaml`.
Do not commit API keys, tokens, private prompts, or sensitive data.

---

## Manual provider mode

By default, this scaffold uses `manual` provider steps.

That means it writes prompt files into a run directory and asks the operator to paste them into the chosen model manually.

This is intentional.

Manual mode prevents accidental data leakage and keeps model-specific ToS choices under user control.

---

## API provider mode

API provider mode is reserved for later.

If added, each provider must explicitly define:

- data retention expectations
- whether content may be used for training
- allowed domains
- maximum risk level
- where logs are stored

No provider should be enabled silently.

---

## Output locations

A run produces a folder like:

```text
automation/runs/2026-05-04T23-30-00_ai-safety-rhetoric/
├── 00_intent.md
├── 01_discovery_prompt.md
├── 02_structure_prompt.md
├── 03_fracture_prompt.md
├── 04_synthesis_prompt.md
├── 05_claims_raw.md
└── README.md
```

The final reviewed material should then be moved manually into the correct ConsMAP river:

```text
user_research/evidence_verified/
user_research/disputed/
user_research/muddy_river/
user_research/symbolic_river/
```

---

## Minimal operating rule

> Automation may generate drafts. Only claim hygiene may promote knowledge.
