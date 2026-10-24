"""Build a TrueType font from a.png ... z.png using Potrace + fontTools.

Install: pip install pillow fonttools svgpathtools
Also install the Potrace command-line executable and put it on PATH.
"""
from pathlib import Path
import math
import re
import shutil
import subprocess
import tempfile
import xml.etree.ElementTree as ET

from PIL import Image
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.cu2quPen import Cu2QuPen
from svgpathtools import parse_path, Line, CubicBezier, QuadraticBezier, Arc

# ---------- SETTINGS ----------
FONT_NAME = "QuestGandra-Regular"
OUTPUT_TTF = FONT_NAME + ".ttf"
UNITS_PER_EM = 1000
CAP_HEIGHT = 700
REFERENCE_LETTER = "o"
# Source-image pixels below the baseline (not font units).
DESCENDER_PIXELS = {"q": 83, "j": 97}
ASCENDER = 850
DESCENDER = -200
SIDE_BEARING = 55
SPACE_WIDTH = 300
ALPHA_THRESHOLD = 100  # pixels with alpha >= this become solid
TRACE_TURDSIZE = 2     # remove tiny isolated specks
TRACE_ALPHAMAX = 1.0   # corner smoothing; 0 makes corners sharp
TRACE_OPTTOLERANCE = 0.2
SAVE_SVG_PREVIEWS = True
# --------------------------------
ROOT = Path(__file__).resolve().parent


def trace_png(png_file, svg_file, workdir):
    with Image.open(png_file) as original:
        rgba = original.convert('RGBA')
        alpha = rgba.getchannel('A')
        # Trim to the visible silhouette using the SAME threshold as tracing.
        visible = alpha.point(lambda a: 255 if a >= ALPHA_THRESHOLD else 0)
        bbox = visible.getbbox()
        if bbox is None:
            raise ValueError(f"{png_file.name} has no visible pixels at threshold {ALPHA_THRESHOLD}")
        visible_height = bbox[3] - bbox[1]
        alpha = alpha.crop(bbox)
        mask = alpha.point(lambda a: 0 if a >= ALPHA_THRESHOLD else 255)
        # Potrace treats BLACK pixels as foreground. PGM has 0 = black.
        pgm_file = workdir / 'input.pgm'
        mask.save(pgm_file)
    command = [
        'potrace', str(pgm_file), '--svg', '--output', str(svg_file),
        '--turdsize', str(TRACE_TURDSIZE),
        '--alphamax', str(TRACE_ALPHAMAX),
        '--opttolerance', str(TRACE_OPTTOLERANCE),
    ]
    subprocess.run(command, check=True, capture_output=True, text=True)
    return visible_height


def parse_svg_contours(svg_file):
    """Potrace SVG uses nested translate/scale transforms; apply them exactly."""
    root = ET.parse(svg_file).getroot()
    transform_re = re.compile(r'(translate|scale|matrix)\s*\(([^)]*)\)')

    def mul(a, b):
        # Affine matrices [a,b,c,d,e,f], column vector convention.
        return (
            a[0]*b[0]+a[2]*b[1], a[1]*b[0]+a[3]*b[1],
            a[0]*b[2]+a[2]*b[3], a[1]*b[2]+a[3]*b[3],
            a[0]*b[4]+a[2]*b[5]+a[4], a[1]*b[4]+a[3]*b[5]+a[5]
        )

    def transform_of(value):
        matrix = (1, 0, 0, 1, 0, 0)
        for name, args in transform_re.findall(value or ''):
            nums = [float(x) for x in re.split(r'[\s,]+', args.strip()) if x]
            if name == 'translate':
                t = (1, 0, 0, 1, nums[0], nums[1] if len(nums)>1 else 0)
            elif name == 'scale':
                t = (nums[0], 0, 0, nums[1] if len(nums)>1 else nums[0], 0, 0)
            else:
                t = tuple(nums)
            matrix = mul(matrix, t)
        return matrix

    contours = []
    def walk(node, inherited):
        current = mul(inherited, transform_of(node.get('transform', '')))
        if node.tag.rsplit('}', 1)[-1] == 'path' and node.get('d'):
            path = parse_path(node.get('d'))
            for subpath in path.continuous_subpaths():
                if len(subpath) > 0:
                    contours.append((subpath, current))
        for child in node:
            walk(child, current)
    walk(root, (1, 0, 0, 1, 0, 0))
    return contours


