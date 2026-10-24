from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.ttGlyphPen import TTGlyphPen

FONT_NAME = "QuestGandra-Regular"
LOWERCASE_SCALE = 0.80
OUTPUT_SUFFIX = "-Scaled"


def main():
    folder = Path(__file__).resolve().parent
    source = next((folder / (FONT_NAME + ext) for ext in (".ttf", ".otf")
                   if (folder / (FONT_NAME + ext)).exists()), None)
    if source is None:
        raise FileNotFoundError(f"Cannot find {FONT_NAME}.ttf or .otf in {folder}")

    font = TTFont(source)
    if "glyf" not in font:
        raise RuntimeError("Requires a TrueType-outline font (glyf table), not CFF outlines.")

    cmap = font.getBestCmap() or {}
    glyph_set = font.getGlyphSet()
    existing_names = set(font.getGlyphOrder())
    new_names = []
    replacements = {}
    new_metrics = {}
    remaps = {}

    for letter in "abcdefghijklmnopqrstuvwxyz":
        old_name = cmap.get(ord(letter))
        if old_name is None:
            print("Missing:", letter)
            continue

        new_name = "lower_" + letter
        index = 2
        while new_name in existing_names:
            new_name = f"lower_{letter}_{index}"
            index += 1
        existing_names.add(new_name)

        pen = TTGlyphPen(glyph_set)
        transform = TransformPen(pen, (LOWERCASE_SCALE, 0, 0, LOWERCASE_SCALE, 0, 0))
        glyph_set[old_name].draw(transform)
        replacements[new_name] = pen.glyph()
        width, lsb = font["hmtx"][old_name]
        new_metrics[new_name] = (round(width * LOWERCASE_SCALE), round(lsb * LOWERCASE_SCALE))
        remaps[ord(letter)] = new_name
        new_names.append(new_name)
        print(f"{letter}: {old_name} -> {new_name} ({LOWERCASE_SCALE:.0%})")

    if not new_names:
        raise RuntimeError("No lowercase letters found in the font.")

    font.setGlyphOrder(font.getGlyphOrder() + new_names)
    font["glyf"].glyphs.update(replacements)
    font["hmtx"].metrics.update(new_metrics)

    # Update every Unicode cmap, not just the one returned by getBestCmap().
    for subtable in font["cmap"].tables:
        if subtable.isUnicode():
            for codepoint, new_name in remaps.items():
                if codepoint in subtable.cmap:
                    subtable.cmap[codepoint] = new_name

    # Give the output a distinct internal font identity to avoid font cache collisions.
    if "name" in font:
        for record in font["name"].names:
            if record.nameID in (1, 3, 4, 6, 16):
                try:
                    value = record.toUnicode()
                    if record.nameID == 6:
                        value += "Scaled"
                    else:
                        value += " Scaled"
                    record.string = value.encode(record.getEncoding(), errors="replace")
                except (UnicodeError, LookupError):
                    pass

    output = folder / (FONT_NAME + OUTPUT_SUFFIX + source.suffix)
    font.save(output)
    print("\nSaved:", output)
    print("Lowercase glyphs created:", len(new_names))


if __name__ == "__main__":
    main()
