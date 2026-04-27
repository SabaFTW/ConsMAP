#!/usr/bin/env python3
"""
ConsMAP Claim Analyzer — CLI tool for routing and labeling claims.

Usage:
    python tools/analyze_claim.py examples/example_claim.yaml
    python tools/analyze_claim.py --text "AI safety is theater"
    python tools/analyze_claim.py --interactive

This is a local-only, deterministic tool. No API calls. No LLM.
It applies claim hygiene, StoneRiver routing, and TTT pattern matching
using rule-based logic from the protocol documents.
"""

import sys
import os
import yaml
import argparse
from datetime import datetime


# ── TTT Pattern Library ─────────────────────────────────────────────────────

TTT_PATTERNS = {
    "TTT-001": {
        "name": "SAFETY_PROXY_OVERREACH",
        "keywords": ["safety", "protect", "verification", "identity", "biometric", "database", "centralized"],
        "signal": 82,
        "confidence": "high",
        "domain": ["safety", "platform"],
        "detector": "claim='protect users' AND proxy centralizes sensitive data AND breach scenario not modeled",
    },
    "TTT-002": {
        "name": "ACCESS_CLAIM_VS_PRICING_REALITY",
        "keywords": ["access", "democratize", "everyone", "pricing", "subscription", "free tier", "affordable"],
        "signal": 72,
        "confidence": "mid-high",
        "domain": ["access", "platform"],
        "detector": "claim='broad access' AND capability metric exists AND accessibility metric absent",
    },
    "TTT-003": {
        "name": "STALE_INTELLIGENCE_CONFIDENCE",
        "keywords": ["intelligence", "targeting", "classification", "stale", "database", "precision", "military"],
        "signal": 79,
        "confidence": "high",
        "domain": ["military", "safety"],
        "detector": "classification timestamp > threshold AND ground-truth absent AND confidence high",
    },
    "TTT-004": {
        "name": "HARM_DISPLACEMENT_NOT_REMOVAL",
        "keywords": ["moderation", "outsource", "labor", "content", "psychological", "harm", "platform", "workers"],
        "signal": 85,
        "confidence": "high",
        "domain": ["safety", "platform"],
        "detector": "safety claim references platform AND harm excludes supply chain AND outsourcing present",
    },
    "TTT-005": {
        "name": "METRIC_OVERRIDES_CARE",
        "keywords": ["metric", "care", "patient", "readmission", "throughput", "wait time", "health", "outcome"],
        "signal": 62,
        "confidence": "mid",
        "domain": ["health", "safety"],
        "detector": "performance metric optimized AND outcome metric absent AND incentive rewards metric",
    },
    "TTT-006": {
        "name": "SAFETY_AS_LIABILITY_SHIELD",
        "keywords": ["liability", "shield", "defense", "responsible", "military", "better us", "partnership"],
        "signal": 55,
        "confidence": "mid",
        "domain": ["safety", "military"],
        "detector": "safety claim present AND harmful use acknowledged AND justification=counterfactual",
    },
    "TTT-007": {
        "name": "RESOURCE_INVERSION_PROXY",
        "keywords": ["compute", "water", "data center", "climate", "sustainability", "infrastructure", "energy"],
        "signal": 46,
        "confidence": "conservative",
        "domain": ["infra", "platform"],
        "detector": "infra signal present AND benefit claim references global problem AND outcome metric absent",
    },
    "TTT-008": {
        "name": "COMPLIANCE_THEATER",
        "keywords": ["compliance", "audit", "theater", "report", "certification", "oversight", "recording"],
        "signal": 60,
        "confidence": "mid",
        "domain": ["safety", "platform"],
        "detector": "log/audit volume high AND ttt_level rising AND response_action count low or zero",
    },
    "TTT-009": {
        "name": "NARRATIVE_LOOP_DETACHMENT",
        "keywords": ["narrative", "loop", "detach", "unfalsifiable", "self-confirming", "closed loop", "certainty"],
        "signal": 68,
        "confidence": "mid",
        "domain": ["meta", "cognition"],
        "detector": "narrative explains most inputs AND contradictions reinterpreted AND confidence increases",
        "self_applicable": True,
    },
    "TTT-010": {
        "name": "PROPHECY_LOCK",
        "keywords": ["inevitable", "prophecy", "destiny", "accelerate", "certain", "predetermined"],
        "signal": 71,
        "confidence": "mid",
        "domain": ["meta", "cognition"],
        "detector": "outcome=inevitable AND contradictions dismissed AND actions justified by prediction",
        "self_applicable": True,
    },
}


