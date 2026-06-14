#!/usr/bin/env python3
"""Trim a built dist/ for a lean Codeberg Pages deploy.
Downsizes oversized PNG/JPG/WEBP in place (filenames preserved, so refs keep working).
Usage: python3 scripts/trim_dist.py dist
"""
import sys, os, glob
from PIL import Image

dist = sys.argv[1] if len(sys.argv) > 1 else "dist"
os.chdir(dist)

def opt(path):
    try:
        sz = os.path.getsize(path)
        ext = path.lower().rsplit(".", 1)[-1]
        im = Image.open(path)
        changed = False
        if max(im.size) > 1500:
            im.thumbnail((1500, 1500), Image.LANCZOS); changed = True
        if ext == "png" and sz > 500_000:
            im.save(path, "PNG", optimize=True)
        elif ext in ("jpg", "jpeg") and sz > 400_000:
            im.convert("RGB").save(path, "JPEG", quality=82, optimize=True)
        elif ext == "webp" and sz > 500_000:
            im.save(path, "WEBP", quality=80, method=6)
        elif changed:
            im.save(path)
    except Exception as e:
        print("skip", path, e)

pats = ("**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.webp")
files = [p for pat in pats for p in glob.glob(pat, recursive=True)]
for p in files:
    opt(p)
print(f"trimmed {len(files)} candidate images in {dist}")
