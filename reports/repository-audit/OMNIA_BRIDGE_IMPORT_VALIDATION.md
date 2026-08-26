# OMNIA Bridge Import Validation

Branch: `feat/omnia-consmap-bridge-local`

Source bundle:
`<OMNIA>/06_ATLAS/consmap_bridge_candidate/`

Source sealed OMNIA release:
`c52ec629b12660b5fb70c530e8810cc2349dc81d1d21d4d79c36f4bae55f2d84`

Bridge state:
`d3a0d23a9dff846c403c1523895bf1aeb56da4e042f76965eef0b5aa5ec9080a`

Bridge manifest SHA-256:
`a05dff4d2276c4aa9dd5865ff3fd476099ecd9a4ce91b9c3ecb0d1dab3a42c12`

## Commands and exit codes

| command | working directory | exit |
|---|---|---:|
| `python3 tools/import_omnia_bridge.py <OMNIA>/06_ATLAS/consmap_bridge_candidate` | repo root | 0 |
| `python3 tools/import_omnia_bridge.py <OMNIA>/06_ATLAS/consmap_bridge_candidate` | repo root | 0 |
| `python3 -m compileall -q tools automation` | repo root | 0 |
| `npm run build` | `06_applications/digital_sanctuary` | 0 |
| local-path leakage scan over generated atlas, importer and this report | repo root | 1, no matches |

## Generated atlas

| output | count |
|---|---:|
| public ConsMAP claim cards | 17 |
| symbolic records summarized | 60 |
| blocked claim summaries | 32 |

## Safety notes

- The full OMNIA corpus was not imported.
- The ignored release cache under `data/omnia/releases/` stores only the public-safe bridge bundle.
- Generated atlas files use bridge state, artifact IDs and SHA-256 values, not absolute local paths.
- Blocked claims are represented as suppression metadata.
- Symbolic material stays routed as `symbolic_river` / `metaphor_only`.
- No GitHub push, deploy, publication, or ConsMAP production update was performed by this pass.
