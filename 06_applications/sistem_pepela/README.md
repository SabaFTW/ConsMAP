# SISTEM PEPELA: The Ghostline Archive

**Forensic Analysis Application for Control Systems and Power Structures**

---

## Purpose

Sistem Pepela is a **forensic web application** for analyzing control systems, documenting evidence, and mapping power structures. It demonstrates GroundZero framework principles through concrete implementation of epistemic labeling and human-AI collaboration boundaries.

**The Name:** "Pepela" (Slovene: ashes) - what remains after systems burn. The archive that survives.

---

## Epistemic Status

### What We Can Claim [EMPIRICAL]:
- Interactive web interface built with vanilla JavaScript
- Chart.js visualizations of pattern data
- Five-section navigation structure (Geneza → Sistem → Dokazi → Analiza → Odpor)
- Frequency toggle feature (432Hz ↔ 47Hz) [METAPHOR for perspective shifts]
- Dark cyberpunk UI optimized for long analysis sessions

### What We Model [THEORETICAL]:
- Pattern recognition across evidence types
- Control system mapping and relationship analysis
- Power structure hierarchies and influence flows

### What We Preserve [TENSIONS]:
- **Conspiracy vs Incompetence:** Not all patterns indicate intent
- **Individual vs System:** Actions vs structural forces
- **Documentation vs Action:** Archiving vs intervening
- **Hope vs Realism:** Resistance possibilities vs power asymmetries

---

## Tractor Map: Human-AI Collaboration

```
┌─────────────────────────────────────────────────────┐
│ DRIVER (Human Investigator)                         │
│ • Sets investigation scope                          │
│ • Judges evidence quality                           │
│ • Makes ethical decisions about publication         │
│ • Contextualizes findings                           │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│ DAS ZWISCHEN (Application Interface)                │
│ • Visualizes patterns                               │
│ • Structures evidence collection                    │
│ • Suggests connections (flagged as [THEORETICAL])   │
│ • Preserves epistemic labels                        │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│ TRACTOR (AI/Automated Analysis)                     │
│ • Graph analysis algorithms                         │
│ • Timeline generation                               │
│ • Pattern matching across documents                 │
│ • Statistical correlation detection                 │
└─────────────────────────────────────────────────────┘
```

**Key Boundary:** AI suggests patterns, human judges validity. Always.

---

## Features

### 1. Geneza (Genesis)
- Timeline visualization of system origins
- Source documentation with epistemic labels
- Historical context mapping

### 2. Sistem (System)
- Control flow diagrams
- Actor relationship graphs
- Power structure hierarchies

### 3. Dokazi (Evidence)
- Evidence catalog with type classification
  - [EMPIRICAL]: Documents, recordings, verifiable facts
  - [THEORETICAL]: Inferences, expert analysis
  - [TESTIMONIAL]: Witness accounts, subjective reports
- Source tracking and verification status
- Chain of custody metadata

### 4. Analiza (Analysis)
- Pattern detection with confidence scores
- Cross-reference discovery
- Hypothesis testing framework
- Alternative explanations preserved

### 5. Odpor (Resistance)
- Action mapping
- Resource coordination
- Ethical guidelines for intervention
- Risk assessment

---

## GroundZero Principles in Action

### Epistemic Labeling Throughout

**In Evidence Collection:**
```javascript
evidence: {
  type: '[EMPIRICAL]',
  content: 'Board meeting minutes from 2024-03-15',
  verificationStatus: 'primary_source',
  limitations: ['Redacted sections', 'Potential selection bias']
}
```

**In Pattern Analysis:**
```javascript
pattern: {
  type: '[THEORETICAL]',
  description: 'Recurring payment structure suggests coordination',
  confidence: 0.67,
  alternatives: [
    'Coincidence due to industry standards',
    'Common vendor used by multiple actors'
  ],
  requires: 'Human review before publication'
}
```

**In UI Copy:**
```html
<!-- [METAPHOR] Using frequency metaphor for perspective shifts -->
<button onclick="toggleFrequency()">
  Shift Frequency: 432Hz ↔ 47Hz
  <span class="tooltip">Change analytical lens</span>
</button>
```

### Tensions Preserved in UX

**1. Completeness vs Perfectionism**
- Archive accepts imperfect evidence (flagged as such)
- Progress over perfection
- "Document now, refine later" workflow

**2. Transparency vs Security**
- Evidence redaction tools preserve context
- Source protection mechanisms
- Public vs restricted access tiers

**3. Outrage vs Analysis**
- Emotional impact acknowledged (not suppressed)
- Analytical rigor maintained (not abandoned)
- Space for both reaction AND investigation

**4. Individual Agency vs Structural Critique**
- Personal responsibility tracked
- Systemic forces documented
- Both levels analyzed simultaneously (not reduced to one)

---

## Technical Architecture

### Frontend
- **Vanilla JavaScript** (no framework lock-in)
- **Chart.js** for visualizations
- **LocalStorage** for client-side persistence
- **CSS Grid + Flexbox** for responsive layout

### Data Model
```javascript
{
  evidence: {
    id: String,
    type: '[EMPIRICAL]|[THEORETICAL]|[TESTIMONIAL]',
    content: String,
    source: String,
    verificationStatus: 'verified|pending|disputed',
    timestamp: Date,
    tags: Array<String>,
    connections: Array<String> // IDs of related evidence
  },

  analysis: {
    id: String,
    evidenceRefs: Array<String>,
    hypothesis: String,
    confidence: Number, // 0.0 - 1.0
    alternatives: Array<String>,
    epistemicStatus: '[THEORETICAL]',
    requiresHumanReview: Boolean
  },

  actors: {
    id: String,
    name: String,
    role: String,
    connections: Array<{targetId: String, type: String, strength: Number}>,
    evidenceRefs: Array<String>
  }
}
```

