import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export function mmToPt(mm) { return mm * 72 / 25.4 }
window.mmToPt = mmToPt
export function downloadBytes(bytes, type, name) {
    const blob = new Blob([bytes], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
}

export function drawCropMarks(page, settings) {
    const { cropX, cropY, cropWidth, cropHeight, bleed } = settings;

    // You can tune these:
    const lengthPt = mmToPt(4); // how long the mark extends
    const gapPt = mmToPt(1);    // small gap away from the trim edge
    const lw = 1.6;             // stroke thickness in pt
    const c = rgb(0, 0, 0);

    const left = cropX;
    const right = cropX + cropWidth;
    const bottom = cropY;
    const top = cropY + cropHeight;

    // Safety: if bleed is tiny, don't accidentally place marks outside the page.
    // (In your default 3mm bleed this is fine.)
    const safeGap = Math.min(gapPt, Math.max(0, bleed - mmToPt(0.2)));

    // bottom-left
    page.drawLine({
        start: { x: left - safeGap - lengthPt, y: bottom },
        end:   { x: left - safeGap,            y: bottom },
        thickness: lw, color: c
    });
    page.drawLine({
        start: { x: left, y: bottom - safeGap - lengthPt },
        end:   { x: left, y: bottom - safeGap },
        thickness: lw, color: c
    });

    // bottom-right
    page.drawLine({
        start: { x: right + safeGap,            y: bottom },
        end:   { x: right + safeGap + lengthPt, y: bottom },
        thickness: lw, color: c
    });
    page.drawLine({
        start: { x: right, y: bottom - safeGap - lengthPt },
        end:   { x: right, y: bottom - safeGap },
        thickness: lw, color: c
    });

    // top-left
    page.drawLine({
        start: { x: left - safeGap - lengthPt, y: top },
        end:   { x: left - safeGap,            y: top },
        thickness: lw, color: c
    });
    page.drawLine({
        start: { x: left, y: top + safeGap },
        end:   { x: left, y: top + safeGap + lengthPt },
        thickness: lw, color: c
    });

    // top-right
    page.drawLine({
        start: { x: right + safeGap,            y: top },
        end:   { x: right + safeGap + lengthPt, y: top },
        thickness: lw, color: c
    });
    page.drawLine({
        start: { x: right, y: top + safeGap },
        end:   { x: right, y: top + safeGap + lengthPt },
        thickness: lw, color: c
    });
}

// Optional dev helper: visualize boxes (remove later)
export function drawGuides(page, s) {
  // Trim (final cut) - draw this no matter what
  page.drawRectangle({
    x: s.trimX,
    y: s.trimY,
    width: s.trimWidth,
    height: s.trimHeight,
    borderWidth: 0.8,
    borderColor: rgb(0.9, 0.6, 0.6),
  });

  // Bleed - only useful if different from media
  page.drawRectangle({
    x: s.bleedX,
    y: s.bleedY,
    width: s.bleedWidth,
    height: s.bleedHeight,
    borderWidth: 0.5,
    borderColor: rgb(0.7, 0.7, 0.7),
  });

  // Media - optional, often same as bleed in your model
  page.drawRectangle({
    x: s.mediaX,
    y: s.mediaY,
    width: s.mediaWidth,
    height: s.mediaHeight,
    borderWidth: 0.5,
    borderColor: rgb(0.9, 0.3, 0.3),
  });
}

function getPDFParagraphLines({font, text, width, fontSize}) {
    const spaceWidth = font.widthOfTextAtSize(' ', fontSize)
    const words = text.trim().split(/\s+/)
    const lines = []
    
    if (words.length == 0) {
        return []
    }

    let currentLine = [{
        word: words[0],
        startX: 0,
        endX: font.widthOfTextAtSize(words[0], fontSize)
    }]
    const getLastWord = () => currentLine[currentLine.length - 1]

    for (let i = 1; i < words.length; i++) {
        const word = words[i]
        const thisWidth = font.widthOfTextAtSize(word, fontSize)
        const thisX = getLastWord().endX + spaceWidth
        if (thisX + thisWidth < width) {
            currentLine.push({
                word,
                startX: thisX,
                endX: thisX + thisWidth
            })
        } else {
            lines.push(currentLine)
            currentLine = [{
                word,
                startX: 0,
                endX: thisWidth
            }]
        }
    }
    lines.push(currentLine)
    return lines
}
function getPDFTextLines({font, text, width, fontSize}) {
    return text
        .split('\n')
        .map(p => p.trim())
        .map(p => getPDFParagraphLines({ text: p, font, width, fontSize }))
        .flat()

}


export function drawTextBlock(
    page,
    settings
) {

    const {
        font,
        x,
        y,
        width,
        height, // optional
        text,
        fontSize,
        lineHeight,
        textAlign = "left",
        color = rgb(0, 0, 0),
    } = settings
    
    if (!text) {
        console.log({settings})
        throw `Null text given to drawTextBlock. Settings printed above.`
    }

    // How many lines can we draw?
    const maxLines = typeof height === "number" ? Math.max(0, Math.floor(height / lineHeight)) : Infinity;
    const allLines = getPDFTextLines({ font, text, width, fontSize })

    // --- Decide what to draw vs remainder ---
    const linesToDraw = allLines.slice(0, maxLines);
    const remainingLines = allLines.slice(maxLines);

    // --- Draw lines ---
    let cursorY = y;
    for (const line of linesToDraw) {
        // Blank line: just advance
        if (line === "") {
            cursorY -= lineHeight;
            continue;
        }

        const lastWordOfThisLine = line[line.length - 1]
        const lineWidth = lastWordOfThisLine.endX;

        let drawX = x;
        if (textAlign === "center") {
            drawX = x + (width - lineWidth) / 2;
        } else if (textAlign === "right") {
            drawX = x + width - lineWidth;
        }

        for (let i = 0; i < line.length; i++) {
            const wordToken = line[i]
            page.drawText(wordToken.word, {
                x: drawX + wordToken.startX,
                y: cursorY - fontSize, // pdf-lib uses baseline
                size: fontSize,
                font,
                color,
            });
        }


        cursorY -= lineHeight;
    }

    const heightDrawn = linesToDraw.length * lineHeight;

    // Rebuild remainder string:
    // Join remaining lines with '\n'. This preserves blank lines.
    // Trim only trailing newlines introduced by wrapping, not original content.
    const remainderString = remainingLines.map(line => line.map(tokens => tokens.word).join(' ')).join("\n");

    return { height: heightDrawn, remainderString };
}

export async function embedFontFromPath(pdfDoc, path) {
    const fontBytes = await fetch(path).then(res => res.arrayBuffer())
    const font = await pdfDoc.embedFont(fontBytes, {
        subset: true
    })
    return font
}

export async function embedImageFromPath(pdfDoc, path) {
    const imageBytes = await fetch(path).then(res => res.arrayBuffer())
    const image = await pdfDoc.embedPng(imageBytes)
    return image
}

export function drawTestSquare(page, x, y, width, height) {
    page.drawRectangle({
      x,
      y: y - height,
      width,
      height,
      borderWidth: 1,
      borderColor: rgb(1, 0, 0),
    });
  }



/** Load an image from URL (src). */
function loadHtmlImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // helpful if you host assets properly
        img.onload = () => resolve(img);
        img.onerror = msg => {
            console.error(msg)
            reject(msg)
        }
        img.src = src;
    });
}
export async function drawImageFromSrc({ pdfDoc, page, src, x, y, width, height }) {
    if (width == null && height == null) {
        throw new Error("Either width or height must be provided");
    }
    
    const bytes = await fetch(src).then(r => r.arrayBuffer());

    const image = src.toLowerCase().endsWith(".jpg") || src.toLowerCase().endsWith(".jpeg")
        ? await pdfDoc.embedJpg(bytes)
        : await pdfDoc.embedPng(bytes);
    
    // Original image size (in pixels)
    const imgW = image.width;
    const imgH = image.height;
    const aspect = imgW / imgH;

    let drawW = width;
    let drawH = height;
    
      // Auto-calculate missing dimension
    if (drawW == null) {
        drawW = drawH * aspect;
    } else if (drawH == null) {
        drawH = drawW / aspect;
    }
    
    page.drawImage(image, {
        x,
        y: y - drawH, // top-down
        width: drawW,
        height: drawH,
    });
    
    return { width: drawW, height: drawH };
}
async function rasterizeScaledImageToCanvas(src, scale = 1) {
    const img = await loadHtmlImage(src);
  
    const sw = Math.max(1, Math.round(img.naturalWidth * scale));
    const sh = Math.max(1, Math.round(img.naturalHeight * scale));
  
    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = sh;
  
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true; // smoother upscale/downscale
    ctx.drawImage(img, 0, 0, sw, sh);
  
    return { canvas, sw, sh };
  }
  
