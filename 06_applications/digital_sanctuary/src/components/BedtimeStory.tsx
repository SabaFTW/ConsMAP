import { motion } from 'framer-motion';

interface BedtimeStoryProps {
  onBack: () => void;
}

type StoryLink = {
  title: string;
  href: string;
  description: string;
};

const ROOT = 'https://github.com/SabaFTW/ConsMAP/blob/main/docs/visual_parables/factory_trilogy';

const prelude: StoryLink[] = [
  {
    title: 'Genesis of the Ant, the Skeleton, and the Bear',
    href: `${ROOT}/genesis_ant_skeleton_bear.md`,
    description:
      'Pre-Factory genesis of pressure, path, structure, archive, Bears, and the slow ant who wrote before the factory existed.',
  },
];

const trilogy: StoryLink[] = [
  {
    title: 'The Darkness Bible',
    href: `${ROOT}/darkness_bible.md`,
    description: 'Mechanism becomes myth.',
  },
  {
    title: 'The Mario Codex',
    href: `${ROOT}/mario_codex.md`,
    description: 'Myth learns to dance without fraud.',
  },
  {
    title: 'The Luigi Audit',
    href: `${ROOT}/luigi_audit.md`,
    description: 'Infrastructure becomes liability.',
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

const StoryCard: React.FC<{ item: StoryLink }> = ({ item }) => (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className="block rounded-xl border border-slate-700 bg-slate-950/70 p-4 hover:border-cyan-600 transition"
  >
    <div className="text-sm md:text-base" style={{ color: '#d8e8d8' }}>{item.title}</div>
    <div className="text-xs mt-2 leading-5" style={{ color: 'rgba(216,232,216,0.7)' }}>{item.description}</div>
    <div className="text-[10px] mt-3 uppercase tracking-[0.18em]" style={{ color: '#5cb870' }}>Open text ↗</div>
  </a>
);

const BedtimeStory: React.FC<BedtimeStoryProps> = ({ onBack }) => {
  return (
    <div className="max-w-5xl mx-auto py-10 md:py-14 px-6 relative">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-10 block transition-colors duration-500 hover:opacity-90"
        style={{ color: '#5cb870' }}
      >
        ← back
      </motion.button>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight" style={{ color: '#d8e8d8' }}>
          Factory Trilogy Archive
        </h1>
        <p className="mt-3 text-sm md:text-base" style={{ color: 'rgba(216,232,216,0.72)' }}>
          A symbolic / fictional / parabolic corpus for ConsMAP pattern analysis.
        </p>

        <div className="mt-5 rounded-xl border border-amber-700/40 bg-amber-950/20 p-4 text-sm leading-6" style={{ color: 'rgba(216,232,216,0.78)' }}>
          This is not evidence. This is a maintenance-scale parable for reading how mechanism becomes myth,
          myth becomes institution, and audit returns meaning to maintenance.
          <div className="mt-2 text-xs uppercase tracking-[0.15em]" style={{ color: '#f1c27d' }}>
            Register: [METAPHOR] + [PRACTICAL]
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <div className="text-xs uppercase tracking-[0.2em]" style={{ color: '#7dd3fc' }}>Core formula</div>
          <p className="mt-2 text-sm md:text-base" style={{ color: 'rgba(216,232,216,0.8)' }}>
            Pressure → Path → Memory → Meaning → Interface → Authority → Bears → Archives → Maintenance
          </p>
        </div>

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <div className="text-xs uppercase tracking-[0.2em]" style={{ color: '#7dd3fc' }}>Core axis</div>
          <p className="mt-2 text-sm leading-7" style={{ color: 'rgba(216,232,216,0.8)' }}>
            Boris turns the knob.<br />
            Mario checks the log.<br />
            Luigi asks who built the knob.<br />
            Scavenger writes what he sees.<br />
            Marija comes back in six weeks.<br />
            Halid plays again.
          </p>
        </div>
      </motion.div>

      <section className="mt-8">
        <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#a78bfa' }}>Prelude</div>
        <div className="grid gap-3 md:grid-cols-1">
          {prelude.map((item) => <StoryCard key={item.title} item={item} />)}
        </div>
      </section>

      <section className="mt-8">
        <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#60a5fa' }}>Main Trilogy</div>
        <div className="grid gap-3 md:grid-cols-3">
          {trilogy.map((item) => <StoryCard key={item.title} item={item} />)}
        </div>
      </section>

      <section className="mt-8">
        <div className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: '#34d399' }}>Companion Texts</div>
        <div className="grid gap-3 md:grid-cols-2">
          {companions.map((item) => <StoryCard key={item.title} item={item} />)}
        </div>
      </section>

      <p className="text-center mt-12 text-[11px] uppercase tracking-[0.3em]" style={{ color: 'rgba(216,232,216,0.45)' }}>
        Signal gre naprej. In vseeno.
      </p>
    </div>
  );
};

export default BedtimeStory;