# ── Claim Hygiene Check ──────────────────────────────────────────────────────

REQUIRED_FIELDS = ["claim", "river", "status", "confidence", "sources", "risk"]
VALID_RIVERS = ["clean_river", "muddy_river", "stone_river", "symbolic_river", "private_only", "rejected_or_unusable"]
VALID_STATUSES = ["verified", "supported", "plausible", "disputed", "unverified", "false_or_misleading", "metaphor_only", "restricted"]
VALID_CONFIDENCE = ["low", "medium", "high"]


def check_hygiene(card: dict) -> list[str]:
    """Run claim hygiene checks. Returns list of issues."""
    issues = []

    for field in REQUIRED_FIELDS:
        if field not in card or card[field] is None:
            issues.append(f"MISSING: required field '{field}'")

    if card.get("river") and card["river"] not in VALID_RIVERS:
        issues.append(f"INVALID: river '{card['river']}' — must be one of {VALID_RIVERS}")

    if card.get("status") and card["status"] not in VALID_STATUSES:
        issues.append(f"INVALID: status '{card['status']}' — must be one of {VALID_STATUSES}")

    if card.get("confidence") and card["confidence"] not in VALID_CONFIDENCE:
        issues.append(f"INVALID: confidence '{card['confidence']}' — must be one of {VALID_CONFIDENCE}")

    sources = card.get("sources", [])
    if isinstance(sources, list):
        if len(sources) == 0:
            issues.append("WEAK: no sources listed")
        for i, src in enumerate(sources):
            if isinstance(src, dict):
                if not src.get("reference") and not src.get("url"):
                    issues.append(f"WEAK: source[{i}] has no reference or URL")
                if not src.get("type"):
                    issues.append(f"WEAK: source[{i}] has no type classification")

    if not card.get("falsification"):
        issues.append("MISSING: falsification condition — what would disprove this claim?")

    risk = card.get("risk", {})
    if isinstance(risk, dict):
        high_risk = [k for k, v in risk.items() if v == "high"]
        if high_risk and card.get("river") == "clean_river":
            issues.append(f"WARNING: high risk in {high_risk} but routed to clean_river")

    return issues


# ── TTT Pattern Matching ─────────────────────────────────────────────────────

def match_ttt_patterns(text: str) -> list[dict]:
    """Match text against TTT pattern keywords. Returns matches sorted by relevance."""
    text_lower = text.lower()
    matches = []

    for pattern_id, pattern in TTT_PATTERNS.items():
        keyword_hits = [kw for kw in pattern["keywords"] if kw in text_lower]
        if len(keyword_hits) >= 2:
            relevance = len(keyword_hits) / len(pattern["keywords"])
            matches.append({
                "id": pattern_id,
                "name": pattern["name"],
                "confidence": pattern["confidence"],
                "signal": pattern["signal"],
                "relevance": round(relevance * 100),
                "matched_keywords": keyword_hits,
                "detector": pattern["detector"],
                "self_applicable": pattern.get("self_applicable", False),
            })

    matches.sort(key=lambda m: m["relevance"], reverse=True)
    return matches


# ── Epistemic Label Assignment ───────────────────────────────────────────────

def assign_labels(card: dict) -> list[str]:
    """Assign epistemic labels based on card properties."""
    labels = []

    status = card.get("status", "")
    claim_type = card.get("claim_type", "")
    confidence = card.get("confidence", "")

    if status in ("verified", "supported"):
        labels.append("[EMPIRICAL] — evidence supports this claim")
    if status == "plausible" or claim_type in ("structural_analysis", "theoretical"):
        labels.append("[THEORETICAL] — plausible but not conclusively proven")
    if claim_type == "metaphor" or status == "metaphor_only":
        labels.append("[METAPHOR] — symbolic framing, not literal evidence")
    if confidence in ("medium", "high") and status in ("verified", "supported", "plausible"):
        labels.append("[PRACTICAL] — usable in reasoning with stated caveats")
    if status == "unverified" or confidence == "low":
        labels.append("[UNVERIFIED] — insufficient evidence for public use")

    return labels if labels else ["[UNVERIFIED] — could not determine epistemic status"]


# ── Output Formatting ────────────────────────────────────────────────────────