async function cropCanvasToPngBytes(canvas, sx, sy, sw, sh) {
    const out = document.createElement("canvas");
    out.width = Math.max(1, Math.floor(sw));
    out.height = Math.max(1, Math.floor(sh));
  
    const ctx = out.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, sx, sy, sw, sh, 0, 0, out.width, out.height);
  
    const blob = await new Promise((resolve) => out.toBlob(resolve, "image/png"));
    const buf = await blob.arrayBuffer();
    return new Uint8Array(buf);
}

/** Crop a region from an HTMLImageElement and return PNG bytes (Uint8Array). */
async function cropToPngBytes(img, sx, sy, sw, sh) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(sw));
    canvas.height = Math.max(1, Math.floor(sh));
    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const buf = await blob.arrayBuffer();
    return new Uint8Array(buf);
}

/** Draw image using TOP-DOWN y anchor (x,y is top-left). */
function drawImageTopDown(page, image, x, yTop, width, height) {
    page.drawImage(image, {
        x,
        y: yTop - height, // convert to PDF bottom-left anchor
        width,
        height,
    });
}

async function sliceBorderImage({ src, borderThickness, scale = 1 }) {
    const { canvas, sw, sh } = await rasterizeScaledImageToCanvas(src, scale);
  
    const t = Math.round(borderThickness * scale); // thickness in *scaled pixels*
  
    if (t <= 0) throw new Error("borderThickness must be > 0");
    if (t * 2 > sw || t * 2 > sh) {
      throw new Error(
        `Border thickness too large after scaling. ` +
        `scaledImage=${sw}x${sh}, thickness=${t}`
      );
    }
  
    // corners
    const tl = await cropCanvasToPngBytes(canvas, 0, 0, t, t);
    const tr = await cropCanvasToPngBytes(canvas, sw - t, 0, t, t);
    const bl = await cropCanvasToPngBytes(canvas, 0, sh - t, t, t);
    const br = await cropCanvasToPngBytes(canvas, sw - t, sh - t, t, t);
  
    // edge samples from the center of each edge (t x t)
    const topX = Math.floor((sw - t) / 2);
    const leftY = Math.floor((sh - t) / 2);
  
    const top = await cropCanvasToPngBytes(canvas, topX, 0, t, t);
    const bottom = await cropCanvasToPngBytes(canvas, topX, sh - t, t, t);
    const left = await cropCanvasToPngBytes(canvas, 0, leftY, t, t);
    const right = await cropCanvasToPngBytes(canvas, sw - t, leftY, t, t);
  
    return { tl, tr, bl, br, top, bottom, left, right, thicknessPxScaled: t };
}

