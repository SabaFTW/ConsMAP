#!/usr/bin/env python3
"""
ConsMAP Claim Card Generator

An interactive CLI tool to convert raw thoughts and research into
structured YAML claim cards for the ConsMAP pipeline.
"""

import os
import sys
import yaml
from datetime import datetime
import re

def prompt(question: str, default: str = "") -> str:
    """Prompt user with a question and optional default."""
    if default:
        ans = input(f"\033[1m{question}\033[0m [{default}]: ").strip()
        return ans if ans else default
    else:
        while True:
            ans = input(f"\033[1m{question}\033[0m: ").strip()
            if ans:
                return ans
            print("\033[31mThis field is required.\033[0m")

def prompt_choice(question: str, choices: list, default: str = "") -> str:
    """Prompt user to select from a list of choices."""
    choices_str = "/".join(choices)
    prompt_text = f"{question} ({choices_str})"
    
    while True:
        ans = prompt(prompt_text, default).lower()
        if ans in choices:
            return ans
        print(f"\033[31mInvalid choice. Must be one of: {', '.join(choices)}\033[0m")

def main():
    print("\n\033[1m\033[36mConsMAP Claim Card Generator\033[0m")
    print("\033[2mTurn raw research into structured epistemic claims.\033[0m\n")

    # 1. The Claim
    print("Step 1: What exactly is being claimed?")
    print("\033[2m(Make it a single, falsifiable sentence. No vague accusations.)\033[0m")
    claim = prompt("Claim text")
    
    # Generate an ID
    safe_name = re.sub(r'[^a-z0-9]', '_', claim.lower()[:30]).strip('_')
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    claim_id = f"claim_{timestamp}_{safe_name}"

    # 2. Source
    print("\nStep 2: What source supports this?")
    source_ref = prompt("Source (URL, document name, or 'personal observation')")
    
    source_types = ["primary", "official", "academic", "mainstream_reporting", "specialist_reporting", "independent_analysis", "personal_observation", "unknown"]
    source_type = prompt_choice("Source type", source_types, "unknown")

    # 3. Claim Type
    print("\nStep 3: What type of claim is this?")
    claim_types = ["empirical", "theoretical", "structural_analysis", "metaphor", "speculation"]
    claim_type = prompt_choice("Claim type", claim_types, "empirical")

    # 4. Falsification
    print("\nStep 4: What would disprove it?")
    print("\033[2m(If you can't name what would disprove it, it's not a usable claim.)\033[0m")
    falsification = prompt("Falsification condition")

    # 5. Risk
    print("\nStep 5: What is the risk if this is wrong?")
    risks = ["low", "medium", "high"]
    risk_level = prompt_choice("Risk of misuse/harm", risks, "medium")

    # Auto-routing logic (basic)
    confidence = "low"
    status = "unverified"
    river = "muddy_river"

    if source_type in ["primary", "official", "academic"] and claim_type == "empirical":
        if risk_level != "high":
            river = "clean_river"
            status = "supported"
            confidence = "medium"
    elif claim_type == "metaphor":
        river = "symbolic_river"
        status = "metaphor_only"
        confidence = "medium"
    elif risk_level == "high":
        river = "stone_river"
        status = "restricted"
        
    print("\n\033[1mGenerating claim card...\033[0m")
    
    card = {
        "id": claim_id,
        "claim": claim,
        "river": river,
        "status": status,
        "category": "uncategorized",
        "claim_type": claim_type,
        "confidence": confidence,
        "sources": [
            {
                "type": source_type,
                "reference": source_ref
            }
        ],
        "risk": {
            "misuse": risk_level
        },
        "falsification": falsification,
        "allowed_use": ["debate", "analysis"] if risk_level != "high" else [],
        "not_allowed_use": ["unsupported_accusation"],
        "notes": "Generated via interactive CLI."
    }

    # Ensure directory exists
    output_dir = os.path.join(os.path.dirname(__file__), "..", "user_research", "claims_pending")
    os.makedirs(output_dir, exist_ok=True)
    
    output_file = os.path.join(output_dir, f"{claim_id}.yaml")
    
    with open(output_file, "w") as f:
        yaml.dump(card, f, default_flow_style=False, sort_keys=False, allow_unicode=True)

    print(f"\n\033[32m✓ Success!\033[0m Claim card saved to:\n  {output_file}")
    print(f"\nNext step: analyze it with:\n  python tools/analyze_claim.py {output_file}\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n\033[31mCancelled.\033[0m")
        sys.exit(1)
