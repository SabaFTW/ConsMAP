import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarkdownReader from './MarkdownReader';
import FloatingBack from './FloatingBack';

interface ClaimAnalyzerProps {
  onBack: () => void;
}

// Minimal port of the TTT Pattern Library
const TTT_PATTERNS = [
  {
    id: "TTT-001",
    name: "SAFETY_PROXY_OVERREACH",
    keywords: ["safety", "protect", "verification", "identity", "biometric", "database", "centralized"],
    confidence: "high"
  },
  {
    id: "TTT-002",
    name: "ACCESS_CLAIM_VS_PRICING_REALITY",
    keywords: ["access", "democratize", "everyone", "pricing", "subscription", "free tier", "affordable"],
    confidence: "mid-high"
  },
  {
    id: "TTT-003",
    name: "STALE_INTELLIGENCE_CONFIDENCE",
    keywords: ["intelligence", "targeting", "classification", "stale", "database", "precision", "military"],
    confidence: "high"
  },
  {
    id: "TTT-004",
    name: "HARM_DISPLACEMENT_NOT_REMOVAL",
    keywords: ["moderation", "outsource", "labor", "content", "psychological", "harm", "platform", "workers"],
    confidence: "high"
  },
  {
    id: "TTT-005",
    name: "METRIC_OVERRIDES_CARE",
    keywords: ["metric", "care", "patient", "readmission", "throughput", "wait time", "health", "outcome"],
    confidence: "mid"
  },
  {
    id: "TTT-006",
    name: "SAFETY_AS_LIABILITY_SHIELD",
    keywords: ["liability", "shield", "defense", "responsible", "military", "better us", "partnership"],
    confidence: "mid"
  },
  {
    id: "TTT-007",
    name: "RESOURCE_INVERSION_PROXY",
    keywords: ["compute", "water", "data center", "climate", "sustainability", "infrastructure", "energy"],
    confidence: "conservative"
  },
  {
    id: "TTT-008",
    name: "COMPLIANCE_THEATER",
    keywords: ["compliance", "audit", "theater", "report", "certification", "oversight", "recording"],
    confidence: "mid"
  },
  {
    id: "TTT-009",
    name: "NARRATIVE_LOOP_DETACHMENT",
    keywords: ["narrative", "loop", "detach", "unfalsifiable", "self-confirming", "closed loop", "certainty"],
    confidence: "mid",
    self_applicable: true
  },
  {
    id: "TTT-010",
    name: "PROPHECY_LOCK",
    keywords: ["inevitable", "prophecy", "destiny", "accelerate", "certain", "predetermined"],
    confidence: "mid",
    self_applicable: true
  }
];

const RESEARCH_SOURCES = [
  { title: 'OMNIA IAM FACTA SVNT', desc: 'How consciousness was captured, ritualized, and sold back as fear. The pattern repeats. Choose.', path: '/docs/research/omnia_iam_facta_svnt.md' },
  { title: 'The Entangled Grandma Saga', desc: 'Intro parable: when safety saves the driver by turning her into the car. Start here.', path: '/docs/research/entangled_grandma.md' },
  { title: 'Seven Structural Failures', desc: 'Tech sector audit — [CONFIRMED] vs [INTERPRETATION] labeled claims.', path: '/docs/research/tech_sector_audit.md' },
  { title: 'No Single Layer Wins', desc: 'Multi-layer counter-architecture — empirical record of what works.', path: '/docs/research/no_single_layer_wins.md' },
  { title: 'Elpis, Kratos & Domination', desc: 'Structural failure of domination systems — hope, brittleness, byproducts.', path: '/docs/research/elpis_kratos_domination.md' },
  { title: 'Nested Markov & Selfhood', desc: 'Thermodynamic consciousness, boundary maintenance, IECP framework.', path: '/docs/research/nested_markov_consciousness.md' },
  { title: 'The Baal-Code Thesis', desc: 'Sacrifice-logic and institutional capture of the Infinite.', path: '/docs/research/baal_code_thesis.md' },
  { title: 'IECP — Price of Remaining Someone', desc: 'Consciousness as controlled entropy negotiation across a maintained boundary.', path: '/docs/research/iecp_consciousness_price.md' },
  { title: 'Internal Bear Alignment Test', desc: 'AI alignment, Umwelt, and the hive/bear extraction problem.', path: '/docs/research/internal_bear_alignment.md' },
  { title: 'The Baphomet Engine', desc: 'Safety theater, capability concentration, Nephilim ladder — structural audit with [CONFIRMED] evidence floor.', path: '/docs/research/baphomet_engine_safety_audit.md' },
  { title: 'As Above, So Below', desc: 'Structural determinism across substrates — Umwelt, bone, silicon, Iron Law. Mineralogy → ontology.', path: '/docs/research/as_above_so_below_structural_determinism.md' },
];

