#!/usr/bin/env python3
"""
Import a public-safe OMNIA ConsMAP bridge bundle.

This tool intentionally imports only the bridge bundle, not the full OMNIA
evidence vault. It verifies the bundle manifest and every declared file hash
before generating public atlas markdown.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import html
import json
import shutil
import sys
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
ATLAS = REPO / "docs" / "06_omnia" / "atlas"
RELEASES = REPO / "data" / "omnia" / "releases"
EXPECTED_FILES = {
    "README.md",
    "BRIDGE_MANIFEST.json",
    "BRIDGE_MANIFEST.sha256",
    "SCHEMA_CROSSWALK.csv",
    "PUBLIC_CLAIMS.json",
    "PUBLIC_CLAIMS.csv",
    "SYMBOLIC_REGISTER.json",
    "BLOCKED_CLAIMS_SUMMARY.csv",
    "SOURCE_POINTERS.csv",
    "HUMAN_DECISIONS.json",
    "WHAT_THIS_DOES_NOT_CLAIM.md",
    "IMPORT_INSTRUCTIONS.md",
}


def sha256_path(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def safe_text(value: object) -> str:
    return html.escape(str(value or ""), quote=False)


def verify_bundle(bundle: Path) -> dict:
    if not bundle.is_dir():
        raise SystemExit(f"Bundle directory not found: {bundle}")
    present = {p.name for p in bundle.iterdir() if p.is_file()}
    missing = EXPECTED_FILES - present
    if missing:
        raise SystemExit(f"Bundle missing required files: {sorted(missing)}")
    extra = present - EXPECTED_FILES
    if extra:
        raise SystemExit(f"Bundle contains undeclared public files: {sorted(extra)}")

    manifest_path = bundle / "BRIDGE_MANIFEST.json"
    detached = (bundle / "BRIDGE_MANIFEST.sha256").read_text(encoding="utf-8").split()[0]
    manifest_hash = sha256_path(manifest_path)
    if detached != manifest_hash:
        raise SystemExit("BRIDGE_MANIFEST.sha256 does not match BRIDGE_MANIFEST.json")

    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    declared = {entry["file"] for entry in manifest["files"]}
    if declared != present - {"BRIDGE_MANIFEST.json", "BRIDGE_MANIFEST.sha256"}:
        raise SystemExit("Manifest file list does not match bundle contents")
    for entry in manifest["files"]:
        path = bundle / entry["file"]
        if path.stat().st_size != entry["byte_size"]:
            raise SystemExit(f"Size mismatch for {entry['file']}")
        if sha256_path(path) != entry["sha256"]:
            raise SystemExit(f"SHA-256 mismatch for {entry['file']}")
    return manifest


def copy_release_cache(bundle: Path, state_hash: str) -> Path:
    dest = RELEASES / state_hash
    if dest.exists():
        existing_manifest = dest / "BRIDGE_MANIFEST.json"
        if not existing_manifest.exists() or sha256_path(existing_manifest) != sha256_path(bundle / "BRIDGE_MANIFEST.json"):
            raise SystemExit(f"Existing release cache differs; refusing overwrite: {dest}")
        return dest
    dest.mkdir(parents=True)
    for path in sorted(bundle.iterdir(), key=lambda p: p.name):
        if path.is_file():
            shutil.copy2(path, dest / path.name)
    return dest


def claim_status_to_consmap(claim: dict) -> tuple[str, str, str]:
    evidence = claim.get("evidence_class", "").lower()
    verification = claim.get("verification_status", "").lower()
    risk = claim.get("misuse_risk", "medium")
    if "primary" in evidence or "official" in evidence or "verified" in verification or "primary-checked" in verification:
        return "supported", "medium", "clean_river" if risk != "high" else "stone_river"
    return "plausible", "low", "muddy_river"


def write_claim_cards(public_claims: list[dict]) -> None:
    cards_dir = ATLAS / "claim_cards"
    cards_dir.mkdir(parents=True, exist_ok=True)
    index_lines = ["# OMNIA Public Claim Cards", "", "Generated from the verified OMNIA bridge bundle. These are public-safe claim candidates, not a full evidence vault.", ""]
    for claim in public_claims:
        status, confidence, river = claim_status_to_consmap(claim)
        card = {
            "id": claim["omnia_claim_id"],
            "claim": claim["claim_text"],
            "status": status,
            "confidence": confidence,
            "river": river,
            "category": claim["domain"].lower().replace(" ", "_"),
            "claim_type": "empirical" if "FACT" in claim.get("claim_type", "").upper() else "structural_analysis",
            "sources": [
                {
                    "type": "official" if "official" in claim.get("evidence_class", "").lower() else "unknown",
                    "reference": claim["precise_locator"],
                }
            ],
            "risk": {
                "misuse": claim["misuse_risk"],
                "defamation": claim["defamation_risk"],
                "radicalization": "medium" if "hitler" in claim["claim_text"].lower() else "low",
                "privacy": "none" if claim["privacy_risk"] == "low" else claim["privacy_risk"],
            },
            "falsification": claim["falsifier"],
            "allowed_use": ["debate", "analysis", "model_context"],
            "not_allowed_use": ["harassment", "unsupported_accusation"],
            "notes": {
                "source_artifact_id": claim["source_artifact_id"],
                "source_sha256": claim["source_sha256"],
                "ceiling": claim["ceiling"],
                "verification_status": claim["verification_status"],
                "contradiction_group": claim["contradiction_group"],
                "publication_status": claim["publication_status"],
                "provenance": claim["provenance"],
            },
        }
        path = cards_dir / f"{claim['omnia_claim_id']}.json"
        path.write_text(json.dumps(card, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        index_lines.append(f"- [{claim['omnia_claim_id']}](claim_cards/{claim['omnia_claim_id']}.json): {safe_text(claim['claim_text'])}")
    (ATLAS / "PUBLIC_CLAIMS.md").write_text("\n".join(index_lines) + "\n", encoding="utf-8")


def write_symbolic(symbolic: list[dict]) -> None:
    lines = [
        "# OMNIA Symbolic Register",
        "",
        "SATIRE ABOVE. LEDGER BELOW.",
        "",
        "This register is routed as `symbolic_river` / `metaphor_only`. It cannot carry factual load.",
        "",
    ]
    for row in symbolic:
        lines.append(f"- `{safe_text(row['artifact_id'])}`: {safe_text(row['title'])} -- {safe_text(row['symbolic_status'])}; lock: {safe_text(row['interpretive_lock'])}")
    (ATLAS / "SYMBOLIC_REGISTER.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_blocked(blocked: list[dict]) -> None:
    lines = [
        "# OMNIA Blocked Claims Summary",
        "",
        "Blocked records are suppression metadata, not promotional text. Unsupported allegations are not repeated here beyond claim ID/domain/status.",
        "",
        "| Claim ID | Domain | Reasons | Evidence class |",
        "|---|---|---|---|",
    ]
    for row in blocked:
        lines.append(f"| `{safe_text(row['CLAIM_ID'])}` | {safe_text(row['DOMAIN'])} | {safe_text(row['LIMITING_REASONS'])} | {safe_text(row['EVIDENCE_CLASS'])} |")
    (ATLAS / "BLOCKED_CLAIMS.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_index(manifest: dict, public_claims: list[dict], symbolic: list[dict], blocked: list[dict], release_cache: Path) -> None:
    lines = [
        "# OMNIA Atlas Import",
        "",
        "Generated from a verified public-safe OMNIA bridge bundle. This directory is generated output; edit the importer or bridge source, not these files.",
        "",
        f"- Bridge state: `{manifest['bridge_state_sha256']}`",
        f"- Source sealed release: `{manifest['source_sealed_release']}`",
        f"- Local release cache: `data/omnia/releases/{release_cache.name}/`",
        f"- Public factual claim cards: `{len(public_claims)}`",
        f"- Symbolic records: `{len(symbolic)}`",
        f"- Blocked summaries: `{len(blocked)}`",
        "",
        "## Registers",
        "",
        "- [Public claims](PUBLIC_CLAIMS.md)",
        "- [Symbolic register](SYMBOLIC_REGISTER.md)",
        "- [Blocked claims](BLOCKED_CLAIMS.md)",
        "- [Import manifest](IMPORT_MANIFEST.json)",
        "",
        "## Guardrail",
        "",
        "A source-bounded factual extraction never upgrades its containing narrative volume. Repetition is not authority.",
    ]
    (ATLAS / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def import_bundle(bundle: Path) -> dict:
    manifest = verify_bundle(bundle)
    state_hash = manifest["bridge_state_sha256"]
    release_cache = copy_release_cache(bundle, state_hash)
    public_claims = json.loads((bundle / "PUBLIC_CLAIMS.json").read_text(encoding="utf-8"))
    symbolic = json.loads((bundle / "SYMBOLIC_REGISTER.json").read_text(encoding="utf-8"))
    blocked = read_csv(bundle / "BLOCKED_CLAIMS_SUMMARY.csv")

    write_claim_cards(public_claims)
    write_symbolic(symbolic)
    write_blocked(blocked)
    write_index(manifest, public_claims, symbolic, blocked, release_cache)

    import_manifest = {
        "bridge_state_sha256": state_hash,
        "bridge_manifest_sha256": sha256_path(bundle / "BRIDGE_MANIFEST.json"),
        "source_sealed_release": manifest["source_sealed_release"],
        "public_claim_cards": len(public_claims),
        "symbolic_records": len(symbolic),
        "blocked_summaries": len(blocked),
        "release_cache": f"data/omnia/releases/{state_hash}",
        "generated_files": sorted(str(p.relative_to(REPO)) for p in ATLAS.rglob("*") if p.is_file()),
    }
    (ATLAS / "IMPORT_MANIFEST.json").write_text(json.dumps(import_manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return import_manifest


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("bundle", help="Path to OMNIA consmap_bridge_candidate directory")
    args = parser.parse_args()
    result = import_bundle(Path(args.bundle).resolve())
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    sys.exit(main())
