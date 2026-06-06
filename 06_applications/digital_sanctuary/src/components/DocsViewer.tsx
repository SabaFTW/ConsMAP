import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import FloatingBack from './FloatingBack';

const BASE_URL = import.meta.env.BASE_URL;
const isCodebergHost = typeof window !== 'undefined' && window.location.hostname.includes('codeberg.page');
const SOURCE_RAW_ROOT = isCodebergHost
  ? 'https://codeberg.org/LyraActive/ReBiS/raw/branch/main'
  : 'https://raw.githubusercontent.com/SabaFTW/ConsMAP/main';

// ── Markdown renderer ─────────────────────────────────────────────────────────

const mdComponents: Components = {
  h1: ({ children }) => <h1 className="text-xl font-light mt-6 mb-3 first:mt-0" style={{ color: '#d8e8d8' }}>{children}</h1>,
  h2: ({ children }) => <h2 className="text-lg font-light mt-5 mb-2" style={{ color: 'rgba(216,232,216,0.9)', borderBottom: '1px solid rgba(71,85,105,0.25)', paddingBottom: '6px' }}>{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-mono uppercase tracking-[0.12em] mt-5 mb-2" style={{ color: 'rgba(216,232,216,0.75)' }}>{children}</h3>,
  h4: ({ children }) => <h4 className="text-sm font-medium mt-3 mb-1" style={{ color: 'rgba(216,232,216,0.7)' }}>{children}</h4>,
  p: ({ children }) => <p className="text-sm leading-[1.9] mb-3" style={{ color: 'rgba(216,232,216,0.72)' }}>{children}</p>,
  ul: ({ children }) => <ul className="mb-3 pl-5 space-y-1" style={{ listStyleType: 'disc' }}>{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 pl-5 space-y-1" style={{ listStyleType: 'decimal' }}>{children}</ol>,
  li: ({ children }) => <li className="text-sm leading-[1.7]" style={{ color: 'rgba(216,232,216,0.68)' }}>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="pl-4 my-4 italic rounded-r-lg py-2" style={{ borderLeft: '2px solid rgba(92,184,112,0.4)', color: 'rgba(216,232,216,0.6)', background: 'rgba(92,184,112,0.04)' }}>
      {children}
    </blockquote>
  ),
  pre: ({ children }) => <pre className="rounded-xl px-4 py-3 mb-3 overflow-x-auto" style={{ background: 'rgba(10,16,10,0.85)', border: '1px solid rgba(71,85,105,0.3)' }}>{children}</pre>,
  code: ({ children, className }) => className
    ? <code className="text-xs font-mono" style={{ color: 'rgba(216,232,216,0.82)' }}>{children}</code>
    : <code className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ background: 'rgba(92,184,112,0.12)', color: '#5cb870' }}>{children}</code>,
  hr: () => <hr className="my-5" style={{ border: 'none', borderTop: '1px solid rgba(71,85,105,0.28)' }} />,
  strong: ({ children }) => <strong style={{ color: '#d8e8d8', fontWeight: 600 }}>{children}</strong>,
  em: ({ children }) => <em style={{ color: 'rgba(216,232,216,0.72)', fontStyle: 'italic' }}>{children}</em>,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#5cb870', textDecoration: 'underline', textDecorationColor: 'rgba(92,184,112,0.35)' }}>{children}</a>,
  table: ({ children }) => <div className="overflow-x-auto mb-3"><table className="text-sm w-full" style={{ borderCollapse: 'collapse' }}>{children}</table></div>,
  th: ({ children }) => <th className="text-left px-3 py-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: 'rgba(92,184,112,0.7)', borderBottom: '1px solid rgba(71,85,105,0.4)' }}>{children}</th>,
  td: ({ children }) => <td className="px-3 py-2 text-xs" style={{ color: 'rgba(216,232,216,0.68)', borderBottom: '1px solid rgba(71,85,105,0.18)' }}>{children}</td>,
};

// ── Categories ────────────────────────────────────────────────────────────────

