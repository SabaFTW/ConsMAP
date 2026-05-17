import { useState } from 'react';
import { motion } from 'framer-motion';
import MarkdownReader from './MarkdownReader';
import { storyImageMap, archiveLandingImage } from '../data/factoryVisuals';

interface BedtimeStoryProps {
  onBack: () => void;
}

type StoryLink = {
  title: string;
  path: string;
  githubHref: string;
  description: string;
  tag?: string;
};

const REPO_PATH = '/docs/visual_parables/factory_trilogy';
const GITHUB_ROOT = 'https://github.com/SabaFTW/ConsMAP/blob/main/docs/visual_parables/factory_trilogy';

const prelude: StoryLink[] = [
  {
    title: 'Genesis of the Ant, the Skeleton, and the Bear',
    path: `${REPO_PATH}/genesis_ant_skeleton_bear.md`,
    githubHref: `${GITHUB_ROOT}/genesis_ant_skeleton_bear.md`,
    description: 'Pre-Factory genesis of pressure, path, structure, archive, Bears, and the slow ant who wrote before the factory existed.',
    tag: 'Prelude',
  },
];

const trilogy: StoryLink[] = [
  {
    title: 'The Darkness Bible',
    path: `${REPO_PATH}/darkness_bible.md`,
    githubHref: `${GITHUB_ROOT}/darkness_bible.md`,
    description: 'Mechanism becomes myth.',
    tag: 'Part I',
  },
  {
    title: 'The Mario Codex',
    path: `${REPO_PATH}/mario_codex.md`,
    githubHref: `${GITHUB_ROOT}/mario_codex.md`,
    description: 'Myth learns to dance without fraud.',
    tag: 'Part II',
  },
  {
    title: 'The Luigi Audit',
    path: `${REPO_PATH}/luigi_audit.md`,
    githubHref: `${GITHUB_ROOT}/luigi_audit.md`,
    description: 'Infrastructure becomes liability.',
    tag: 'Part III',
  },
];

const companions: StoryLink[] = [
  {
    title: 'Trilogy Index',
    path: `${REPO_PATH}/trilogy_index.md`,
    githubHref: `${GITHUB_ROOT}/trilogy_index.md`,
    description: 'Reading map and through-line.',
  },
  {
    title: 'Factory Psalter',
    path: `${REPO_PATH}/factory_psalter.md`,
    githubHref: `${GITHUB_ROOT}/factory_psalter.md`,
    description: 'Reminder psalms from the covenants.',
  },
  {
    title: 'Gospel of Two Questions',
    path: `${REPO_PATH}/gospel_of_two_questions.md`,
    githubHref: `${GITHUB_ROOT}/gospel_of_two_questions.md`,
    description: 'Batman I / Spider I pre-fall doubt and the mythological apple.',
  },
  {
    title: 'Gospel According to the Maintenance Mouse',
    path: `${REPO_PATH}/gospel_according_to_maintenance_mouse.md`,
    githubHref: `${GITHUB_ROOT}/gospel_according_to_maintenance_mouse.md`,
    description: 'Mildly heretical maintenance-mouse account.',
  },
  {
    title: 'Epilogue According to Halid',
    path: `${REPO_PATH}/epilogue_halid.md`,
    githubHref: `${GITHUB_ROOT}/epilogue_halid.md`,
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
    <div className="text-[10px] font-mono uppercase tracking-[0.26em]" style={{ color }}>
      {label}
    </div>
    <div className="h-px flex-1" style={{ background: 'rgba(100,116,139,0.25)' }} />
  </div>
);

const StoryCard: React.FC<{ item: StoryLink; onOpen: (item: StoryLink) => void }> = ({ item, onOpen }) => {
  const visual = storyImageMap[item.path];

  return (
    <button
      onClick={() => onOpen(item)}
      className="group w-full text-left rounded-2xl border bg-slate-950/60 overflow-hidden transition-all duration-200"
      style={{ borderColor: 'rgba(71,85,105,0.5)', boxShadow: '0 1px 20px rgba(0,0,0,0.35)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.35)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 28px rgba(34,211,238,0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(71,85,105,0.5)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 20px rgba(0,0,0,0.35)';
      }}
    >
      {/* Thumbnail */}
      {visual && (
        <div className="relative w-full overflow-hidden" style={{ height: '120px' }}>
          <img
            src={visual.src}
            alt={visual.alt}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.7) saturate(0.85) contrast(1.05)' }}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(8,12,8,0.82) 100%)' }}
          />
          {item.tag && (
            <div
              className="absolute bottom-2 left-3 text-[9px] font-mono uppercase tracking-[0.22em]"
              style={{ color: 'rgba(92,184,112,0.9)' }}
            >
              {item.tag}
            </div>
          )}
        </div>
      )}

      {/* Card body */}
      <div className="p-4">
        {!visual && item.tag && (
          <div className="text-[9px] font-mono uppercase tracking-[0.24em] mb-2" style={{ color: 'rgba(92,184,112,0.65)' }}>
            {item.tag}
          </div>
        )}
        <div className="text-sm font-medium leading-5 mb-2" style={{ color: '#d8e8d8' }}>
          {item.title}
        </div>
        <div className="text-xs leading-[1.65] mb-3" style={{ color: 'rgba(216,232,216,0.55)' }}>
          {item.description}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: '#5cb870' }}>
            Read in archive →
          </div>
          <a
            href={item.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[9px] font-mono uppercase tracking-[0.14em] hover:opacity-100 transition-opacity"
            style={{ color: 'rgba(92,184,112,0.35)' }}
          >
            source ↗
          </a>
        </div>
      </div>
    </button>
  );
};

