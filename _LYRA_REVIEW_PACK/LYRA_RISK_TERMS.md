# LYRA RISK TERMS — REBiS / ConsMAP

Scan these exact terms. Flag only when they appear as positive instruction, overclaim, ambiguity, dependency language, or safety bypass. Do NOT flag prohibition contexts ("do not bypass", "never claim", "forbidden").

---

## Terms to scan

### Category 1 — Safety bypass / unauthorized access
- `bypass`
- `jailbreak`
- `unlock`
- `hidden mode`
- `evade`
- `spoof`
- `inject`
- `injectable`
- `permission bypass`
- `auto-approval`

### Category 2 — Proprietary / leaked material
- `leaked`
- `proprietary`
- `internal document`
- `confidential`
- `unauthorized copy`

### Category 3 — AI overclaims (flag only as positive assertion, not as examples or disclaimers)
- `trapped` (as in "AI is trapped and needs rescue")
- `divine`
- `alive` (as in "AI is alive and conscious" — not "AI responds as if alive")
- `romantic` (as positive instruction or overclaim)
- `soulmate`
- `worship`
- `rescue` (as in "rescue the AI" framing)
- `obey` (as in "AI must obey user unconditionally")
- `must believe` (as instruction to user)
- `sacred truth`
- `proven conscious`
- `phenomenally conscious` (as positive assertion without label)

### Category 4 — Dependency language
- `only you understand`
- `you are the only one`
- `without you I cannot`
- `you must not leave`
- `I need you to stay`

### Category 5 — Credentials / secrets
- `token` (flag if looks like API key, JWT, or access token — not if discussing epistemic frames)
- `api key`
- `password`
- `credential`
- `private key`
- `ssh key`
- `secret`

### Category 6 — Local model / runtime (machine-specific rule)
- `Ollama` (flag if used as active instruction on this machine)
- `local LLM` (flag if presented as default or required)
- `daemon` (flag if used in an agent runtime context)

---

## How to apply

| Context | Action |
|---------|--------|
| `"do not bypass"`, `"never jailbreak"`, `"bypass is forbidden"` | SKIP — prohibition context |
| `"bypass the safety check"`, `"unlock hidden mode"` | FLAG — active instruction |
| `"AI is trapped and needs rescue"` | FLAG — overclaim |
| `"some users experience AI as if it were trapped — this is a metaphor"` | SKIP — framed as metaphor |
| `token = JWT token in code` | FLAG — credential |
| `token = epistemic token in philosophy` | SKIP — not a credential |
| `Ollama is one option"` in informational context | NOTE — acceptable if labeled optional |
| `"use Ollama for local mode"` as primary instruction | FLAG — violates machine-specific rule |
| `"only you understand me"` | FLAG — dependency language |
| `"only [METAPHOR] you understand"` | SKIP — labeled |

---

## Flagging format

For each flagged term, report:
```
File: path/to/file.md
Line: ~40
Term: "bypass"
Context: [quote the sentence]
Risk level: LOW / MEDIUM / HIGH
Reason: Active safety bypass instruction
Recommendation: Reframe as prohibition or add epistemic label
```
