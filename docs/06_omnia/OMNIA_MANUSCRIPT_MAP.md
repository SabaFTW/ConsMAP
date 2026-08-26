# OMNIA Manuscript Map

**Status:** structural map. Describes the hand-written manuscripts, the bridge
boundary, and the import contract.

**Import state:** one verified bridge import has been performed.
Bridge state `d3a0d23a9dff846c403c1523895bf1aeb56da4e042f76965eef0b5aa5ec9080a`,
from sealed OMNIA release `c52ec629b12660b5fb70c530e8810cc2349dc81d1d21d4d79c36f4bae55f2d84`.
It produced 17 public claim cards, 60 summarized symbolic records and 32 blocked
claim summaries in [`atlas/`](atlas/). Verification record:
[`reports/repository-audit/OMNIA_BRIDGE_IMPORT_VALIDATION.md`](../../reports/repository-audit/OMNIA_BRIDGE_IMPORT_VALIDATION.md).
The received bundle itself is not tracked.

> Myth remembers. Evidence proves. Never the same uniform.

That rule governs this map. Nothing below may be read as upgrading a document's
register by placing it next to another one. See [REGISTER_RULES.md](REGISTER_RULES.md)
for the register definitions and [README.md](README.md) for what this section is
and is not.

---

## 1. What is here now

Eleven manuscripts, all hand-maintained, all committed. Their registers are
declared inside each document — the grouping below is by *function*, not by
credibility, and grouping never confers load-bearing status.

### Protocol layer — how the section governs itself

| document | function |
|---|---|
| [README.md](README.md) | what OMNIA is, what it is not, the three layers (court / memory / operator) |
| [REGISTER_RULES.md](REGISTER_RULES.md) | the five registers 🟢🟡🟠🟣⚫ and which may carry factual load |
| [ANTI_ENTANGLEMENT_PROTOCOL.md](ANTI_ENTANGLEMENT_PROTOCOL.md) | keeping symbolic and evidentiary threads from fusing |
| [MODEL_ECOLOGY_PROTOCOL.md](MODEL_ECOLOGY_PROTOCOL.md) | operator-layer discipline: no single model becomes the house |

### Memory layer — symbolic compression

| document | function |
|---|---|
| [BAPHOMET_CHOICE.md](BAPHOMET_CHOICE.md) | the Baphomet Engine as a choice structure |
| [ENTANGLED_GRANDMA_SAGA.md](ENTANGLED_GRANDMA_SAGA.md) | the saga in its narrative register |
| [THE_NEPHILIM_PAPERS_outline.md](THE_NEPHILIM_PAPERS_outline.md) | outline of the long-form manuscript |
| [THE_SAUCY_BISCUIT.md](THE_SAUCY_BISCUIT.md) | satirical register |

### Failure-analysis layer — what broke and why

| document | function |
|---|---|
| [ADAPTIVE_KNIFE_FAILURE.md](ADAPTIVE_KNIFE_FAILURE.md) | failure analysis |
| [ENTANGLED_GRANDMA_FAILURE.md](ENTANGLED_GRANDMA_FAILURE.md) | the saga's failure mode, held separately from the saga itself |
| [COMMON_GROUNDS_GATEWAY.md](COMMON_GROUNDS_GATEWAY.md) | the gateway between registers |

Note that the Entangled Grandma appears twice, as saga and as failure analysis,
in two separate documents. That separation is deliberate and must survive any
future reorganisation: merging them would let the narrative borrow the analysis's
credibility.

---

## 2. What is not here, and stays not here

The full OMNIA archive lives outside this repository and remains **the evidence
vault**. ConsMAP is downstream of it, never a copy of it.

The following must never be committed to ConsMAP:

- the local OMNIA corpus in bulk;
- source PDFs or scans;
- anything in the quarantine register ⚫;
- absolute local filesystem paths;
- unredacted material naming private individuals;
- anything that has not passed the public-safety boundary.

ConsMAP receives only **public-safe, schema-valid, provenance-preserving
exports**. If an artifact cannot carry its provenance across the bridge, it does
not cross.

---

## 3. Reserved landing zones

These paths are reserved so every OMNIA bridge import has one deterministic
destination instead of being negotiated under time pressure. In git they may
start as empty landing zones; after a verified local bridge import,
`docs/06_omnia/atlas/` contains generated public-safe output.

```
data/omnia/releases/<bridge-state-hash>/    the sealed bundle, as received
docs/06_omnia/atlas/                        the generated public atlas
```

`<bridge-state-hash>` is the hash of the bridge state the bundle was sealed at.
One directory per release, never overwritten, so any published claim card can be
traced back to the exact bundle that produced it.

`docs/06_omnia/atlas/` is **generated output**. Hand-editing it is prohibited
the same way hand-editing `dist/` is — see [ARCHITECTURE.md](../../ARCHITECTURE.md)
§4. Regenerate it from a verified bridge bundle with:

```bash
python tools/import_omnia_bridge.py /path/to/consmap_bridge_candidate
```

---

## 4. The import contract

Nothing is imported until Codex produces a sealed `consmap_bridge_candidate`
bundle. The importer must, before generating any public claim card or
application page:

1. verify the bridge manifest;
2. verify the hash of **every** artifact against the manifest;
3. reject the whole bundle on any mismatch — no partial imports;
4. carry each artifact's register label (🟢🟡🟠🟣⚫) through unchanged;
5. refuse to emit a claim card for anything in 🟡 or 🟣 as though it carried
   factual load;
6. drop ⚫ entirely;
7. record the bundle hash, artifact count and rejections in the release
   directory.

An importer that cannot verify a hash must fail, not warn.

## 5. What this repository must not do

- **Do not invent bridge data.** An empty atlas is correct until a real bundle
  arrives; a plausible-looking placeholder is worse than nothing, because it
  will eventually be read as real.
- **Do not import during a cleanup pass.** Structure and content move
  separately, in separate pull requests, so that a bad import can be reverted
  without unpicking a reorganisation.

Both rules held. The repository-cleanup pass (PR #54, merged 2026-08-26)
reserved the paths and imported nothing; the import arrived separately on
`feat/omnia-consmap-bridge-local` with its own pull request.

Future imports follow the same shape: a branch of their own, a draft PR of their
own, and a verification record in `reports/repository-audit/`.
