"""Generate the -400/-800 webp thumbnails used by the project screenshot gallery.

Usage:
    python scripts/make-thumbs.py images/webp/ProjectScreenShots/MailboxManager/productvraag.webp
    python scripts/make-thumbs.py images/webp/ProjectScreenShots/SomeProject/*.webp
    python scripts/make-thumbs.py images/webp/ProjectScreenShots/SomeProject/

For each "<name>.webp" given, writes "<name>-400.webp" and "<name>-800.webp"
next to it (skipping widths larger than the source image, and skipping files
that already end in "-400"/"-800" so re-running is safe).

Requires Pillow: pip install pillow
"""

import sys
from pathlib import Path

from PIL import Image

WIDTHS = (400, 800)


def is_thumb(path: Path) -> bool:
    stem = path.stem
    return any(stem.endswith(f"-{w}") for w in WIDTHS)


def make_thumbs(src: Path) -> None:
    if is_thumb(src):
        return

    with Image.open(src) as im:
        for w in WIDTHS:
            if w >= im.width:
                continue
            h = round(im.height * (w / im.width))
            out = src.with_name(f"{src.stem}-{w}{src.suffix}")
            im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=82, method=6)
            print(f"wrote {out} ({w}x{h})")


def collect(args: list[str]) -> list[Path]:
    paths: list[Path] = []
    for arg in args:
        p = Path(arg)
        if p.is_dir():
            paths.extend(sorted(p.glob("*.webp")))
        else:
            paths.append(p)
    return paths


def main() -> None:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)

    for src in collect(args):
        if not src.exists():
            print(f"skip (not found): {src}")
            continue
        if src.suffix.lower() != ".webp":
            print(f"skip (not .webp): {src}")
            continue
        make_thumbs(src)


if __name__ == "__main__":
    main()
