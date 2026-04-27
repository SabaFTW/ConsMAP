# How to Filter Your Research with ConsMAP

This guide explains how to take raw notes, articles, or thoughts and safely convert them into usable, accountable knowledge using the ConsMAP framework. This is how you move from "I have a feeling about this" to "Here is a structured epistemic claim."

## Step 1 — Put raw material in `inbox_raw/`

Whenever you find an interesting article, take a screenshot, or write down a thought, save it in `user_research/inbox_raw/`. 

> **Critical Rule:** Do not treat anything in the inbox as verified knowledge. It is raw material waiting to be processed.

## Step 2 — Extract claims

Read your raw material and extract specific claims. Turn vague notes or paragraphs into clear, single-sentence statements.

*   **Bad:** "The system is corrupt and unsafe."
*   **Good:** "Company X’s safety audits did not publish evidence of corrective action after flagged incidents in 2024."

## Step 3 — Create a claim card

Use the interactive tool to generate a standardized claim card. This tool asks you the **Five Questions of Claim Hygiene**.

Run this command in your terminal:
```bash
python tools/create_claim_card.py
```
This will automatically save a new `.yaml` file in `user_research/claims_pending/`.

## Step 4 — Analyze and Route

Now that you have a structured card, let the system analyze it against the StoneRiver routing logic and TTT patterns:

```bash
python tools/analyze_claim.py user_research/claims_pending/your_claim_file.yaml
```

The analyzer will tell you which "River" the claim belongs in based on its evidence and risk:
*   **clean_river:** Well-sourced, verified, low-risk. Ready for public reasoning.
*   **muddy_river:** Incomplete, mixed evidence, plausible but unverified.
*   **stone_river:** High-risk, restricted, requires specialized handling.
*   **symbolic_river:** Metaphor, story, persona-play (not literal evidence).
*   **rejected:** False, unusable, or too contaminated.

*Move your `.yaml` file from `claims_pending/` into the appropriate river folder.*

## Step 5 — Use with AI

Once your claim is formatted and routed, you can safely use it in AI conversations. 

Copy these three things into your prompt:
1.  The rules: `machine_context/AI_SYSTEM_PROMPT.md`
2.  Your evidence: The contents of your claim card `.yaml`
3.  Your task/question

**Example prompt:**
> *"Analyze this claim using the ConsMAP framework. Do not treat it as verified unless the card supports that. Here is the claim data: [paste YAML]. What are the structural implications?"*
