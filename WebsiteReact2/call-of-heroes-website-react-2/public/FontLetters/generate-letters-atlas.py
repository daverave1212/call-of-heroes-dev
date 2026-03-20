import json
import sys
from pathlib import Path
from PIL import Image

LETTERS = [chr(c) for c in range(ord('a'), ord('z') + 1)]


def main():
    folder = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()

    # Target JSON directory (relative to current script working dir)
    target_json_dir = (Path.cwd() / "../../src/pages/Tools").resolve()
    target_json_dir.mkdir(parents=True, exist_ok=True)

    print(f"JSON target directory: {target_json_dir}")

    images = {}
    missing = []

    for letter in LETTERS:
        path = folder / f"{letter}.png"
        if not path.exists():
            missing.append(letter)
            continue

        img = Image.open(path).convert("RGBA")
        images[letter] = img

    if not images:
        print("No letter PNG files found (expected a.png to z.png).")
        sys.exit(1)

    if missing:
        print("Missing letters:", ", ".join(missing))

    total_width = sum(img.width for img in images.values())
    max_height = max(img.height for img in images.values())

    atlas = Image.new("RGBA", (total_width, max_height), (0, 0, 0, 0))

    config = {}
    x_offset = 0

    for letter in LETTERS:
        img = images.get(letter)
        if img is None:
            continue

        atlas.paste(img, (x_offset, 0), img)
        config[letter] = {
            "x": x_offset,
            "y": 0,
            "width": img.width,
            "height": img.height
        }
        x_offset += img.width

    atlas_path = folder / "letters-atlas.webp"
    json_path = target_json_dir / "letters-atlas.json"

    # Save atlas
    atlas.save(atlas_path, format="WEBP", lossless=True, quality=100)

    # Save JSON
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2)

    print(f"Saved atlas: {atlas_path.resolve()}")
    print(f"Saved JSON: {json_path.resolve()}")


if __name__ == "__main__":
    main()