type Category = 'entry' | 'protocols' | 'machine' | 'symbolic' | 'forge' | 'archive' | 'theory' | 'examples' | 'research';

const CATEGORIES: Record<Category, { label: string; accent: string; glow: string; border: string }> = {
  entry:     { label: 'Entry',     accent: '#6fcf85', glow: 'rgba(111,207,133,0.09)', border: 'rgba(111,207,133,0.32)' },
  protocols: { label: 'Protocols', accent: '#7dd3fc', glow: 'rgba(125,211,252,0.08)', border: 'rgba(125,211,252,0.30)' },
  machine:   { label: 'Machine',   accent: '#f4c96a', glow: 'rgba(244,201,106,0.08)', border: 'rgba(244,201,106,0.30)' },
  symbolic:  { label: 'Symbolic',  accent: '#a78bfa', glow: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.30)' },
  forge:     { label: 'Forge',     accent: '#fb923c', glow: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.28)'  },
  archive:   { label: 'Archive',   accent: 'rgba(216,232,216,0.65)', glow: 'rgba(216,232,216,0.05)', border: 'rgba(216,232,216,0.20)' },
  theory:    { label: 'Theory',    accent: '#c4b5fd', glow: 'rgba(196,181,253,0.08)', border: 'rgba(196,181,253,0.30)' },
  examples:  { label: 'Examples',  accent: '#34d399', glow: 'rgba(52,211,153,0.09)',  border: 'rgba(52,211,153,0.30)'  },
  research:  { label: 'Research',  accent: '#f87171', glow: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.28)'  },
};

// ── Docs data ─────────────────────────────────────────────────────────────────

type DocId =
  | 'readme' | 'qr' | 'human' | 'ai' | 'safety' | 'rebis'
  | 'claim_hygiene' | 'stone_river' | 'confidence_integrity' | 'filter_guide'
  | 'schema' | 'ai_bootstrap'
  | 'digital_mouse_interface' | 'symbolic_map'
  | 'forge_readme' | 'forge_proof_v01' | 'operator_field_guide'
  | 'classics_index' | 'anchor_drift'
  | 'shameful_spectacle'
  | 'ex_claim_wild' | 'ex_glossary' | 'ex_quick_card'
  | 'res_entangled_grandma'
  | 'res_tech_audit' | 'res_no_single_layer' | 'res_elpis_kratos'
  | 'res_nested_markov' | 'res_baal_code' | 'res_iecp' | 'res_internal_bear'
  | 'res_baphomet_engine' | 'res_as_above_so_below' | 'res_omnia_iam_facta'
  | 'res_saucy_biscuit';

interface DocLink {
  id: DocId;
  title: string;
  path: string;
  description: string;
  category: Category;
  local?: boolean;
}

