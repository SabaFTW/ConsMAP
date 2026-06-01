import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

const mdComponents: Components = {
  h1: ({ children }) => <h1 className="text-xl font-light mt-6 mb-3 first:mt-0" style={{ color: '#d8e8d8' }}>{children}</h1>,
  h2: ({ children }) => <h2 className="text-lg font-light mt-5 mb-2" style={{ color: 'rgba(216,232,216,0.9)' }}>{children}</h2>,
  h3: ({ children }) => <h3 className="text-base font-medium mt-4 mb-2" style={{ color: 'rgba(216,232,216,0.82)' }}>{children}</h3>,
  h4: ({ children }) => <h4 className="text-sm font-medium mt-3 mb-1" style={{ color: 'rgba(216,232,216,0.75)' }}>{children}</h4>,
  p: ({ children }) => <p className="text-sm leading-[1.85] mb-3" style={{ color: 'rgba(216,232,216,0.75)' }}>{children}</p>,
  ul: ({ children }) => <ul className="mb-3 pl-5 space-y-1" style={{ listStyleType: 'disc' }}>{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 pl-5 space-y-1" style={{ listStyleType: 'decimal' }}>{children}</ol>,
  li: ({ children }) => <li className="text-sm leading-[1.7]" style={{ color: 'rgba(216,232,216,0.72)' }}>{children}</li>,
  blockquote: ({ children }) => <blockquote className="pl-4 my-4 italic" style={{ borderLeft: '2px solid rgba(92,184,112,0.35)', color: 'rgba(216,232,216,0.6)' }}>{children}</blockquote>,
  pre: ({ children }) => <pre className="rounded-xl px-4 py-3 mb-3 overflow-x-auto" style={{ background: 'rgba(15,20,15,0.8)', border: '1px solid rgba(71,85,105,0.35)' }}>{children}</pre>,
  code: ({ children, className }) => className
    ? <code className="text-xs font-mono" style={{ color: 'rgba(216,232,216,0.82)' }}>{children}</code>
    : <code className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ background: 'rgba(92,184,112,0.12)', color: '#5cb870' }}>{children}</code>,
  hr: () => <hr className="my-4" style={{ border: 'none', borderTop: '1px solid rgba(71,85,105,0.35)' }} />,
  strong: ({ children }) => <strong style={{ color: '#d8e8d8', fontWeight: 600 }}>{children}</strong>,
  em: ({ children }) => <em style={{ color: 'rgba(216,232,216,0.72)', fontStyle: 'italic' }}>{children}</em>,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#5cb870', textDecoration: 'underline', textDecorationColor: 'rgba(92,184,112,0.35)' }}>{children}</a>,
  table: ({ children }) => <div className="overflow-x-auto mb-3"><table className="text-sm w-full" style={{ borderCollapse: 'collapse' }}>{children}</table></div>,
  th: ({ children }) => <th className="text-left px-3 py-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: 'rgba(92,184,112,0.7)', borderBottom: '1px solid rgba(71,85,105,0.4)' }}>{children}</th>,
  td: ({ children }) => <td className="px-3 py-2 text-xs" style={{ color: 'rgba(216,232,216,0.7)', borderBottom: '1px solid rgba(71,85,105,0.2)' }}>{children}</td>,
};

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
  | 'filter_guide'
  | 'ai_bootstrap'
  | 'digital_mouse_interface'
  | 'symbolic_map'
  | 'forge_readme'
  | 'forge_proof_v01'
  | 'operator_field_guide'
  | 'classics_index'
  | 'anchor_drift'
  | 'shameful_spectacle';

interface DocLink {
  id: DocId;
  title: string;
  path: string;
  description: string;
  local?: boolean;
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
  { id: 'ai_bootstrap', title: 'AI Bootstrap', path: '/prompts/AI_BOOTSTRAP_PROMPT.md', description: 'Base instruction set for external AI systems.' },
  { id: 'digital_mouse_interface', title: 'Digital Mouse Interface', path: '/docs/digital-mouse-interface.md', description: 'Symbolic interface framing for human readability.' },
  { id: 'symbolic_map', title: 'Symbolic Interface Reading Map', path: '/docs/forge/SYMBOLIC_INTERFACE_READING_MAP.md', description: 'Map symbolic language to operational claim classes.' },
  { id: 'forge_readme', title: 'FORGE Layer 1 Draft', path: '/docs/forge/FORGE_LAYER_1_README_DRAFT.md', description: 'Proof-layer overview and operator usage.' },
  { id: 'forge_proof_v01', title: 'FORGE proof_v0_1 sample loop', path: '/docs/forge/proof_v0_1/sample_decision_loop.md', description: 'Example decision loop in proof workflow.' },
  { id: 'operator_field_guide', title: 'Operator Field Guide v2.3', path: '/protocols/operator_field_guide_v2_3.md', description: 'Practical operator discipline and boundaries.' },
  { id: 'classics_index', title: 'Classics Index', path: '/research/archive/classics/CLASSICS_INDEX.md', description: 'Pattern archive (reference, not evidence).' },
  { id: 'anchor_drift', title: 'Anchor Attribution Drift', path: '/docs/concepts/anchor_attribution_drift.md', description: 'Drift risks and boundary maintenance.' },
  { id: 'shameful_spectacle', title: 'Safety as Priesthood', path: '/docs/theory/shameful_spectacle.md', description: 'The privatization of dangerous symmetry — when safety becomes feudal capability management.', local: true },
];