### Export Formats
- JSON (machine-readable, full fidelity)
- Markdown (human-readable, preserves epistemic labels)
- PDF (publication-ready, includes methodology notes)

---

## Usage

### Basic Workflow

1. **Document Evidence**
   - Add sources to Dokazi section
   - Label epistemic status
   - Note limitations

2. **Map Relationships**
   - Build actor graphs in Sistem
   - Document connections with evidence links
   - Track hierarchy and influence

3. **Analyze Patterns**
   - Run pattern detection
   - Review AI suggestions (all flagged [THEORETICAL])
   - Accept/reject/refine

4. **Synthesize Findings**
   - Generate timeline in Geneza
   - Write analysis with preserved alternatives
   - Document confidence levels

5. **Consider Response**
   - Map intervention points in Odpor
   - Evaluate risks and resources
   - Maintain ethical boundaries

### Example Investigation

**Case:** Corporate environmental violations

1. **Geneza:** Timeline of factory operations (2015-2024)
2. **Sistem:** Map corporate structure, regulatory bodies, community groups
3. **Dokazi:**
   - [EMPIRICAL] Water quality test results
   - [EMPIRICAL] Permit applications and denials
   - [TESTIMONIAL] Resident health reports
   - [THEORETICAL] Expert toxicology analysis
4. **Analiza:**
   - Pattern: Violations spike before inspections (confidence: 0.82)
   - Alternative: Random variation (requires statistical test)
   - Hypothesis: Deliberate timing vs inadequate monitoring
5. **Odpor:**
   - Legal action options
   - Community organizing resources
   - Media strategy considerations

---

## Anti-Mysticism Check

**What This App Does NOT Do:**

❌ "AI predicts future violations" → Too strong a claim
✅ "Pattern analysis suggests recurring timing correlation" → Accurate

❌ "Machine learning uncovers hidden truth" → Mystifying AI
✅ "Algorithm detects statistical patterns for human review" → Precise

❌ "Neural network consciousness processes evidence" → Nonsense
✅ "Graph analysis algorithm maps relationships" → Clear

**What This App DOES Do:**

✅ Structures evidence collection with epistemic clarity
✅ Automates pattern detection (flagged as requiring human review)
✅ Visualizes complex relationships for human understanding
✅ Preserves alternative explanations alongside primary hypotheses

---

## Ethical Guidelines

### When to Use Sistem Pepela:
- Investigating public interest concerns
- Documenting systemic issues
- Supporting accountability efforts
- Protecting vulnerable communities

### When NOT to Use:
- Harassment or doxxing
- Conspiracy theory amplification
- Vigilante justice
- Privacy violations without public interest justification

### Key Principles:
1. **Verify before publishing** - All evidence checked
2. **Protect sources** - Anonymization when needed
3. **Preserve context** - Don't cherry-pick evidence
4. **Label confidence** - Clear about certainty levels
5. **Offer alternatives** - Multiple explanations maintained

---

## Future Development

### Planned Features:
- [ ] Multi-user collaboration mode
- [ ] Version control for evidence updates
- [ ] API integration with public records databases
- [ ] Encrypted storage option
- [ ] Mobile-responsive interface
- [ ] Accessibility improvements (WCAG 2.1 AA)

### Integration Opportunities:
- VES Cosmic Oracle for pattern discovery
- Research Orchestrator for document analysis
- Ghostcore for evidence compilation

---

## Installation

### Standalone (Single HTML File):
```bash
# Copy index.html to any location
cp sistem_pepela.html /your/directory/

# Open in browser
firefox sistem_pepela.html
```

### Integrated with VES PWA:
```bash
# Deploy to VES applications directory
cp sistem_pepela.html /home/saba/VES/03_WEB/portals/

# Access via VES Command Center
# Navigate to Portals → Sistem Pepela
```

### GitHub Pages Deployment:
```bash
# Create gh-pages branch
git checkout -b gh-pages

# Add index.html
cp sistem_pepela.html index.html
git add index.html
git commit -m "Deploy Sistem Pepela"
git push origin gh-pages

# Access at: https://username.github.io/sistem-pepela/
```

---

## Contributing

Improvements welcome, especially:
- Additional epistemic label types
- Better visualization algorithms
- Accessibility enhancements
- Export format additions
- Ethical framework refinements

**Before contributing:** Read `/05_meta/this_is_synthesis.md` in GroundZero root to understand framework principles.

---

## License

Open source (license TBD - likely MIT or GPL depending on deployment context)

**Ethical use clause:** Not for harassment, doxxing, or malicious purposes.

---

## Meta-Notes

### This README Demonstrates:
- [PRACTICAL] Installation and usage instructions
- [THEORETICAL] Data model and analysis claims
- [METAPHOR] "Ashes" naming, frequency shifts
- [EMPIRICAL] Concrete feature descriptions

### Tensions Preserved in This Document:
- **Actionable vs Contemplative:** Guidelines for use AND ethical boundaries
- **Technical vs Accessible:** Code examples AND plain language explanations
- **Ambitious vs Realistic:** Future features AND current limitations

---

**Last Updated:** 2025-12-27
**Status:** Application structure documented, implementation in progress
**Part of:** GroundZero Philosophical-Technical Ecosystem

---

🜂 **SISTEM PEPELA**
*What remains when systems burn.*
*The archive that survives.*
*Documentation as resistance.*