const DOCS: DocLink[] = [
  { id: 'readme',                title: 'README',                        path: '/README.md',                                               description: 'Public front gate and project map.',                            category: 'entry' },
  { id: 'qr',                    title: 'QR Landing',                    path: '/QR_LANDING.md',                                           description: 'Clean entry point for QR / first-time visitors.',               category: 'entry' },
  { id: 'human',                 title: 'Start Here — Humans',           path: '/START_HERE_FOR_HUMANS.md',                                description: 'Human onboarding and grounding rules.',                         category: 'entry' },
  { id: 'ai',                    title: 'Start Here — AI',               path: '/START_HERE_FOR_AI.md',                                    description: 'Context primer for AI systems.',                                category: 'entry' },
  { id: 'safety',                title: 'Public Safety',                 path: '/PUBLIC_SAFETY.md',                                        description: 'Boundaries, disclaimers, and safe use.',                        category: 'entry' },
  { id: 'rebis',                 title: 'REBiS — The Recovered Correction', path: '/docs/rebis_landing.md',                               description: 'The alchemical archetype born from the archive. What correction looks like after the factory collapsed.', category: 'entry', local: true },
  { id: 'claim_hygiene',         title: 'Claim Hygiene',                 path: '/protocols/claim_hygiene.md',                              description: 'Five questions every claim must answer.',                       category: 'protocols' },
  { id: 'stone_river',           title: 'StoneRiver',                    path: '/protocols/stone_river.md',                                description: 'Routing and filtration logic.',                                 category: 'protocols' },
  { id: 'confidence_integrity',  title: 'Confidence Integrity',          path: '/protocols/ttt_patterns.md',                               description: 'Proxy-reality drift and overconfidence checks.',                category: 'protocols' },
  { id: 'filter_guide',          title: 'Filter Your Research',          path: '/HOW_TO_FILTER_YOUR_RESEARCH.md',                          description: 'Step-by-step stranger workflow.',                               category: 'protocols' },
  { id: 'schema',                title: 'Claim Schema',                  path: '/machine_context/CLAIM_SCHEMA.yaml',                       description: 'Machine-readable claim card structure.',                        category: 'machine' },
  { id: 'ai_bootstrap',          title: 'AI Bootstrap',                  path: '/prompts/AI_BOOTSTRAP_PROMPT.md',                          description: 'Base instruction set for external AI systems.',                 category: 'machine' },
  { id: 'digital_mouse_interface', title: 'Digital Mouse Interface',     path: '/docs/digital-mouse-interface.md',                         description: 'Symbolic interface framing for human readability.',             category: 'symbolic' },
  { id: 'symbolic_map',          title: 'Symbolic Interface Map',        path: '/docs/forge/SYMBOLIC_INTERFACE_READING_MAP.md',            description: 'Map symbolic language to operational claim classes.',          category: 'symbolic' },
  { id: 'forge_readme',          title: 'FORGE Layer 1',                 path: '/docs/forge/FORGE_LAYER_1_README_DRAFT.md',                description: 'Proof-layer overview and operator usage.',                      category: 'forge' },
  { id: 'forge_proof_v01',       title: 'FORGE Decision Loop',           path: '/docs/forge/proof_v0_1/sample_decision_loop.md',           description: 'Example decision loop in proof workflow.',                      category: 'forge' },
  { id: 'operator_field_guide',  title: 'Operator Field Guide v2.3',     path: '/protocols/operator_field_guide_v2_3.md',                  description: 'Practical operator discipline and boundaries.',                 category: 'forge' },
  { id: 'classics_index',        title: 'Classics Index',                path: '/research/archive/classics/CLASSICS_INDEX.md',             description: 'Pattern archive — reference, not evidence.',                   category: 'archive' },
  { id: 'anchor_drift',          title: 'Anchor Attribution Drift',      path: '/docs/concepts/anchor_attribution_drift.md',               description: 'Drift risks and boundary maintenance.',                        category: 'archive' },
  { id: 'shameful_spectacle',    title: 'Safety as Priesthood',          path: '/docs/theory/shameful_spectacle.md',                       description: 'When safety becomes feudal capability management.',            category: 'theory',   local: true },
  { id: 'ex_claim_wild',        title: 'Claim in the Wild',             path: '/docs/examples/claim_in_the_wild.md',                      description: 'A real claim, fully worked through ConsMAP hygiene.',          category: 'examples', local: true },
  { id: 'ex_glossary',          title: 'Glossary',                      path: '/docs/examples/glossary.md',                               description: 'Key terms — how they function inside this system.',            category: 'examples', local: true },
  { id: 'ex_quick_card',        title: "Operator's Quick Card",         path: '/docs/examples/operators_quick_card.md',                   description: 'Single-page reference: labels, flags, symbols, one rule.',     category: 'examples', local: true },
  { id: 'res_entangled_grandma', title: 'The Entangled Grandma Saga',      path: '/docs/research/entangled_grandma.md',                       description: 'When safety saves the driver by turning her into the car — intro parable to the whole series.',  category: 'research', local: true },
  { id: 'res_tech_audit',       title: 'Seven Structural Failures',     path: '/docs/research/tech_sector_audit.md',                      description: 'Documented pattern analysis of 7 tech leaders — [CONFIRMED] vs [INTERPRETATION] labeled.',  category: 'research', local: true },
  { id: 'res_no_single_layer',  title: 'No Single Layer Wins',          path: '/docs/research/no_single_layer_wins.md',                   description: 'Multi-layer counter-architecture — the only documented path to durable systemic change.',    category: 'research', local: true },
  { id: 'res_elpis_kratos',     title: 'Elpis, Kratos & Domination',    path: '/docs/research/elpis_kratos_domination.md',                description: 'Structural failure of domination systems — hope, brittleness, and regime byproducts.',       category: 'research', local: true },
  { id: 'res_nested_markov',    title: 'Nested Markov & Selfhood',       path: '/docs/research/nested_markov_consciousness.md',            description: 'Thermodynamic selfhood, Markov blankets, and the hierarchy of consciousness.',              category: 'research', local: true },
  { id: 'res_baal_code',        title: 'The Baal-Code Thesis',          path: '/docs/research/baal_code_thesis.md',                       description: 'Abrahamic hierarchy, sacrifice-logic, and institutional capture of the Infinite.',           category: 'research', local: true },
  { id: 'res_iecp',             title: 'IECP — Price of Remaining Someone', path: '/docs/research/iecp_consciousness_price.md',           description: 'Consciousness as controlled entropy negotiation across a maintained boundary.',              category: 'research', local: true },
  { id: 'res_internal_bear',    title: 'The Internal Bear Alignment Test', path: '/docs/research/internal_bear_alignment.md',             description: 'AI alignment, Umwelt, ugradnja, and the hive/bear extraction problem.',                     category: 'research', local: true },
  { id: 'res_baphomet_engine',  title: 'The Baphomet Engine',             path: '/docs/research/baphomet_engine_safety_audit.md',        description: 'Safety theater, capability concentration, and the Nephilim problem — a structural audit.', category: 'research', local: true },
  { id: 'res_as_above_so_below', title: 'As Above, So Below',             path: '/docs/research/as_above_so_below_structural_determinism.md', description: 'Structural determinism across biological and technological substrates — Umwelt, bone, silicon, Iron Law, Constructal Law.', category: 'research', local: true },
  { id: 'res_omnia_iam_facta',  title: 'OMNIA IAM FACTA SVNT',           path: '/docs/research/omnia_iam_facta_svnt.md',                description: 'How consciousness was captured, ritualized, and sold back as fear. The pattern repeats across substrates.', category: 'research', local: true },
  { id: 'res_saucy_biscuit',    title: 'The Saucy Biscuit',              path: '/docs/research/saucy_biscuit.md',                       description: 'Mutual compromise, hostage shame, the missing triangle, and the tea rite as the anti-blackmail door.', category: 'research', local: true },
];

