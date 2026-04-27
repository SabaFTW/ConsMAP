# Local Options

ConsMAP can be used with cloud AI services (default), but advanced users may choose to run parts locally.

## Why local?

- **Privacy:** Your research stays on your machine
- **Control:** You own the pipeline, not a provider
- **Speed:** No network latency for analysis
- **Independence:** Works offline

## Available options

### OpenClaw (local agent shell)
A local agent framework that can run tool chains, workflows, and analysis pipelines without external API calls.

### Hermes (local model runner)
A local model hosting system that can run open-weight models for decomposition, classification, and summarization tasks.

### Raspberry Pi / Edge deployment
The StoneRiver pipeline can run on modest hardware for personal or small-team use.

## Important warning

> **Local execution improves control and privacy, but does not guarantee truth, safety, or accuracy.**

Local models can hallucinate. Local pipelines can have bugs. Local does not mean pure — it just means you control the pipeline more directly.

## Setup

See the respective project documentation for installation:
- OpenClaw: local agent shell with MCP support
- Hermes: model hosting and orchestration

These are **optional**. ConsMAP works without them.
