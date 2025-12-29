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
      y,
      width,
      height,
      borderWidth: 1,
      borderColor: rgb(1, 0, 0),
    });
  }