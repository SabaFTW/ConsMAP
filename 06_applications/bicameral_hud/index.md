# Dvojni Pogled / Bicameral HUD

**One chat, two readings: machine trace and human meaning.**

---

## What this is

A Bicameral HUD is an interface pattern — not a local model, not Ollama, not two separate AIs running on your computer.

It is a way of organising what an AI tool shows you, so you can see both:

- **What actually happened** (the machine trace)
- **What it means for you** (the human reading)

at the same time, without needing to be a developer to read either.

---

## The three lanes

### Technical lane
Raw commands, file paths, logs, diffs, exit codes, service status.
This lane shows exactly what the system did. No interpretation. No editorial.

### Human lane
What it means. Whether it matters. What to do next. What not to touch.
This lane translates the technical lane into plain language.

### Gatekeeper lane
A simple traffic light:

| Signal | Meaning |
|---|---|
| 🟢 GREEN | Safe to proceed. |
| 🟡 YELLOW | Check before continuing. |
| 🔴 RED | Stop. Read the human lane before touching anything. |

---

## What this is not

- Not a second AI running locally
- Not a plugin you need to install first
- Not Ollama, not a local LLM stack
- Not a new project that replaces everything else
- Not magic

---

## How it works in practice

You have one AI chat open.

The HUD pattern means: the AI structures its responses into two visible sections — one for what the machine did, one for what that means — instead of mixing everything into one wall of text.

A memory partition and event ledger on the session side keeps the two lanes from bleeding into each other.

That is the whole idea.

---

## Status

**Conceptual / interface pattern.** Not yet implemented as a standalone tool.

If you want to experiment with it now: open any AI chat and ask it to respond using two labeled sections — "Technical" and "Human" — for any task involving commands or system output. The pattern works immediately.

---

*ConsMAP · 06_applications · Bicameral HUD concept · 2026*
