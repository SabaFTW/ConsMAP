# OMNIA bridge releases

**Reserved landing zone. Empty in git by design.**

Each sealed `consmap_bridge_candidate` bundle lands here in its own directory,
named for the bridge-state hash it was sealed at:

```
data/omnia/releases/<bridge-state-hash>/
```

One directory per release. Never overwritten, never rewritten — so any claim
card published from a bundle can be traced back to the exact bytes that produced
it.

## Contents of this directory are not committed

`.gitignore` excludes everything here except this README. Bundles are received
artifacts, often large, and the full OMNIA archive remains the evidence vault
outside this repository. ConsMAP tracks the *manifest* of what was imported and
the *generated* public output — not the raw bundle.

Local imports may place verified bridge bundles here while you work. Those
directories stay ignored by git. If you find yourself wanting to commit a
bundle, the question to answer first is
which of the two it actually is: evidence (belongs in the vault) or public-safe
export (belongs in `docs/06_omnia/atlas/`, generated).

## Before anything lands here

The importer must verify the bridge manifest and every artifact hash, reject the
whole bundle on any mismatch, and preserve each artifact's register label. The
full contract is in
[`docs/06_omnia/OMNIA_MANUSCRIPT_MAP.md`](../../../docs/06_omnia/OMNIA_MANUSCRIPT_MAP.md) §4.

> Myth remembers. Evidence proves. Never the same uniform.
