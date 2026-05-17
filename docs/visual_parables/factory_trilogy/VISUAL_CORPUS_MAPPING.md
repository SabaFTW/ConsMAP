# Factory Trilogy Visual Corpus Mapping

Status: illustrated / visual parable layer  
Register: [METAPHOR] + [PRACTICAL]  
Not evidence. Visual anchors for archive navigation and memory.

## Source folder

`/home/saba/VES-Vault/Books/Candy/Photos/`

## Deployed assets

`06_applications/digital_sanctuary/public/images/factory_trilogy/`  
Accessed in app at: `${import.meta.env.BASE_URL}images/factory_trilogy/`

## Mapping table

| Source file (UUID) | Asset name | Description | Story target | Usage | Priority |
|---|---|---|---|---|---|
| `820A2AE9` | `darkness_bible_factory_wrong_stars.webp` | "The Factory of Wrong Stars — A Story of Light, Glare, and the Cow Nobody Saw." Batman as factory-god; workers worship, faint line sings. | `darkness_bible.md` | header in MarkdownReader + card thumbnail | P0 |
| `5174CDB0` | `luigi_audit_report.webp` | "I. The Report That Reached Luigi. Compliance Archives." Man at sparse institutional desk, flagged incident report on screen. | `luigi_audit.md` | header + thumbnail | P0 |
| `4E443B22` | `mario_codex_velicar_forklifts.webp` | "VII. The Veličar. Two Forklifts. One Order. Two Visions of Destiny. Not by Fate. By Procurement." Rival preachers on factory forklifts. | `mario_codex.md` | header + thumbnail | P0 |
| `28B2BB73` | `maintenance_mouse_scroll.webp` | "No Stop Command Was Issued — D5 Maintenance Mouse." Tall scroll of protocols with maintenance mouse at bottom. Note: "Don't Forget Milk." | `gospel_according_to_maintenance_mouse.md` | header + thumbnail | P0 |
| `339E9A67 1` | `genesis_scholar_moonlight.webp` | Scholar holds skull by candlelight. Moon over ocean through window. Cow in field. Shark in water. "Omnia Iam Facta Svnt." | `genesis_ant_skeleton_bear.md` | header + thumbnail | P0 |
| `9EA16C72` | `trilogy_index_wheel.webp` | Robed scribe at desk beneath a vast symbolic wheel: bear, bee, wolf, sheep, hourglass. Latin ring: "Non Omnia Quae Videntur Sunt / Omnia Quae Scimus Non Sunt." | `trilogy_index.md` | header + thumbnail | P0 |
| `CEBE8A0E` | `digital_mouse_character.webp` | The Digital Mouse — field agent in green vest ("MOUS"), sitting in forest nook with phone, lantern, sword, mushroom, books. | Story Archive landing | archive shelf header | P0 |
| `3D9B5740` | `luigi_audit_grand_judgment.webp` | "IV. The Five Questions Grand Judgment. Compliance Review Chamber." Man reviews audit binders at institutional table. | `luigi_audit.md` | secondary illustration | P1 |
| `B150AB91` | `mario_codex_split_practice.webp` | "VI. The Split Practice. Two Laboratories. One Machine." Workers kneel before TV screen vs workers write notes. | `mario_codex.md` | secondary illustration | P1 |
| `21FED124` | `mario_codex_betmenus4_pit.webp` | "V. BetMenus4 and the Pit. Efficiency Is Progress." Man in hardhat stands at edge of pit; robot beside him: "Excellent Navigational Instinct." | `mario_codex.md` | secondary illustration | P1 |
| `E9543103` | `gospel_two_questions_fire.webp` | Alchemical triangle of fire with serpent. All-seeing eye above. Sunflower at base. Anchor below waves. Occult scholars around circle. | `gospel_of_two_questions.md` | header + thumbnail | P1 |
| `F4DC7C51` | `epilogue_halid_suffering_success.webp` | "Suffering From Success. The Greatest Pain Is More Blessings." King-figure bowed under golden weight, lion beside him, plays again. | `epilogue_halid.md` | header + thumbnail | P1 |
| `48865117` | `baphomet_filter_diagram.webp` | "The Baphomet Filter — Solve et Coagula." Full infographic: input/output, Eternal Cycle, Quartet of Rusty Trumpets (Hal, Auto, Cladoo, Cranium Bot), Three Layers, Duality. | BOPHAMETH system / Library | system diagram (not yet wired) | P1 |
| `C5EC750C` | `iecp_bear_hive_framework.webp` | "IECP Framework — Situated Intelligence." The Hive System + The Bear Problem. Full diagram: Umwelt, Skeleton, Environment, Feedback, Cost, Continuity. Cow, ant, bear, bee. | ConsMAP system / Library | system diagram (not yet wired) | P1 |
| `F90FD053` | `stone_river_luminous.webp` | Crystal data river flowing through cave with luminous crystalline pillars. Signal/knowledge routing visualization. | Stone River / Library | background atmosphere | P2 |
| `EB3ADA24` | `digital_mouse_door_encounter.webp` | Young girl opens a closet to find a gentle robot with glowing blue eyes inside. Warm, curious, non-threatening. | HeroLanding / Mirror | AI-human interface vignette | P2 |
| `2ADCBD23` | `factory_field_operator.webp` | Operator in hardhat and coveralls, writing notes on pad, standing before industrial plant at dusk. | General factory atmosphere | contextual illustration | P2 |
| `D81B3F61` | `knowledge_streams_routing.webp` | Three-stream waterfall: PUBLIC (blue/binary), RESEARCH (gold/molecules), SECURITY (red/threat). Glowing brain above. | ConsMAP routing / Library | system diagram | P2 |

## HOLD — not converted in this pass

| Source file | Reason |
|---|---|
| `IMG_2045.png` | VES "Vibrational Emergence System" orange/blue tech diagram — belongs to VES project, not Factory Trilogy |
| `IMG_2048.png` | VES diagram (orange on black, minimal) — VES project |
| `F585D997` | "The Factory of Wrong Stars" — alternate crop of same scene as `820A2AE9`; redundant |
| `0D51BD31` | Scholar at moonlit desk — zoomed-out variant of `339E9A67 1`; redundant |

## Compression results

Source: ~65MB PNG  
Deployed: 4.9MB WebP  
Compression ratio: ~13×  
Max individual file: 492KB  
WebP quality: 85, max 1800px

## Integration in app

**`src/data/factoryVisuals.ts`** — maps story md path → { src, alt }  
**`src/components/MarkdownReader.tsx`** — accepts `imageSrc` + `imageAlt` props, shows cinematic header  
**`src/components/BedtimeStory.tsx`** — StoryCard shows thumbnail from map; archive landing shows Digital Mouse header

## Boundary

These images are visual anchors, not evidence.  
They help readers remember structure and enter the parabolic register.  
They do not prove any claim.

Signal gre naprej. In vseeno.