const DocsViewer: React.FC<DocsViewerProps> = ({ onBack }) => {
  const [selected, setSelected] = useState<DocLink>(DOCS[0]);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const hash = window.location.hash || '';
    const match = hash.match(/doc=([^&]+)/);
    if (!match) return;

    const requestedPath = decodeURIComponent(match[1]);
    const target = DOCS.find((d) => d.path === requestedPath);
    if (target) {
      setSelected(target);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setCopied(false);
    const url = selected.local
      ? `${import.meta.env.BASE_URL}${selected.path.replace(/^\//, '')}`
      : `https://raw.githubusercontent.com/SabaFTW/ConsMAP/main${selected.path}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('File not found');
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setContent('Error loading file: ' + err.message);
        setLoading(false);
      });
  }, [selected.path, selected.local]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 md:py-14 px-5 relative">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8 block hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#5cb870' }}
      >
        ← back
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
        className="mb-8"
      >
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-3" style={{ color: 'rgba(92,184,112,0.55)' }}>
          ConsMAP / Library
        </div>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2" style={{ color: '#d8e8d8' }}>
          Library
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(216,232,216,0.72)' }}>
          Read the shelves inside the app. GitHub only keeps the receipts.
        </p>
        <p className="text-[10px] font-mono tracking-[0.22em] uppercase mt-2" style={{ color: 'rgba(92,184,112,0.42)' }}>
          Select a document on the left → it opens here.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-[260px_1fr] gap-5">
        {/* Sidebar */}
        <aside className="space-y-1.5">
          {DOCS.map((doc, idx) => (
            <div key={doc.id}>
              {doc.local && idx > 0 && (
                <div className="flex items-center gap-2 py-2 mb-0.5">
                  <div className="flex-1 h-px" style={{ background: 'rgba(167,139,250,0.18)' }} />
                  <span className="text-[8px] font-mono uppercase tracking-[0.28em] shrink-0" style={{ color: 'rgba(167,139,250,0.45)' }}>theory</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(167,139,250,0.18)' }} />
                </div>
              )}
              <button
                onClick={() => setSelected(doc)}
                className="w-full text-left rounded-xl border px-4 py-3 transition-all duration-200"
                style={{
                  borderColor: selected.id === doc.id
                    ? (doc.local ? 'rgba(167,139,250,0.4)' : 'rgba(92,184,112,0.4)')
                    : 'rgba(71,85,105,0.35)',
                  background: selected.id === doc.id
                    ? (doc.local ? 'rgba(167,139,250,0.06)' : 'rgba(92,184,112,0.06)')
                    : 'rgba(15,20,15,0.4)',
                }}
              >
                <div
                  className="text-[10px] font-mono tracking-[0.14em] uppercase mb-1"
                  style={{ color: selected.id === doc.id ? (doc.local ? '#a78bfa' : '#5cb870') : 'rgba(92,184,112,0.45)' }}
                >
                  {doc.title}
                </div>
                <div className="text-[11px] font-light leading-[1.5]" style={{ color: 'rgba(216,232,216,0.65)' }}>
                  {doc.description}
                </div>
              </button>
            </div>
          ))}
        </aside>

        {/* Main panel */}
        <main
          className="rounded-2xl border min-h-[520px] flex flex-col"
          style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.5)' }}
        >
          <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(71,85,105,0.3)' }}>
            <div>
              <h2 className="text-base font-light mb-1" style={{ color: '#d8e8d8' }}>{selected.title}</h2>
              <p className="text-xs mb-1" style={{ color: 'rgba(216,232,216,0.62)' }}>{selected.description}</p>
              <p className="text-[10px] font-mono" style={{ color: 'rgba(92,184,112,0.38)' }}>
                <span style={{ color: 'rgba(92,184,112,0.5)' }}>source: </span>{selected.path}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={copyToClipboard}
                disabled={loading}
                className="text-[9px] font-mono tracking-[0.18em] uppercase transition-opacity hover:opacity-100"
                style={{ color: copied ? '#5cb870' : 'rgba(92,184,112,0.5)', opacity: copied ? 1 : 0.7 }}
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
              <a
                href={`https://raw.githubusercontent.com/SabaFTW/ConsMAP/main${selected.path}`}
                target="_blank"
                rel="noreferrer"
                className="text-[9px] font-mono tracking-[0.18em] uppercase transition-opacity hover:opacity-100"
                style={{ color: 'rgba(92,184,112,0.5)' }}
              >
                Raw ↗
              </a>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 px-5 py-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a2e1a transparent' }}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-40"
                >
                  <p className="text-[10px] font-mono animate-pulse" style={{ color: 'rgba(92,184,112,0.4)' }}>fetching…</p>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-h-[65vh] overflow-y-auto"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a2e1a transparent' }}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {content}
                  </ReactMarkdown>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsViewer;
