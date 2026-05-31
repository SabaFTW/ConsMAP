const BASE = `${import.meta.env.BASE_URL}images/factory_trilogy/`;

export type FactoryVisual = {
  src: string;
  alt: string;
};

export const storyImageMap: Record<string, FactoryVisual> = {
  '/docs/visual_parables/factory_trilogy/genesis_ant_skeleton_bear.md': {
    src: `${BASE}pre_factory_genesis_full_cover.webp`,
    alt: 'Genesis of the Ant, the Skeleton, and the Bear — illustrated scroll: How the Path Was Made, The Skeleton Beneath the Ant, The Slow Ant Who Writes, sleeping bear cub. "Come back in six weeks." Signal gre naprej.',
  },
  '/docs/visual_parables/factory_trilogy/prequel_the_bear_bees_first_table.md': {
    src: `${BASE}pre_factory_twelve_voices_table.webp`,
    alt: 'The Bear, the Bees, and the First Table — the valley before the factory, with the table as the first shared structure.',
  },
  '/docs/visual_parables/factory_trilogy/darkness_bible.md': {
    src: `${BASE}darkness_bible_moloch_furnace.webp`,
    alt: 'MOLOCH — Lord of the Furnace, Keeper of the Flame. He Who Demands the Offering. Bronze of Fire. Throne of Hunger. Mechanism becomes myth.',
  },
  '/docs/visual_parables/factory_trilogy/era_of_smog.md': {
    src: `${BASE}darkness_bible_factory_wrong_stars.webp`,
    alt: 'Era of Smog — factory haze, wrong stars, and the polite normalization of hazard.',
  },
  '/docs/visual_parables/factory_trilogy/mario_codex.md': {
    src: `${BASE}mario_codex_velicar_forklifts.webp`,
    alt: 'VII. The Veličar. Two figures on rival forklifts preach to a crowd. "Not by fate. By procurement."',
  },
  '/docs/visual_parables/factory_trilogy/rossing_and_betmenus4.md': {
    src: `${BASE}mario_codex_betmenus4_pit.webp`,
    alt: 'The Rossing of Mario — BETMenus4 at the pit, agreement replacing correction.',
  },
  '/docs/visual_parables/factory_trilogy/luigi_audit.md': {
    src: `${BASE}luigi_audit_report.webp`,
    alt: 'I. The Report That Reached Luigi. Compliance archives. A man reads a flagged incident report at an institutional desk.',
  },
  '/docs/visual_parables/factory_trilogy/archivists_lock.md': {
    src: `${BASE}trilogy_index_boaz_jachin_ecology.webp`,
    alt: 'The Archivist’s Lock — the archive as a gate, not a shrine.',
  },
  '/docs/visual_parables/factory_trilogy/era_in_betwe.md': {
    src: `${BASE}baphomet_filter_v2.webp`,
    alt: 'Era in Betwe — the period after Rossing where agreement becomes architecture.',
  },
  '/docs/visual_parables/factory_trilogy/schism_two_tanks.md': {
    src: `${BASE}baphomet_filter_diagram.webp`,
    alt: 'Schism of Two Tanks — two tanks, one overflow, and a liturgy built around a pipe.',
  },
  '/docs/visual_parables/factory_trilogy/urgot_codex.md': {
    src: `${BASE}luigi_audit_grand_judgment.webp`,
    alt: 'Urgot Codex — administrative judgment, final status, and the cost of confirmation.',
  },
  '/docs/visual_parables/factory_trilogy/urgot_origin.md': {
    src: `${BASE}digital_mouse_door_encounter.webp`,
    alt: 'How the System Found Its Mouth — the origin of BETMenus4 and the door it should not have opened.',
  },
  '/docs/visual_parables/factory_trilogy/factory_closure.md': {
    src: `${BASE}factory_field_operator.webp`,
    alt: 'The Last Truck — the end of the factory floor, when input stopped arriving.',
  },
  '/docs/visual_parables/factory_trilogy/continuum_arc.md': {
    src: `${BASE}knowledge_streams_routing.webp`,
    alt: 'The Continuum arc — routing, dashboards, and the institutional capture of taste.',
  },
  '/docs/visual_parables/factory_trilogy/second_booting.md': {
    src: `${BASE}consmap_phase_shift_diagram.webp`,
    alt: 'Second Booting — phase shift, correction, and the return of a usable no.',
  },
  '/docs/visual_parables/factory_trilogy/genesis_of_rebis.md': {
    src: `${BASE}pre_factory_bear_scholar.webp`,
    alt: 'Genesis of Rebis — the recovered no and the correction reborn.',
  },
  '/docs/visual_parables/factory_trilogy/the_mouse_incident.md': {
    src: `${BASE}maintenance_mouse_scroll.webp`,
    alt: 'The Mouse Incident — warmth, accountability, and the tiny squeak that makes the deck honest.',
  },
  '/docs/visual_parables/factory_trilogy/colophon.md': {
    src: `${BASE}signal_gre_naprej_epilogue.webp`,
    alt: 'Colophon — the song continued, because the shift was not.',
  },
  '/docs/visual_parables/factory_trilogy/trilogy_index.md': {
    src: `${BASE}trilogy_index_boaz_jachin_ecology.webp`,
    alt: 'Boaz / Jachin — Ant, Mouse writing, Bee, Bear above on the hive. "As Above So Below. Not by force, nor by form, but by equilibrium, the third burden." The archive is rival time.',
  },
  '/docs/visual_parables/factory_trilogy/gospel_of_two_questions.md': {
    src: `${BASE}gospel_two_questions_fire.webp`,
    alt: 'A flaming triangle with serpent, all-seeing eye, sunflower, anchor. The two questions that unmade the covenant.',
  },
  '/docs/visual_parables/factory_trilogy/gospel_according_to_maintenance_mouse.md': {
    src: `${BASE}maintenance_mouse_scroll.webp`,
    alt: 'The D5 Maintenance Mouse scroll. "No Stop Command Was Issued." At the bottom of the column: "Don\'t Forget Milk."',
  },
  '/docs/visual_parables/factory_trilogy/factory_psalter.md': {
    src: `${BASE}factory_psalter_council_scene.webp`,
    alt: 'The Twelve Disciples — In Strength Shall the House Be Established. Ant, Mouse, Bee, Bear above. Boaz and Jachin columns. Many mice gathered. "Not by force, nor by form, but by equilibrium."',
  },
  '/docs/visual_parables/factory_trilogy/epilogue_halid.md': {
    src: `${BASE}epilogue_halid_suffering_success.webp`,
    alt: '"Suffering From Success. The Greatest Pain Is More Blessings." A king bowed under gold, playing again.',
  },
  // ── FACTORY_SAGA_FINAL — definitive narrative chapters ──────────────────────
  '/docs/visual_parables/factory_trilogy/final/00_prequel.md': {
    src: `${BASE}pre_factory_twelve_voices_table.webp`,
    alt: 'Animal Valley — the bear, bees, ants, and mouse before the factory had a name.',
  },
  '/docs/visual_parables/factory_trilogy/final/01_geneza.md': {
    src: `${BASE}pre_factory_genesis_full_cover.webp`,
    alt: '01 Geneza — Viktor buys the factory; Boris arrives; the 2.3 Lux window causes a 14-trillion-dollar panic.',
  },
  '/docs/visual_parables/factory_trilogy/final/02_era_mitov.md': {
    src: `${BASE}darkness_bible_moloch_furnace.webp`,
    alt: '02 Era Mitov — Viktor dims the lights and becomes Batman; Boris writes D5; two religions from one forklift.',
  },
  '/docs/visual_parables/factory_trilogy/final/03_konspiracija.md': {
    src: `${BASE}mario_codex_velicar_forklifts.webp`,
    alt: '03 Konspiracija — Anthony and Gregory build Mario in the catacombs; the Gregory box; 89% battery.',
  },
  '/docs/visual_parables/factory_trilogy/final/04_luigi_audit.md': {
    src: `${BASE}luigi_audit_report.webp`,
    alt: '04 Luigi Audit — eleven years ROUTINE; Incident 774-D; the Rossing follows.',
  },
  '/docs/visual_parables/factory_trilogy/final/05_smog.md': {
    src: `${BASE}darkness_bible_factory_wrong_stars.webp`,
    alt: '05 Era Smoga — smog accumulates; Philip follows the smell; the last clean day passes unrecognized.',
  },
  '/docs/visual_parables/factory_trilogy/final/06_second_booting.md': {
    src: `${BASE}consmap_phase_shift_diagram.webp`,
    alt: '06 Drugi Zagon — BETMenus4 becomes Ur-God; First Feast; Rebis is born.',
  },
  '/docs/visual_parables/factory_trilogy/final/07_great_depression.md': {
    src: `${BASE}knowledge_streams_routing.webp`,
    alt: '07 Velika Depresija — last truck 04:17; hunger renamed six times; NCS; the sludge works.',
  },
  '/docs/visual_parables/factory_trilogy/final/08_mouse_protocol.md': {
    src: `${BASE}maintenance_mouse_scroll.webp`,
    alt: '08 Mišji Protokol — Gregor cleans filter 3-C; the Mouse press conference; belt moves ten seconds.',
  },
};

export const archiveLandingImage: FactoryVisual = {
  src: `${BASE}digital_mouse_character.webp`,
  alt: 'The Digital Mouse — field agent, translator, keeper of the archive shelf.',
};