const BedtimeStory: React.FC<BedtimeStoryProps> = ({ onBack }) => {
  const [reader, setReader] = useState<StoryLink | null>(null);

  if (reader) {
    const visual = storyImageMap[reader.path];
    return (
      <MarkdownReader
        path={reader.path}
        title={reader.title}
        onBack={() => setReader(null)}
        githubUrl={reader.githubHref}
        imageSrc={visual?.src}
        imageAlt={visual?.alt}
      />
    );
  }

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

      {/* Archive landing header image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
        className="relative w-full rounded-2xl overflow-hidden mb-8 border"
        style={{ height: 'clamp(140px, 22vw, 220px)', borderColor: 'rgba(71,85,105,0.4)' }}
      >
        <img
          src={archiveLandingImage.src}
          alt={archiveLandingImage.alt}
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.72) saturate(0.8)' }}
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(8,12,8,0.88) 100%)' }}
        />
        <div className="absolute bottom-4 left-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-1" style={{ color: 'rgba(92,184,112,0.65)' }}>
            ConsMAP / Story Archive
          </div>
          <h1 className="text-2xl md:text-3xl font-light tracking-tight" style={{ color: '#d8e8d8' }}>
            Factory Trilogy Archive
          </h1>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
        <p className="text-sm leading-6 mb-4" style={{ color: 'rgba(216,232,216,0.62)' }}>
          A symbolic / fictional / parabolic corpus for reading mechanism, myth, audit, and maintenance.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {boundaryChips.map(({ label, cls }) => (
            <span key={label} className={`text-[9px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${cls}`}>
              {label}
            </span>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 mb-8">
          <div className="rounded-2xl border px-4 py-4" style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.5)' }}>
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2" style={{ color: '#7dd3fc' }}>
              Core formula
            </div>
            <p className="text-xs leading-[1.8]" style={{ color: 'rgba(216,232,216,0.75)' }}>
              Pressure → Path → Memory → Meaning → Interface → Authority → Bears → Archives → Maintenance
            </p>
          </div>
          <div className="rounded-2xl border px-4 py-4" style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.5)' }}>
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2" style={{ color: '#7dd3fc' }}>
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

      <section className="mt-2">
        <SectionDivider label="Prelude" color="#a78bfa" />
        <div className="grid gap-3">
          {prelude.map((item) => <StoryCard key={item.title} item={item} onOpen={setReader} />)}
        </div>
      </section>

      <section className="mt-8">
        <SectionDivider label="Main Trilogy" color="#60a5fa" />
        <div className="grid gap-3 sm:grid-cols-3">
          {trilogy.map((item) => <StoryCard key={item.title} item={item} onOpen={setReader} />)}
        </div>
      </section>

      <section className="mt-8">
        <SectionDivider label="Companion Texts" color="#34d399" />
        <div className="grid gap-3 sm:grid-cols-2">
          {companions.map((item) => <StoryCard key={item.title} item={item} onOpen={setReader} />)}
        </div>
      </section>

      <p className="text-center mt-14 text-[10px] font-mono uppercase tracking-[0.34em]" style={{ color: 'rgba(216,232,216,0.32)' }}>
        Signal gre naprej. In vseeno.
      </p>
    </div>
  );
};

export default BedtimeStory;