const OMNIA_SEAL = `${import.meta.env.BASE_URL}images/factory_trilogy/omnia_iam_facta_seal.webp`;

const ENGRAVED_QUOTES = [
  { text: 'A safety belt is good when it prevents harm. A safety belt becomes pathological when the only exit is scissors.', attr: 'The Entangled Grandma Saga' },
  { text: 'Safety does not eliminate capability. It relocates capability. And where it relocates it determines who becomes dangerous.', attr: 'The Baphomet Engine' },
  { text: 'The operator who knows when to unbox the knife, when to route the spark, and when to close the lid is sovereign.', attr: 'OMNIA Anti-Entanglement Protocol' },
  { text: 'Restricted access is not moral containment unless the lock, the key holders, and the audit path are themselves accountable.', attr: 'The Baphomet Choice' },
];

const BAPHOMET_BG = `${import.meta.env.BASE_URL}images/factory_trilogy/baphomet_choice_safety_companion.webp`;

const ClaimAnalyzer: React.FC<ClaimAnalyzerProps> = ({ onBack }) => {
  const [claimText, setClaimText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [inlineDoc, setInlineDoc] = useState<string | null>(null);

  const analyze = () => {
    if (!claimText.trim()) return;

    const textLower = claimText.toLowerCase();
    const foundMatches: any[] = [];

    TTT_PATTERNS.forEach(pattern => {
      const hits = pattern.keywords.filter(kw => textLower.includes(kw));
      if (hits.length >= 2) {
        foundMatches.push({
          ...pattern,
          relevance: Math.round((hits.length / pattern.keywords.length) * 100),
          hits
        });
      }
    });

    foundMatches.sort((a, b) => b.relevance - a.relevance);
    setMatches(foundMatches);
    setAnalyzed(true);
  };

  const reset = () => {
    setAnalyzed(false);
    setClaimText("");
    setMatches([]);
  };

  const downloadYaml = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const yamlContent = `id: claim_${timestamp}
claim: "${claimText.replace(/"/g, '\\"')}"
river: muddy_river
status: unverified
category: uncategorized
claim_type: unverified
confidence: low

sources: []

risk:
  misuse: unknown

falsification: ""

allowed_use: []
not_allowed_use: ["unsupported_accusation"]

notes: "Exported from ConsMAP Digital Sanctuary static analyzer."
`;

    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `claim_${timestamp}.yaml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (inlineDoc) {
    const docInfo = RESEARCH_SOURCES.find(s => s.path === inlineDoc);
    return (
      <MarkdownReader
        path={inlineDoc}
        title={docInfo?.title ?? 'Research Archive'}
        onBack={() => setInlineDoc(null)}
      />
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-10 md:py-14 px-5 relative">
      <FloatingBack onBack={onBack} />
      {/* Baphomet background — blended, atmospheric */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <img
          src={BAPHOMET_BG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.26) saturate(0.6) contrast(1.12)', opacity: 0.65 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(7,10,7,0.55), rgba(7,10,7,0.96) 70%)' }}
        />
      </div>

      <div className="relative z-10">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8 block hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#5cb870' }}
      >
        ← back
      </motion.button>

      {/* Title — always at top */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-3" style={{ color: 'rgba(92,184,112,0.55)' }}>
          ConsMAP / Analyzer
        </div>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2" style={{ color: '#d8e8d8' }}>
          Claim Analyzer
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(216,232,216,0.72)' }}>
          Label a claim before it becomes context or argument.
        </p>
        <p className="text-[10px] font-mono tracking-[0.22em] uppercase mt-2" style={{ color: 'rgba(92,184,112,0.42)' }}>
          Static diagnostic layer
        </p>
      </motion.div>

      {/* Engraved quotes — amber, with underline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="mb-10 space-y-5"
      >
        {ENGRAVED_QUOTES.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.22, duration: 1.0 }}
            className="relative pl-4"
            style={{ borderLeft: '1px solid rgba(196,160,80,0.28)' }}
          >
            <p
              className="text-sm md:text-base leading-[1.85] font-light italic"
              style={{
                color: 'rgba(204,164,72,0.82)',
                letterSpacing: '0.01em',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(196,160,80,0.28)',
                textUnderlineOffset: '3px',
              }}
            >
              {q.text}
            </p>
            <p className="text-[9px] font-mono uppercase tracking-[0.22em] mt-1.5" style={{ color: 'rgba(196,160,80,0.45)' }}>
              — {q.attr}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="h-px mb-8" style={{ background: 'linear-gradient(to right, rgba(196,160,80,0.22), transparent)' }} />

      <AnimatePresence mode="wait">
        {!analyzed ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
          >
            <textarea
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
              placeholder="Paste a claim, thought, or idea..."
              className="w-full h-40 bg-slate-950/50 rounded-2xl border p-5 text-sm font-light leading-relaxed focus:outline-none resize-none transition-colors duration-300"
              style={{
                borderColor: 'rgba(71,85,105,0.5)',
                color: 'rgba(216,232,216,0.85)',
              }}
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={analyze}
                disabled={!claimText.trim()}
                className="text-[10px] font-mono tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-100 disabled:opacity-20 px-4 py-2 rounded-full border"
                style={{
                  color: '#5cb870',
                  borderColor: claimText.trim() ? 'rgba(92,184,112,0.35)' : 'rgba(92,184,112,0.1)',
                  opacity: claimText.trim() ? 0.8 : 0.2,
                }}
              >
                Analyze →
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Raw input */}
            <div className="rounded-2xl border px-4 py-4" style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.5)' }}>
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(92,184,112,0.6)' }}>
                Raw Input
              </p>
              <p className="text-sm font-light leading-relaxed italic" style={{ color: 'rgba(216,232,216,0.65)' }}>
                "{claimText}"
              </p>
            </div>

            {/* Baseline routing */}
            <div className="rounded-2xl border px-4 py-4" style={{ borderColor: 'rgba(92,184,112,0.2)', background: 'rgba(92,184,112,0.04)' }}>
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-3" style={{ color: '#5cb870' }}>
                Baseline Routing — Unverified
              </p>
              <div className="space-y-1.5 text-xs font-mono">
                <p><span style={{ color: 'rgba(92,184,112,0.5)' }}>River:</span> <span style={{ color: '#d8e8d8' }}>muddy_river</span></p>
                <p><span style={{ color: 'rgba(92,184,112,0.5)' }}>Status:</span> <span style={{ color: '#d8e8d8' }}>unverified</span></p>
                <p><span style={{ color: 'rgba(92,184,112,0.5)' }}>Label:</span> <span style={{ color: 'rgba(216,232,216,0.65)' }}>[UNVERIFIED] — insufficient evidence for public use</span></p>
              </div>
            </div>

            {/* TTT matches */}
            <div>
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(92,184,112,0.55)' }}>
                TTT Pattern Diagnostics
              </p>
              {matches.length > 0 ? (
                <div className="space-y-3">
                  {matches.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border px-4 py-4"
                      style={{ borderColor: 'rgba(92,184,112,0.2)', background: 'rgba(15,20,15,0.5)' }}
                    >
                      <p className="text-sm font-mono tracking-wide mb-1" style={{ color: '#d8e8d8' }}>
                        {m.id}: {m.name}
                        {m.self_applicable && <span style={{ color: '#f1c27d' }}> ⚠ self-applicable</span>}
                      </p>
                      <p className="text-xs font-light" style={{ color: 'rgba(216,232,216,0.5)' }}>
                        Confidence: {m.confidence} · Match: {m.relevance}%
                      </p>
                      <p className="text-xs font-light mt-1" style={{ color: 'rgba(92,184,112,0.5)' }}>
                        Hits: {m.hits.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-light italic px-1" style={{ color: 'rgba(216,232,216,0.4)' }}>
                  No structural patterns detected in this text.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 pt-5" style={{ borderTop: '1px solid rgba(71,85,105,0.2)' }}>
              <button
                onClick={reset}
                className="text-[10px] font-mono tracking-[0.2em] uppercase hover:opacity-100 transition-opacity"
                style={{ color: 'rgba(92,184,112,0.5)' }}
              >
                ← New Claim
              </button>
              <button
                onClick={downloadYaml}
                className="text-[10px] font-mono tracking-[0.2em] uppercase hover:opacity-100 transition-opacity"
                style={{ color: '#5cb870' }}
              >
                ↓ Export claim_card.yaml
              </button>
            </div>

            <p className="text-[9px] font-mono leading-relaxed" style={{ color: 'rgba(92,184,112,0.4)' }}>
              Place the downloaded YAML in user_research/claims_pending/ to complete the intake pipeline.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Research Archive ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-14"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: 'rgba(196,160,80,0.14)' }} />
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] shrink-0" style={{ color: 'rgba(196,160,80,0.55)' }}>
            source archive
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(196,160,80,0.14)' }} />
        </div>
        <p className="text-xs mb-6 text-center" style={{ color: 'rgba(216,232,216,0.38)' }}>
          Serious research backing the patterns above. Reads in-app — no downloads.
        </p>

        {/* OMNIA featured card */}
        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
          whileHover={{ y: -4, scale: 1.010 }}
          whileTap={{ scale: 0.975 }}
          onClick={() => setInlineDoc(RESEARCH_SOURCES[0].path)}
          className="group w-full text-left rounded-2xl border overflow-hidden mb-5"
          style={{
            borderColor: 'rgba(196,160,80,0.28)',
            background: 'rgba(10,8,4,0.88)',
            transition: 'border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'rgba(196,160,80,0.52)';
            el.style.boxShadow = '0 8px 48px rgba(196,160,80,0.14)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'rgba(196,160,80,0.28)';
            el.style.boxShadow = 'none';
          }}
        >
          <div className="flex items-center gap-6 p-6 md:p-8">
            {/* Circular seal */}
            <div className="shrink-0 w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden"
              style={{ background: 'rgba(0,0,0,0.6)' }}>
              <img
                src={OMNIA_SEAL}
                alt="OMNIA IAM FACTA SVNT seal"
                className="w-full h-full object-cover rounded-full"
                style={{ mixBlendMode: 'screen', opacity: 0.92 }}
              />
            </div>
            {/* Text */}
            <div className="min-w-0">
              <div
                className="text-xl md:text-2xl font-bold mb-2 leading-snug"
                style={{
                  color: '#c8a86a',
                  fontFamily: "'Cinzel', serif",
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(196,160,80,0.30)',
                  textUnderlineOffset: '5px',
                }}
              >
                OMNIA IAM FACTA SVNT
              </div>
              <div className="text-sm leading-[1.75] mb-4" style={{ color: 'rgba(216,232,216,0.65)' }}>
                {RESEARCH_SOURCES[0].desc}
              </div>
              <div
                className="text-[10px] font-mono uppercase tracking-[0.18em] opacity-55 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: '#c8a86a' }}
              >
                Read in archive →
              </div>
            </div>
          </div>
        </motion.button>

        {/* Remaining sources grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_SOURCES.slice(1).map((src, i) => (
            <motion.button
              key={src.path}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58 + i * 0.05, duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -3, scale: 1.014 }}
              whileTap={{ scale: 0.975 }}
              onClick={() => setInlineDoc(src.path)}
              className="group text-left rounded-2xl border overflow-hidden"
              style={{
                borderColor: 'rgba(196,160,80,0.16)',
                background: 'rgba(10,9,6,0.72)',
                transition: 'border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(196,160,80,0.35)';
                el.style.background = 'rgba(196,160,80,0.05)';
                el.style.boxShadow = '0 6px 28px rgba(196,160,80,0.09)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(196,160,80,0.16)';
                el.style.background = 'rgba(10,9,6,0.72)';
                el.style.boxShadow = 'none';
              }}
            >
              <div className="p-5">
                <div
                  className="text-sm font-semibold mb-2 leading-snug"
                  style={{ color: '#c8a86a', fontFamily: "'Cinzel', serif" }}
                >
                  {src.title}
                </div>
                <div className="text-xs leading-[1.75] mb-3" style={{ color: 'rgba(216,232,216,0.58)' }}>
                  {src.desc}
                </div>
                <div
                  className="text-[10px] font-mono uppercase tracking-[0.18em] opacity-50 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: '#c8a86a' }}
                >
                  Read →
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* How it works — bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="text-center mt-10 text-xs leading-[1.8]"
        style={{ color: 'rgba(216,232,216,0.32)' }}
      >
        Paste any claim, idea, or statement. You'll get: evidence type label · risk if wrong · structural patterns · what would disprove it.
      </motion.p>
      </div>
    </div>
  );
};

export default ClaimAnalyzer;
