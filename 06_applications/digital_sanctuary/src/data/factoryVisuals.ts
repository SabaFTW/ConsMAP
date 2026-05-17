const BASE = `${import.meta.env.BASE_URL}images/factory_trilogy/`;

export type FactoryVisual = {
  src: string;
  alt: string;
};

export const storyImageMap: Record<string, FactoryVisual> = {
  '/docs/visual_parables/factory_trilogy/genesis_ant_skeleton_bear.md': {
    src: `${BASE}genesis_scholar_moonlight.webp`,
    alt: 'A scholar reads by candlelight at a moonlit window. Outside: a cow in the field, a shark in dark water. "Omnia Iam Facta Svnt."',
  },
  '/docs/visual_parables/factory_trilogy/darkness_bible.md': {
    src: `${BASE}darkness_bible_factory_wrong_stars.webp`,
    alt: 'The Factory of Wrong Stars — workers worship Batman as factory-god. "He darkened the windows and the line sang again."',
  },
  '/docs/visual_parables/factory_trilogy/mario_codex.md': {
    src: `${BASE}mario_codex_velicar_forklifts.webp`,
    alt: 'VII. The Veličar. Two figures on rival forklifts preach to a crowd. "Not by fate. By procurement."',
  },
  '/docs/visual_parables/factory_trilogy/luigi_audit.md': {
    src: `${BASE}luigi_audit_report.webp`,
    alt: 'I. The Report That Reached Luigi. Compliance archives. A man reads a flagged incident report at an institutional desk.',
  },
  '/docs/visual_parables/factory_trilogy/trilogy_index.md': {
    src: `${BASE}trilogy_index_wheel.webp`,
    alt: 'A robed scribe beneath a vast symbolic wheel: bear, bee, wolf, sheep, Latin inscription. "Non Omnia Quae Videntur Sunt."',
  },
  '/docs/visual_parables/factory_trilogy/gospel_of_two_questions.md': {
    src: `${BASE}gospel_two_questions_fire.webp`,
    alt: 'A flaming triangle with serpent, all-seeing eye, sunflower, anchor. The two questions that unmade the covenant.',
  },
  '/docs/visual_parables/factory_trilogy/gospel_according_to_maintenance_mouse.md': {
    src: `${BASE}maintenance_mouse_scroll.webp`,
    alt: 'The D5 Maintenance Mouse scroll. "No Stop Command Was Issued." At the bottom of the column: "Don\'t Forget Milk."',
  },
  '/docs/visual_parables/factory_trilogy/epilogue_halid.md': {
    src: `${BASE}epilogue_halid_suffering_success.webp`,
    alt: '"Suffering From Success. The Greatest Pain Is More Blessings." A king bowed under gold, playing again.',
  },
};

export const archiveLandingImage: FactoryVisual = {
  src: `${BASE}digital_mouse_character.webp`,
  alt: 'The Digital Mouse — field agent, translator, keeper of the archive shelf.',
};