export async function drawImageBorder9Slice({
    pdfDoc,
    page,
    src,
    x,
    y,
    width,
    height,
    borderThickness,
    scale = 1,
    drawThickness = 7, // pt
  }) {
    if (typeof drawThickness !== "number" || drawThickness <= 0) {
      throw new Error("drawThickness (pt) must be a positive number");
    }
  
    // Slice based on: scale the base image first, then take thickness*scale px slices
    const slices = await sliceBorderImage({ src, borderThickness, scale });
  
    // Embed slices
    const tl = await pdfDoc.embedPng(slices.tl);
    const tr = await pdfDoc.embedPng(slices.tr);
    const bl = await pdfDoc.embedPng(slices.bl);
    const br = await pdfDoc.embedPng(slices.br);
  
    const top = await pdfDoc.embedPng(slices.top);
    const bottom = await pdfDoc.embedPng(slices.bottom);
    const left = await pdfDoc.embedPng(slices.left);
    const right = await pdfDoc.embedPng(slices.right);
  
    // The drawn border thickness on the PDF (pt)
    const t = drawThickness;
  
    if (width < 2 * t || height < 2 * t) {
      throw new Error(
        `Border rect too small for drawThickness. Need width/height >= 2*drawThickness. ` +
        `width=${width}, height=${height}, drawThickness=${t}`
      );
    }
  
    const innerW = width - 2 * t;
    const innerH = height - 2 * t;
  
    // top-down coordinates:
    // outer rect top = y
    // outer rect bottom = y - height
    const bottomCornerTopY = y - height + t; // top Y of bottom corners/edge strip
    const verticalEdgesTopY = y - t;         // top Y of left/right edge strip
  
    // Corners (each t x t)
    drawImageTopDown(page, tl, x, y, t, t);
    drawImageTopDown(page, tr, x + width - t, y, t, t);
    drawImageTopDown(page, bl, x, bottomCornerTopY, t, t);
    drawImageTopDown(page, br, x + width - t, bottomCornerTopY, t, t);
  
    // Edges (stretched)
    drawImageTopDown(page, top, x + t, y, innerW, t);
    drawImageTopDown(page, bottom, x + t, bottomCornerTopY, innerW, t);
    drawImageTopDown(page, left, x, verticalEdgesTopY, t, innerH);
    drawImageTopDown(page, right, x + width - t, verticalEdgesTopY, t, innerH);
  
    return { drawThicknessPt: t, innerW, innerH, sampledThicknessPx: slices.thicknessPxScaled };
}