import { motion } from 'framer-motion';

interface BedtimeStoryProps {
  onBack: () => void;
}

type StoryLink = {
  title: string;
  href: string;
  description: string;
  tag?: string;
};

const ROOT = 'https://github.com/SabaFTW/ConsMAP/blob/main/docs/visual_parables/factory_trilogy';

const prelude: StoryLink[] = [
  {
    title: 'Genesis of the Ant, the Skeleton, and the Bear',
    href: `${ROOT}/genesis_ant_skeleton_bear.md`,
    description:
      'Pre-Factory genesis of pressure, path, structure, archive, Bears, and the slow ant who wrote before the factory existed.',
    tag: 'Prelude',
  },
];

const trilogy: StoryLink[] = [
  {
    title: 'The Darkness Bible',
    href: `${ROOT}/darkness_bible.md`,
    description: 'Mechanism becomes myth.',
    tag: 'Part I',
  },
  {
    title: 'The Mario Codex',
    href: `${ROOT}/mario_codex.md`,
    description: 'Myth learns to dance without fraud.',
    tag: 'Part II',
  },
  {
    title: 'The Luigi Audit',
    href: `${ROOT}/luigi_audit.md`,
    description: 'Infrastructure becomes liability.',
    tag: 'Part III',
  },
];

const companions: StoryLink[] = [
  {
    title: 'Trilogy Index',
    href: `${ROOT}/trilogy_index.md`,
    description: 'Reading map and through-line.',
  },
  {
    title: 'Factory Psalter',
    href: `${ROOT}/factory_psalter.md`,
    description: 'Reminder psalms from the covenants.',
  },
  {
    title: 'Gospel of Two Questions',
    href: `${ROOT}/gospel_of_two_questions.md`,
    description: 'Batman I / Spider I pre-fall doubt and the mythological apple.',
  },
  {
    title: 'Gospel According to the Maintenance Mouse',
    href: `${ROOT}/gospel_according_to_maintenance_mouse.md`,
    description: 'Mildly heretical maintenance-mouse account.',
  },
  {
    title: 'Epilogue According to Halid',
    href: `${ROOT}/epilogue_halid.md`,
    description: 'Song before doctrine.',
  },
];

const boundaryChips = [
  { label: 'METAPHOR',     cls: 'border-purple-600/40 bg-purple-900/20 text-purple-300' },
  { label: 'PRACTICAL',    cls: 'border-emerald-600/40 bg-emerald-900/20 text-emerald-300' },
  { label: 'NOT EVIDENCE', cls: 'border-amber-600/40 bg-amber-900/20 text-amber-300' },
  { label: 'CLAIM HYGIENE',cls: 'border-slate-600/40 bg-slate-800/30 text-slate-300' },
];

const SectionDivider: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="h-px flex-1" style={{ background: 'rgba(100,116,139,0.25)' }} />
    <div
      className="text-[10px] font-mono uppercase tracking-[0.26em]"
      style={{ color }}
    >
      {label}
    </div>
    <div className="h-px flex-1" style={{ background: 'rgba(100,116,139,0.25)' }} />
  </div>
);

const StoryCard: React.FC<{ item: StoryLink }> = ({ item }) => (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group block rounded-2xl border bg-slate-950/60 p-5 transition-all duration-200"
    style={{
      borderColor: 'rgba(71,85,105,0.5)',
      boxShadow: '0 1px 20px rgba(0,0,0,0.35)',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.35)';
      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 28px rgba(34,211,238,0.08)';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(71,85,105,0.5)';
      (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 20px rgba(0,0,0,0.35)';
    }}
  >
    {item.tag && (
      <div
        className="text-[9px] font-mono uppercase tracking-[0.24em] mb-2"
        style={{ color: 'rgba(92,184,112,0.65)' }}
      >
        {item.tag}
      </div>
    )}
    <div className="text-sm font-medium leading-5" style={{ color: '#d8e8d8' }}>
      {item.title}
    </div>
    <div className="text-xs mt-2 leading-[1.65]" style={{ color: 'rgba(216,232,216,0.58)' }}>
      {item.description}
    </div>
    <div
      className="mt-4 flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.18em] transition-colors duration-200"
      style={{ color: '#5cb870' }}
    >
      Read in GitHub <span className="text-[11px]">↗</span>
    </div>
  </a>
);

const BedtimeStory: React.FC<BedtimeStoryProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto py-10 md:py-14 px-5">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8 block hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#5cb870' }}
      >
        ← back
      </motion.button>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        {/* Eyebrow */}
        <div
          className="text-[10px] font-mono uppercase tracking-[0.28em] mb-3"
          style={{ color: 'rgba(92,184,112,0.55)' }}
        >
          ConsMAP / Story Archive
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-light tracking-tight" style={{ color: '#d8e8d8' }}>
          Factory Trilogy Archive
        </h1>
        <p className="mt-2 text-sm leading-6" style={{ color: 'rgba(216,232,216,0.62)' }}>
          A symbolic / fictional / parabolic corpus for reading mechanism, myth, audit, and maintenance.
        </p>

        {/* Boundary chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {boundaryChips.map(({ label, cls }) => (
            <span
              key={label}
              className={`text-[9px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${cls}`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Formula + Axis */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div
            className="rounded-2xl border px-4 py-4"
            style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.5)' }}
          >
            <div
              className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2"
              style={{ color: '#7dd3fc' }}
            >
              Core formula
            </div>
            <p className="text-xs leading-[1.8]" style={{ color: 'rgba(216,232,216,0.75)' }}>
              Pressure → Path → Memory → Meaning → Interface → Authority → Bears → Archives → Maintenance
            </p>
          </div>
          <div
            className="rounded-2xl border px-4 py-4"
            style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.5)' }}
          >
            <div
              className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2"
              style={{ color: '#7dd3fc' }}
            >
              Core axis
            </div>
            <p className="text-xs leading-[1.8]" style={{ color: 'rgba(216,232,216,0.75)' }}>
              Boris turns the knob.<br />
              Mario checks the log.<br />
              Luigi asks who built the knob.<br />
              Scavenger writes what he sees.<br />
              Marija comes back in six weeks.<br />
              Halid plays again.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Prelude */}
      <section className="mt-10">
        <SectionDivider label="Prelude" color="#a78bfa" />
        <div className="grid gap-3">
          {prelude.map((item) => <StoryCard key={item.title} item={item} />)}
        </div>
      </section>

      {/* Main Trilogy */}
      <section className="mt-8">
        <SectionDivider label="Main Trilogy" color="#60a5fa" />
        <div className="grid gap-3 sm:grid-cols-3">
          {trilogy.map((item) => <StoryCard key={item.title} item={item} />)}
        </div>
      </section>

      {/* Companion Texts */}
      <section className="mt-8">
        <SectionDivider label="Companion Texts" color="#34d399" />
        <div className="grid gap-3 sm:grid-cols-2">
          {companions.map((item) => <StoryCard key={item.title} item={item} />)}
        </div>
      </section>

      <p
        className="text-center mt-14 text-[10px] font-mono uppercase tracking-[0.34em]"
        style={{ color: 'rgba(216,232,216,0.32)' }}
      >
        Signal gre naprej. In vseeno.
      </p>
    </div>
  );
};

export default BedtimeStory;