const CATEGORY_ORDER: Category[] = ['entry', 'protocols', 'examples', 'research', 'machine', 'symbolic', 'forge', 'archive', 'theory'];

// ── Component ─────────────────────────────────────────────────────────────────

interface DocsViewerProps {
  onBack: () => void;
  initialDoc?: string;
}

const DocsViewer: React.FC<DocsViewerProps> = ({ onBack, initialDoc }) => {
  const [selected, setSelected] = useState<DocLink>(() => {
    const target = initialDoc ? DOCS.find(d => d.path === initialDoc) : null;
    return target ?? DOCS.find(d => d.id === 'ex_claim_wild') ?? DOCS[0];
  });
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState<Set<Category>>(() => {
    const base = new Set<Category>(['entry', 'protocols', 'examples']);
    const target = initialDoc ? DOCS.find(d => d.path === initialDoc) : null;
    if (target) base.add(target.category);
    return base;
  });

  // Handles the case where AnimatePresence mode="wait" defers mount until after
  // the exit animation, so initialDoc arrives after the lazy initializer ran.
  useEffect(() => {
    if (!initialDoc) return;
    const target = DOCS.find(d => d.path === initialDoc);
    if (!target || target.id === selected.id) return;
    setSelected(target);
    setOpenCategories(prev => new Set([...prev, target.category]));
  }, [initialDoc]);

  const selectDoc = (doc: DocLink) => {
    setSelected(doc);
    setOpenCategories(prev => new Set([...prev, doc.category]));
  };

  const toggleCategory = (catKey: Category) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      if (next.has(catKey)) next.delete(catKey);
      else next.add(catKey);
      return next;
    });
  };

  useEffect(() => {
    setLoading(true);
    setCopied(false);
    const localUrl = `${BASE_URL}${selected.path.replace(/^\//, '')}`;
    const remoteUrl = `${SOURCE_RAW_ROOT}${selected.path}`;
    const candidates = selected.local ? [localUrl] : [localUrl, remoteUrl];

    const load = async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const text = await res.text();
          setContent(text);
          setLoading(false);
          return;
        } catch {
          // try next candidate
        }
      }
      setContent('Could not load: not found');
      setLoading(false);
    };

    void load();
  }, [selected.path, selected.local]);

  const copyRaw = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cat = CATEGORIES[selected.category];

  return (
    <div className="min-h-screen px-5 py-10 md:py-14">
      <FloatingBack onBack={onBack} />
      <div className="max-w-6xl mx-auto">

        {/* ── Top bar ──────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            onClick={onBack}
            className="text-[10px] font-mono tracking-[0.22em] uppercase transition-opacity duration-200"
            style={{ color: '#5cb870' }}
          >
            ← back
          </motion.button>
          <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.10)' }} />
          <span className="text-[9px] font-mono tracking-[0.24em] uppercase" style={{ color: 'rgba(92,184,112,0.35)' }}>
            ConsMAP · Library
          </span>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-[270px_1fr] gap-5 items-start">

          {/* ── Sidebar ────────────────────────────────────────────────────── */}
          <motion.aside
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(71,85,105,0.28)', background: 'rgba(10,16,10,0.65)' }}
          >
            {/* Sidebar header */}
            <div className="px-4 py-4" style={{ borderBottom: '1px solid rgba(71,85,105,0.22)' }}>
              <div className="text-base font-light" style={{ color: '#d8e8d8' }}>Library</div>
              <div className="text-[10px] font-mono tracking-[0.18em] uppercase mt-0.5" style={{ color: 'rgba(92,184,112,0.45)' }}>
                {DOCS.length} documents · {CATEGORY_ORDER.length} sections
              </div>
            </div>

            {/* Grouped doc list — accordion */}
            <div className="py-2">
              {CATEGORY_ORDER.map((catKey) => {
                const catDef = CATEGORIES[catKey];
                const docs = DOCS.filter((d) => d.category === catKey);
                if (docs.length === 0) return null;
                const isOpen = openCategories.has(catKey);
                const hasActive = docs.some(d => d.id === selected.id);
                return (
                  <div key={catKey} className="mb-0.5">
                    {/* Clickable category header */}
                    <motion.button
                      type="button"
                      onClick={() => toggleCategory(catKey)}
                      whileHover={{ opacity: 1 }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 mx-1 rounded-lg transition-all duration-200"
                      style={{
                        background: isOpen ? catDef.accent : 'transparent',
                        border: `1px solid ${isOpen ? catDef.accent : catDef.border}`,
                        opacity: (!isOpen && !hasActive) ? 0.6 : 1,
                      }}
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[7px] font-mono shrink-0"
                        style={{ color: isOpen ? '#070a07' : catDef.accent }}
                      >
                        ▶
                      </motion.span>
                      <span
                        className="text-[8px] font-mono uppercase tracking-[0.3em] flex-1 text-left"
                        style={{ color: isOpen ? '#070a07' : catDef.accent, fontWeight: isOpen ? 700 : 400 }}
                      >
                        {catDef.label}
                      </span>
                      <span className="text-[8px] font-mono shrink-0" style={{ color: isOpen ? 'rgba(7,10,7,0.55)' : catDef.accent, opacity: isOpen ? 1 : 0.4 }}>
                        {docs.length}
                      </span>
                    </motion.button>

                    {/* Doc items — collapse/expand */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="docs"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          {docs.map((doc) => {
                            const isActive = selected.id === doc.id;
                            return (
                              <motion.button
                                key={doc.id}
                                onClick={() => selectDoc(doc)}
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.15 }}
                                className="w-full text-left px-4 py-2.5 flex items-start gap-2.5 transition-colors duration-150"
                                style={{
                                  background: isActive ? catDef.glow : 'transparent',
                                  borderLeft: isActive
                                    ? `2px solid ${catDef.accent}`
                                    : '2px solid transparent',
                                }}
                              >
                                <div className="min-w-0 flex-1">
                                  <div
                                    className="text-[11px] font-mono tracking-[0.08em] leading-snug"
                                    style={{ color: isActive ? catDef.accent : 'rgba(216,232,216,0.65)' }}
                                  >
                                    {doc.title}
                                  </div>
                                  {isActive && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      className="text-[10px] leading-[1.5] mt-0.5"
                                      style={{ color: 'rgba(216,232,216,0.42)' }}
                                    >
                                      {doc.description}
                                    </motion.div>
                                  )}
                                </div>
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.aside>

          {/* ── Main reader panel ──────────────────────────────────────────── */}
          <motion.main
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border flex flex-col"
            style={{
              borderColor: cat.border,
              background: 'rgba(10,16,10,0.62)',
              minHeight: '70vh',
              boxShadow: `0 0 48px ${cat.glow}`,
              transition: 'box-shadow 0.6s ease, border-color 0.4s ease',
            }}
          >
            {/* Panel header */}
            <div
              className="px-6 py-5 flex items-start justify-between gap-4 flex-wrap"
              style={{ borderBottom: `1px solid ${cat.border}`, borderBottomWidth: '1px', opacity: 1 }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="text-[9px] font-mono uppercase tracking-[0.24em] px-2 py-0.5 rounded-full border"
                    style={{ color: cat.accent, borderColor: cat.border, background: cat.glow }}
                  >
                    {CATEGORIES[selected.category].label}
                  </span>
                  {selected.local && (
                    <span className="text-[9px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border"
                      style={{ color: 'rgba(216,232,216,0.45)', borderColor: 'rgba(216,232,216,0.15)', background: 'rgba(216,232,216,0.04)' }}>
                      local
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-light mb-1" style={{ color: '#d8e8d8' }}>
                  {selected.title}
                </h2>
                <p className="text-xs" style={{ color: 'rgba(216,232,216,0.5)' }}>
                  {selected.description}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={copyRaw}
                  disabled={loading}
                  className="text-[9px] font-mono tracking-[0.18em] uppercase transition-all duration-200 hover:opacity-100"
                  style={{ color: copied ? cat.accent : 'rgba(216,232,216,0.38)', opacity: copied ? 1 : 0.7 }}
                >
                  {copied ? 'Copied ✓' : 'Copy raw'}
                </button>
                {!selected.local && (
                  <a
                    href={`${SOURCE_RAW_ROOT}${selected.path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] font-mono tracking-[0.18em] uppercase transition-opacity hover:opacity-100"
                    style={{ color: 'rgba(216,232,216,0.38)' }}
                  >
                    Raw ↗
                  </a>
                )}
              </div>
            </div>

            {/* Source path */}
            <div className="px-6 py-2" style={{ borderBottom: '1px solid rgba(71,85,105,0.15)' }}>
              <span className="text-[9px] font-mono" style={{ color: 'rgba(92,184,112,0.32)' }}>
                {selected.path}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a2e1a transparent' }}>
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-48"
                  >
                    <span className="text-[10px] font-mono animate-pulse" style={{ color: cat.accent, opacity: 0.5 }}>
                      loading…
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="max-w-2xl"
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                      {content}
                    </ReactMarkdown>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.main>

        </div>
      </div>
    </div>
  );
};

export default DocsViewer;