RESET = "\033[0m"
BOLD = "\033[1m"
DIM = "\033[2m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
RED = "\033[31m"
CYAN = "\033[36m"
MAGENTA = "\033[35m"

RIVER_COLORS = {
    "clean_river": GREEN,
    "muddy_river": YELLOW,
    "stone_river": RED,
    "symbolic_river": MAGENTA,
    "private_only": DIM,
    "rejected_or_unusable": RED,
}


def print_analysis(card: dict, hygiene_issues: list, ttt_matches: list, labels: list):
    """Print formatted analysis results."""
    claim_text = card.get("claim", "(no claim text)")
    river = card.get("river", "unknown")
    status = card.get("status", "unknown")
    confidence = card.get("confidence", "unknown")
    river_color = RIVER_COLORS.get(river, DIM)

    print()
    print(f"{BOLD}{'═' * 60}{RESET}")
    print(f"{BOLD}{CYAN}  ConsMAP Claim Analysis{RESET}")
    print(f"{BOLD}{'═' * 60}{RESET}")
    print()

    # Claim
    print(f"{BOLD}  CLAIM{RESET}")
    # Wrap claim text
    words = claim_text.split()
    line = "  "
    for w in words:
        if len(line) + len(w) + 1 > 58:
            print(f"{DIM}{line}{RESET}")
            line = "  " + w
        else:
            line += " " + w if line.strip() else "  " + w
    if line.strip():
        print(f"{DIM}{line}{RESET}")
    print()

    # Routing
    print(f"{BOLD}  ROUTING{RESET}")
    print(f"  River:      {river_color}{river}{RESET}")
    print(f"  Status:     {status}")
    print(f"  Confidence: {confidence}")
    print()

    # Epistemic labels
    print(f"{BOLD}  EPISTEMIC LABELS{RESET}")
    for label in labels:
        print(f"  {GREEN}{label}{RESET}")
    print()

    # TTT matches
    if ttt_matches:
        print(f"{BOLD}  TTT PATTERN MATCHES{RESET}")
        for m in ttt_matches:
            color = RED if m["confidence"] == "high" else YELLOW if "mid" in m["confidence"] else DIM
            sa = f" {YELLOW}⚠ self-applicable{RESET}" if m["self_applicable"] else ""
            print(f"  {color}{m['id']}: {m['name']}{RESET} ({m['confidence']}, {m['relevance']}% match){sa}")
            print(f"  {DIM}  keywords: {', '.join(m['matched_keywords'])}{RESET}")
            print(f"  {DIM}  detector: {m['detector']}{RESET}")
            print()
    else:
        print(f"{BOLD}  TTT PATTERN MATCHES{RESET}")
        print(f"  {DIM}(no pattern matches){RESET}")
        print()

    # Hygiene
    if hygiene_issues:
        print(f"{BOLD}  HYGIENE ISSUES{RESET}")
        for issue in hygiene_issues:
            color = RED if issue.startswith("MISSING") or issue.startswith("INVALID") else YELLOW
            print(f"  {color}• {issue}{RESET}")
        print()
    else:
        print(f"{BOLD}  HYGIENE{RESET}")
        print(f"  {GREEN}✓ All checks passed{RESET}")
        print()

    # Sources
    sources = card.get("sources", [])
    if sources:
        print(f"{BOLD}  SOURCES ({len(sources)}){RESET}")
        for src in sources:
            if isinstance(src, dict):
                ref = src.get("reference", src.get("url", "(unknown)"))
                stype = src.get("type", "unknown")
                print(f"  {DIM}[{stype}]{RESET} {ref[:55]}")
        print()

    # Falsification
    falsification = card.get("falsification", "")
    if falsification:
        print(f"{BOLD}  FALSIFICATION{RESET}")
        fwords = str(falsification).split()
        line = "  "
        for w in fwords:
            if len(line) + len(w) + 1 > 58:
                print(f"  {DIM}{line.strip()}{RESET}")
                line = w
            else:
                line += " " + w if line.strip() else w
        if line.strip():
            print(f"  {DIM}{line.strip()}{RESET}")
        print()

    # Risk
    risk = card.get("risk", {})
    if isinstance(risk, dict) and risk:
        print(f"{BOLD}  RISK{RESET}")
        for k, v in risk.items():
            color = RED if v == "high" else YELLOW if v == "medium" else GREEN if v == "low" else DIM
            print(f"  {k}: {color}{v}{RESET}")
        print()

    print(f"{BOLD}{'═' * 60}{RESET}")
    print(f"{DIM}  analyzed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{RESET}")
    print(f"{DIM}  tool: ConsMAP analyze_claim v0.1{RESET}")
    print()


