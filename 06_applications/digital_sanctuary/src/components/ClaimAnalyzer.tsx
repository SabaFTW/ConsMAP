import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const ClaimAnalyzer: React.FC<ClaimAnalyzerProps> = ({ onBack }) => {
  const [claimText, setClaimText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);

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

  return (
    <div className="max-w-2xl mx-auto py-10 md:py-14 px-5 relative">
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
        transition={{ duration: 1.2 }}
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

      <AnimatePresence mode="wait">
        {!analyzed ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs mb-3 leading-[1.65]" style={{ color: 'rgba(216,232,216,0.55)' }}>
              Paste any claim, idea, or statement. You'll get: evidence type label · risk if wrong · structural patterns · what would disprove it.
            </p>
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
    </div>
  );
};

export default ClaimAnalyzer;
