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
    <div className="max-w-2xl mx-auto py-16 px-6 relative">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-16 block transition-colors duration-500 hover:opacity-70"
        style={{ color: '#2a4a25' }}
      >
        ← back
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="mb-12"
      >
        <h1 className="text-2xl md:text-3xl font-extralight tracking-tight mb-3" style={{ color: '#d8e8d8' }}>
          Claim Analyzer
        </h1>
        <p className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: '#2a4a25' }}>
          Static Diagnostic Layer
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!analyzed ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            <textarea
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
              placeholder="Enter a raw claim, thought, or note to analyze..."
              className="w-full h-40 bg-transparent border p-6 text-sm font-light leading-relaxed focus:outline-none resize-none transition-colors duration-500"
              style={{ 
                borderColor: 'rgba(92, 184, 112, 0.2)', 
                color: 'rgba(216, 232, 216, 0.8)',
              }}
            />
            <div className="mt-8 flex justify-end">
              <button
                onClick={analyze}
                disabled={!claimText.trim()}
                className="text-xs font-mono tracking-[0.2em] uppercase transition-all duration-500 hover:opacity-100 disabled:opacity-20"
                style={{ color: '#5cb870', opacity: claimText.trim() ? 0.7 : 0.2 }}
              >
                Analyze Claim
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Display Input Text */}
            <div>
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-4" style={{ color: '#2a4a25' }}>
                Raw Input
              </p>
              <p className="text-sm font-light leading-relaxed italic" style={{ color: 'rgba(216, 232, 216, 0.6)' }}>
                "{claimText}"
              </p>
            </div>

            {/* Default Baseline Routing */}
            <div className="p-6 border" style={{ borderColor: 'rgba(92, 184, 112, 0.1)' }}>
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-4" style={{ color: '#5cb870' }}>
                Baseline Routing (Unverified)
              </p>
              <div className="space-y-2 text-xs font-mono">
                <p><span style={{ color: '#2a4a25' }}>River:</span> <span style={{ color: '#d8e8d8' }}>muddy_river</span></p>
                <p><span style={{ color: '#2a4a25' }}>Status:</span> <span style={{ color: '#d8e8d8' }}>unverified</span></p>
                <p><span style={{ color: '#2a4a25' }}>Epistemic Label:</span> <span style={{ color: 'rgba(216, 232, 216, 0.6)' }}>[UNVERIFIED] — insufficient evidence for public use</span></p>
              </div>
            </div>

            {/* TTT Matches */}
            <div>
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-6" style={{ color: '#2a4a25' }}>
                TTT Pattern Diagnostics
              </p>
              {matches.length > 0 ? (
                <div className="space-y-6">
                  {matches.map((m, i) => (
                    <div key={i} className="pl-4 border-l border-opacity-30" style={{ borderColor: '#5cb870' }}>
                      <p className="text-sm font-mono tracking-wide mb-2" style={{ color: '#d8e8d8' }}>
                        {m.id}: {m.name}
                        {m.self_applicable && <span style={{ color: '#5cb870' }}> ⚠ self-applicable</span>}
                      </p>
                      <p className="text-xs font-light" style={{ color: 'rgba(216, 232, 216, 0.5)' }}>
                        Confidence: {m.confidence} | Match: {m.relevance}%
                      </p>
                      <p className="text-xs font-light mt-1" style={{ color: '#2a4a25' }}>
                        Hits: {m.hits.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-light italic" style={{ color: 'rgba(216, 232, 216, 0.4)' }}>
                  No structural patterns detected in this text.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-8 pt-8" style={{ borderTop: '1px solid rgba(26, 46, 26, 0.5)' }}>
              <button
                onClick={reset}
                className="text-[10px] font-mono tracking-[0.2em] uppercase transition-colors duration-500 hover:opacity-100"
                style={{ color: '#2a4a25' }}
              >
                New Claim
              </button>
              <button
                onClick={downloadYaml}
                className="text-[10px] font-mono tracking-[0.2em] uppercase transition-colors duration-500 hover:opacity-100"
                style={{ color: '#5cb870' }}
              >
                ↓ Export claim_card.yaml
              </button>
            </div>
            
            <p className="text-[9px] font-mono leading-relaxed mt-8" style={{ color: 'rgba(42, 74, 37, 0.7)' }}>
              Place the downloaded YAML in user_research/claims_pending/ 
              <br/>to complete the intake pipeline.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClaimAnalyzer;