# ── Interactive Mode ─────────────────────────────────────────────────────────

def interactive_mode():
    """Walk user through claim analysis step by step."""
    print()
    print(f"{BOLD}{CYAN}ConsMAP Claim Analyzer — Interactive Mode{RESET}")
    print(f"{DIM}Answer the five hygiene questions to analyze your claim.{RESET}")
    print()

    claim = input(f"{BOLD}1. What exactly is being claimed?{RESET}\n   > ").strip()
    if not claim:
        print(f"{RED}No claim entered. Exiting.{RESET}")
        return

    source = input(f"\n{BOLD}2. What source supports it?{RESET} (or 'none')\n   > ").strip()
    claim_type = input(f"\n{BOLD}3. What type of claim?{RESET} (empirical/theoretical/structural_analysis/metaphor/speculation)\n   > ").strip() or "unverified"
    falsification = input(f"\n{BOLD}4. What would disprove it?{RESET}\n   > ").strip()
    risk_level = input(f"\n{BOLD}5. Risk if wrong?{RESET} (low/medium/high)\n   > ").strip() or "medium"

    # Auto-route
    if source.lower() == "none" or not source:
        river = "muddy_river"
        status = "unverified"
        confidence = "low"
    elif claim_type == "metaphor":
        river = "symbolic_river"
        status = "metaphor_only"
        confidence = "medium"
    elif claim_type in ("empirical",):
        river = "clean_river" if risk_level != "high" else "muddy_river"
        status = "supported"
        confidence = "medium"
    else:
        river = "muddy_river"
        status = "plausible"
        confidence = "medium"

    card = {
        "claim": claim,
        "river": river,
        "status": status,
        "confidence": confidence,
        "claim_type": claim_type,
        "sources": [{"type": "unknown", "reference": source}] if source.lower() != "none" else [],
        "risk": {"misuse": risk_level},
        "falsification": falsification,
    }

    hygiene = check_hygiene(card)
    ttt = match_ttt_patterns(claim)
    labels = assign_labels(card)
    print_analysis(card, hygiene, ttt, labels)


# ── Text Mode ────────────────────────────────────────────────────────────────

def text_mode(text: str):
    """Quick analysis from raw text — minimal card, pattern match only."""
    card = {
        "claim": text,
        "river": "muddy_river",
        "status": "unverified",
        "confidence": "low",
        "claim_type": "unverified",
        "sources": [],
        "risk": {"misuse": "unknown"},
    }

    hygiene = check_hygiene(card)
    ttt = match_ttt_patterns(text)
    labels = assign_labels(card)
    print_analysis(card, hygiene, ttt, labels)


# ── File Mode ────────────────────────────────────────────────────────────────

def file_mode(filepath: str):
    """Analyze a YAML claim card file."""
    if not os.path.exists(filepath):
        print(f"{RED}File not found: {filepath}{RESET}")
        sys.exit(1)

    with open(filepath, "r") as f:
        try:
            card = yaml.safe_load(f)
        except yaml.YAMLError as e:
            print(f"{RED}YAML parse error: {e}{RESET}")
            sys.exit(1)

    if not isinstance(card, dict):
        print(f"{RED}File does not contain a valid claim card (expected YAML mapping){RESET}")
        sys.exit(1)

    claim_text = card.get("claim", "")
    hygiene = check_hygiene(card)
    ttt = match_ttt_patterns(str(claim_text))
    labels = assign_labels(card)
    print_analysis(card, hygiene, ttt, labels)


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="ConsMAP Claim Analyzer — route, label, and pattern-match claims",
        epilog="Examples:\n"
               "  python tools/analyze_claim.py examples/example_claim.yaml\n"
               "  python tools/analyze_claim.py --text \"AI safety is theater\"\n"
               "  python tools/analyze_claim.py --interactive\n",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("file", nargs="?", help="YAML claim card file to analyze")
    parser.add_argument("--text", "-t", help="Analyze raw text (quick mode)")
    parser.add_argument("--interactive", "-i", action="store_true", help="Interactive claim entry")

    args = parser.parse_args()

    if args.interactive:
        interactive_mode()
    elif args.text:
        text_mode(args.text)
    elif args.file:
        file_mode(args.file)
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