def build_glyph(contours, letter, visible_height, font_units_per_pixel):
    if not contours:
        return TTGlyphPen(None).glyph(), SPACE_WIDTH

    def tr(z, m):
        return complex(m[0]*z.real+m[2]*z.imag+m[4],
                       m[1]*z.real+m[3]*z.imag+m[5])

    points = []
    for path, matrix in contours:
        for seg in path:
            points.extend([tr(seg.start, matrix), tr(seg.end, matrix)])
            if isinstance(seg, CubicBezier):
                points.extend([tr(seg.control1, matrix), tr(seg.control2, matrix)])
            if isinstance(seg, QuadraticBezier):
                points.append(tr(seg.control, matrix))
    minx, maxx = min(p.real for p in points), max(p.real for p in points)
    miny, maxy = min(p.imag for p in points), max(p.imag for p in points)
    height = maxy-miny
    if height <= 0:
        return TTGlyphPen(None).glyph(), SPACE_WIDTH
    # Potrace SVG coordinates can be scaled (typically by 0.1). Convert
    # the traced extent back to source-pixel units before applying one
    # consistent font-wide scale.
    scale = font_units_per_pixel * visible_height / height
    descender_units = DESCENDER_PIXELS.get(letter, 0) * font_units_per_pixel
    width = (maxx-minx)*scale
    tt_pen = TTGlyphPen(None)
    pen = Cu2QuPen(tt_pen, max_err=1.0, reverse_direction=True)

    def point(z, matrix):
        p = tr(z, matrix)
        return (round((p.real-minx)*scale + SIDE_BEARING),
                round((maxy-p.imag)*scale - descender_units))

    for path, matrix in contours:
        pen.moveTo(point(path[0].start, matrix))
        for seg in path:
            if isinstance(seg, Line):
                pen.lineTo(point(seg.end, matrix))
            elif isinstance(seg, CubicBezier):
                pen.curveTo(point(seg.control1, matrix),
                            point(seg.control2, matrix), point(seg.end, matrix))
            elif isinstance(seg, QuadraticBezier):
                pen.qCurveTo(point(seg.control, matrix), point(seg.end, matrix))
            elif isinstance(seg, Arc):
                for cubic in seg.as_cubic_curves():
                    pen.curveTo(point(cubic.control1, matrix),
                                point(cubic.control2, matrix), point(cubic.end, matrix))
        pen.closePath()
    return tt_pen.glyph(), round(width + 2*SIDE_BEARING)


def main():
    if not shutil.which('potrace'):
        raise SystemExit('Potrace executable not found on PATH. Install Potrace first.')
    glyphs = {'.notdef': TTGlyphPen(None).glyph()}
    cmap = {}
    metrics = {'.notdef': (SPACE_WIDTH, 0)}
    glyphs['space'] = TTGlyphPen(None).glyph()
    metrics['space'] = (SPACE_WIDTH, 0)
    cmap[32] = 'space'
    preview_dir = ROOT / 'svg_previews'
    if SAVE_SVG_PREVIEWS:
        preview_dir.mkdir(exist_ok=True)
    reference = ROOT / f"{REFERENCE_LETTER}.png"
    if not reference.exists():
        raise SystemExit(f"Reference image missing: {reference.name}")
    with Image.open(reference) as img:
        alpha = img.convert("RGBA").getchannel("A")
        visible = alpha.point(lambda a: 255 if a >= ALPHA_THRESHOLD else 0)
        bbox = visible.getbbox()
        if bbox is None:
            raise SystemExit(f"Reference image {reference.name} is empty")
        reference_height = bbox[3] - bbox[1]
    font_units_per_pixel = CAP_HEIGHT / reference_height
    print(f"Reference {REFERENCE_LETTER.upper()}: {reference_height} visible px; scale {font_units_per_pixel:.5f} units/px")

    with tempfile.TemporaryDirectory() as temp:
        tempdir = Path(temp)
        for letter in 'abcdefghijklmnopqrstuvwxyz':
            source = ROOT / f'{letter}.png'
            if not source.exists():
                print(f'Skipping {source.name} (not found)')
                continue
            svg = preview_dir / f'{letter}.svg' if SAVE_SVG_PREVIEWS else tempdir / f'{letter}.svg'
            visible_height = trace_png(source, svg, tempdir)
            contours = parse_svg_contours(svg)
            glyph, advance = build_glyph(contours, letter, visible_height, font_units_per_pixel)
            name = 'glyph_' + letter
            glyphs[name] = glyph
            metrics[name] = (advance, SIDE_BEARING)
            cmap[ord(letter)] = name
            cmap[ord(letter.upper())] = name
            print(f'{letter}: {len(contours)} contour(s), visible height {visible_height}px, descender {DESCENDER_PIXELS.get(letter, 0)}px, advance {advance}')

    if len(glyphs) <= 2:
        raise SystemExit('No matching letter PNGs found.')

    fb = FontBuilder(UNITS_PER_EM, isTTF=True)
    fb.setupGlyphOrder(list(glyphs))
    fb.setupCharacterMap(cmap)
    fb.setupGlyf(glyphs)
    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(ascent=ASCENDER, descent=DESCENDER)
    fb.setupNameTable({
        'familyName': FONT_NAME,
        'styleName': 'Regular',
        'uniqueFontIdentifier': FONT_NAME + ' Regular',
        'fullName': FONT_NAME + ' Regular',
        'psName': re.sub(r'[^A-Za-z0-9-]', '', FONT_NAME) + '-Regular',
        'version': 'Version 1.0',
    })
    fb.setupOS2(sTypoAscender=ASCENDER, sTypoDescender=DESCENDER,
                usWinAscent=ASCENDER, usWinDescent=-DESCENDER,
                sCapHeight=CAP_HEIGHT, sxHeight=CAP_HEIGHT)
    fb.setupPost()
    fb.setupMaxp()
    output = ROOT / OUTPUT_TTF
    fb.save(str(output))
    print(f'\nSaved {output}')
    print(f'Assigned {len(cmap)-1} uppercase/lowercase character mappings.')


if __name__ == '__main__':
    main()
