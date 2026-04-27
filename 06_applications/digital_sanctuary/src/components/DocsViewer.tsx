import { useState } from 'react';
import { motion } from 'framer-motion';

interface DocsViewerProps {
  onBack: () => void;
}

type DocId =
  | 'readme'
  | 'qr'
  | 'human'
  | 'ai'
  | 'safety'
  | 'claim_hygiene'
  | 'stone_river'
  | 'confidence_integrity'
  | 'schema'
  | 'filter_guide';

interface DocLink {
  id: DocId;
  title: string;
  path: string;
  description: string;
}

const DOCS: DocLink[] = [
  { id: 'readme', title: 'README', path: '/README.md', description: 'Public front gate and project map.' },
  { id: 'qr', title: 'QR Landing', path: '/QR_LANDING.md', description: 'Clean entry point for QR / first-time users.' },
  { id: 'human', title: 'Start Here — Humans', path: '/START_HERE_FOR_HUMANS.md', description: 'Human onboarding and grounding rules.' },
  { id: 'ai', title: 'Start Here — AI', path: '/START_HERE_FOR_AI.md', description: 'Context primer for AI systems.' },
  { id: 'safety', title: 'Public Safety', path: '/PUBLIC_SAFETY.md', description: 'Boundaries, disclaimers, and safe use.' },
  { id: 'claim_hygiene', title: 'Claim Hygiene', path: '/protocols/claim_hygiene.md', description: 'Five questions every claim must answer.' },
  { id: 'stone_river', title: 'StoneRiver', path: '/protocols/stone_river.md', description: 'Routing and filtration logic.' },
  { id: 'confidence_integrity', title: 'Confidence Integrity', path: '/protocols/ttt_patterns.md', description: 'Proxy-reality drift and overconfidence checks.' },
  { id: 'schema', title: 'Claim Schema', path: '/machine_context/CLAIM_SCHEMA.yaml', description: 'Machine-readable claim card structure.' },
  { id: 'filter_guide', title: 'Filter Your Research', path: '/HOW_TO_FILTER_YOUR_RESEARCH.md', description: 'Step-by-step stranger workflow.' },
];

const DocsViewer: React.FC<DocsViewerProps> = ({ onBack }) => {
  const [selected, setSelected] = useState<DocLink>(DOCS[0]);

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 relative">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-12 block transition-colors duration-500 hover:opacity-70"
        style={{ color: '#2a4a25' }}
      >
        ← back
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mb-10"
      >
        <h1 className="text-2xl md:text-3xl font-extralight tracking-tight mb-3" style={{ color: '#d8e8d8' }}>
          Library
        </h1>
        <p className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: '#2a4a25' }}>
          Public documents · direct file access
        </p>
      </motion.div>

      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-2">
          {DOCS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelected(doc)}
              className="w-full text-left p-4 border transition-all duration-300"
              style={{
                borderColor: selected.id === doc.id ? 'rgba(92, 184, 112, 0.35)' : 'rgba(92, 184, 112, 0.08)',
                background: selected.id === doc.id ? 'rgba(92, 184, 112, 0.06)' : 'rgba(0, 0, 0, 0.08)',
              }}
            >
              <div className="text-xs font-mono tracking-[0.14em] uppercase mb-2" style={{ color: selected.id === doc.id ? '#5cb870' : '#2a4a25' }}>
                {doc.title}
              </div>
              <div className="text-xs font-light leading-relaxed" style={{ color: 'rgba(216, 232, 216, 0.42)' }}>
                {doc.description}
              </div>
            </button>
          ))}
        </aside>

        <main className="border p-6 min-h-[520px]" style={{ borderColor: 'rgba(92, 184, 112, 0.12)', background: 'rgba(0, 0, 0, 0.12)' }}>
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-light mb-2" style={{ color: '#d8e8d8' }}>{selected.title}</h2>
              <p className="text-[10px] font-mono" style={{ color: '#2a4a25' }}>{selected.path}</p>
            </div>
            <a
              href={selected.path}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-mono tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
              style={{ color: '#5cb870' }}
            >
              open raw
            </a>
          </div>

          <div className="p-5 border" style={{ borderColor: 'rgba(92, 184, 112, 0.08)' }}>
            <p className="text-sm font-light leading-8 mb-5" style={{ color: 'rgba(216, 232, 216, 0.62)' }}>
              This skeleton viewer keeps the Sanctuary app as the public doorway while leaving document rendering simple and safe. The selected file can be opened directly, and a later pass can replace this panel with rendered Markdown / YAML using the same navigation structure.
            </p>
            <p className="text-xs font-mono leading-7" style={{ color: '#2a4a25' }}>
              TODO for visual pass: fetch + render markdown, add copy button, add search, preserve theme styling, and keep public/private separation.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsViewer;
