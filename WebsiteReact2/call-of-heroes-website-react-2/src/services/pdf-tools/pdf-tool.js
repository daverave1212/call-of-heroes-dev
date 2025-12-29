import * as PDFLib from 'pdf-lib'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { downloadBytes, drawCropMarks, drawGuides, drawTextBlock, embedFontFromPath, embedImageFromPath, mmToPt } from './pdf-utils';
import fontkit from "@pdf-lib/fontkit";
import { hexColorToRgb01, normalizeSymbolConfigForPDF, parseTextWithSymbolsForPDF } from '../../utils';


function createPDFSettings(settings) {
    const {
        pageWidth,
        pageHeight,
        bleed,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        isDebug=false
    } = settings

    const bleedPt = mmToPt(bleed);

    const pageFullWidth = mmToPt(pageWidth + 2 * bleed);
    const pageFullHeight = mmToPt(pageHeight + 2 * bleed);

    return {
        ...settings,
        pageFullWidth,
        pageFullHeight,

        // inputs
        pageWidthMm: pageWidth,
        pageHeightMm: pageHeight,
        bleedMm: bleed,

        // core numbers (pt)
        bleed: bleedPt,


        // Media Box = biggest box, size of page on which they will print
        mediaX: 0, // TODO: The page size in the PDF preview is A4, which is weird. I don't see anywhere inside the PDF details an extra bleed or idk...
        mediaY: 0,
        mediaWidth: mmToPt(pageWidth + 2 * bleed),
        mediaHeight: mmToPt(pageHeight + 2 * bleed),

        // Bleed Box = a box up until where graphics can extend past the actual trim box
        bleedX: 0,
        bleedY: 0,                                      // Some print workflows use media bigger than bleed to include slug/marks area;
        bleedWidth: mmToPt(pageWidth + 2 * bleed),      // Can expand this later if needed.
        bleedHeight: mmToPt(pageHeight + 2 * bleed),

        // Crop Box = box to be displayed in a PDF viewer, pretty irrelevant for printing
        cropX: 0,
        cropY: 0,
        cropWidth:  mmToPt(pageWidth + 2 * bleed),
        cropHeight: mmToPt(pageHeight + 2 * bleed),

        // Trim Box = dimension of the finished page, smallest box
        trimX: bleedPt,
        trimY: bleedPt,
        trimWidth: mmToPt(pageWidth),
        trimHeight: mmToPt(pageHeight),

        marginTop: mmToPt(marginTop),
        marginBottom: mmToPt(marginBottom),
        marginLeft: mmToPt(marginLeft),
        marginRight: mmToPt(marginRight),

        isDebug
    };
}



export class XPDF {

    settings
    
    pdfDoc
    currentPage
    availableFonts = { 'Default': null }

    embeddedImages = {}

    constructor(settings) {
        this.settings = createPDFSettings(settings)
    }

    async init() {
        this.pdfDoc = await PDFDocument.create()
        await this.#loadFonts()
        return this
    }

    async #loadFonts() {
        this.pdfDoc.registerFontkit(fontkit);

        const cachedFonts = {}  // Map<src, font>
        
        const fontNames = Object.keys(this.settings.fonts)
        this.availableFonts = {}
        for (const fontName of fontNames) {
            const { path, size } = this.settings.fonts[fontName]
            cachedFonts[path] = cachedFonts[path] ?? await embedFontFromPath(this.pdfDoc, path)
            this.availableFonts[fontName] = {
                font: cachedFonts[path],
                size
            }
        }
    }

    newPage() {
        const settings = this.settings
        const page = this.pdfDoc.addPage([settings.pageFullWidth, settings.pageFullHeight])

        page.setMediaBox(settings.mediaX, settings.mediaY, settings.mediaWidth, settings.mediaHeight);
        page.setBleedBox(settings.bleedX, settings.bleedY, settings.bleedWidth, settings.bleedHeight);
        page.setTrimBox(settings.trimX, settings.trimY, settings.trimWidth, settings.trimHeight);
        page.setCropBox(settings.cropX, settings.cropY, settings.cropWidth, settings.cropHeight);

        this.currentPage = page

        // Crop marks ON
        // Dev-only visual guides (comment out for production)
        if (this.settings.isDebug) {
            drawCropMarks(page, settings);
            drawGuides(page, settings);
        }

        return this.currentPage
    }

    async download() {
        const bytes = await this.pdfDoc.save();
        downloadBytes(bytes, 'application/pdf', 'testpdf.pdf')
    }

    async attachToIFrame(iframe) {
        const pdfDataUri = await this.pdfDoc.saveAsBase64({ dataUri: true });
        iframe.src = pdfDataUri;
    }

    #getPDFNormalizedTokenSettings(token, { fontName, fontSize }) {

        if (token.tag == 'span') {
            const color = token.color == null? rgb(0, 0, 0): rgb(...hexColorToRgb01(token?.color ?? '#000000'))
            if (token.text == 'Evoke') {
                console.log({token, theColor: `${token?.color ?? '#000000'}`})
            }
            const usedFontName = fontName + (token.fontSuffix ?? '')
            const { font, size } = this.availableFonts[usedFontName]
            const width = font.widthOfTextAtSize(token.text, fontSize)
            return {
                text: token.text,
                width,
                font,
                fontName: usedFontName,
                color,
                fontSize
            }
        }
        if (token.tag == 'img') {
            return {
                src: token.src,
                width: fontSize,
                height: fontSize
            }
        }
    }

    #getPDFParagraphLines({tokensSettings, width}) {

        
        if (tokensSettings.length == 0) {   // An empty paragraph = an array of one line, which is empty
            return [[]]
        }
        
        const lines = []
        const firstToken = tokensSettings[0]
        let currentLine = [{
            ...firstToken,
            startX: 0,
            endX: firstToken.width
        }]
        const getLastToken = () => currentLine[currentLine.length - 1]

        for (let i = 1; i < tokensSettings.length; i++) {
            const token = tokensSettings[i]
            const thisWidth = token.width
            const thisX = getLastToken().endX
            if (thisX + thisWidth < width) {
                currentLine.push({
                    ...token,
                    startX: thisX,
                    endX: thisX + thisWidth
                })
            } else {
                lines.push(currentLine)
                currentLine = [{
                    ...token,
                    startX: 0,
                    endX: thisWidth
                }]
            }
        }
        lines.push(currentLine)
        return lines
    }
    #getPDFTextLinesWithSymbols({text, width, fontName, fontSize}) {
        const paragraphs = text.split('\n').map(str => str.trim())
        const parsedParagraphs = paragraphs.map(p => parseTextWithSymbolsForPDF(p))
        const paragraphsTokens = parsedParagraphs.map(tokens => tokens.map(token => normalizeSymbolConfigForPDF(token)))
        const paragraphsTokensSettings = paragraphsTokens.map(tokens => tokens.map(token => this.#getPDFNormalizedTokenSettings(token, { fontName, fontSize})))
        const paragraphLines = paragraphsTokensSettings.map(tokensSettings => this.#getPDFParagraphLines({ tokensSettings, width, fontSize }))
        const lines = paragraphLines.flat()
        console.log({
            paragraphs,
            parsedParagraphs,
            paragraphsTokens,
            paragraphsTokensSettings,
            paragraphLines,
            lines
        })
        return lines
    }

    async drawTextLinesWithSymbols(settings) {
        const {
            x,
            y,
            width,
            height, // optional
            text,
            fontName,
            fontSize,
            lineHeight,
            textAlign = "left"
        } = settings

        if (!text) {
            console.log({settings})
            throw `Null text given to drawTextBlock. Settings printed above.`
        }

        const maxLines = typeof height === "number" ? Math.max(0, Math.floor(height / lineHeight)) : Infinity;
        const allLines = this.#getPDFTextLinesWithSymbols({ text, width, fontName, fontSize })

        // --- Decide what to draw vs remainder ---
        const linesToDraw = allLines.slice(0, maxLines);
        const remainingLines = allLines.slice(maxLines);

        // --- Draw lines ---
        let cursorY = y;
        for (const tokens of linesToDraw) {

            if (tokens.length == 0) {
                cursorY -= lineHeight;
                continue;
            }

            const lastTokenOfThisLine = tokens[tokens.length - 1]
            const lineWidth = lastTokenOfThisLine.endX

            let drawX = x;
            if (textAlign === "center") {
                drawX = x + (width - lineWidth) / 2;
            } else if (textAlign === "right") {
                drawX = x + width - lineWidth;
            }

            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i]

                if (token.text != null) {
                    this.currentPage.drawText(token.text, {
                        x: drawX + token.startX,
                        y: cursorY - fontSize, // pdf-lib uses baseline
                        size: fontSize,
                        font: token.font,
                        color: token.color,
                    });
                }
                if (token.src != null) {
                    let imageObject = this.embeddedImages[token.src]
                    if (imageObject == null) {
                        this.embeddedImages[token.src] = await embedImageFromPath(this.pdfDoc, token.src)
                        imageObject = this.embeddedImages[token.src]
                    }
                    this.currentPage.drawImage(imageObject, {
                        x: drawX + token.startX,
                        y: cursorY - fontSize,
                        width: token.width,
                        height: token.height
                    })
                }

            }

            cursorY -= lineHeight;
        }

        const heightDrawn = linesToDraw.length * lineHeight;

        // Return remainder lines:
        return { height: heightDrawn, remainingLines };
    }
}

export async function testPDF(iframe) {
    const xpdf = new XPDF({
        isDebug: true,

        pageWidth: 210,
        pageHeight: 297,
        bleed: 3,
        marginTop: 18,
        marginBottom: 22,
        marginLeft: 18,
        marginRight: 18,

        // fonts: {
        //     'TextFont': '/fonts/LinuxLibertine/LinLibertine_R.ttf',
        //     'TextFontItalic': '/fonts/LinuxLibertine/LinLibertine_RI.ttf',
        //     'TextFontBold': '/fonts/LinuxLibertine/LinLibertine_RB.ttf',
        //     'HomeFont': '/fonts/RobotoCondensed/RobotoCondensed-Regular.ttf'
        // }

        fonts: {
            'TextFont': {
                path: '/fonts/LinuxLibertine/LinLibertine_R.ttf',
                size: 10.5
            },
            'TextFontItalic': {
                path: '/fonts/LinuxLibertine/LinLibertine_RI.ttf',
                size: 10.5
            },
            'TextFontBold': {
                path: '/fonts/LinuxLibertine/LinLibertine_RB.ttf',
                size: 10.5
            },
            'HomeFont': {
                path: '/fonts/RobotoCondensed/RobotoCondensed-Regular.ttf',
                size: 10.5
            },
        }

    })
    await xpdf.init()

    const page = xpdf.newPage()

    await xpdf.drawTextLinesWithSymbols({
        text: `Choose {Gold}yourself.
        Heal the chosen Unit for 1d8 for each 10 Health it is missing, and all Units within 2 meters of it for half the final amount just Healed.

        {Brown('Water:')} For each 7 Health missing instead.
        {Brown('Earth:')} Choose any Unit instead.`,
        // text: `
        //     Lorem ^ipsum dol^ or sit {Evoke} amet et _pluribus quae mucho dolor_ sit hic est.

        //     Estas espanya.
        // `,
        fontName: 'TextFont',
        fontSize: 18,
        x: 0,
        y: mmToPt(200),
        lineHeight: 14,
        width: mmToPt(60),
        // height: mmToPt(30)
    })

    xpdf.attachToIFrame(iframe)



    return
    const font = await xpdf.pdfDoc.embedFont(StandardFonts.TimesRoman);
    const margin = mmToPt(12);
    const x = xpdf.settings.cropX + margin;
    const topY = xpdf.settings.cropY + xpdf.settings.cropHeight - margin;

    page.drawText("RPG Class: The Example Knight", {
        x: 0,
        y: 0,
        size: 18,
        font,
        color: rgb(0, 0, 0),
    });

    drawTextBlock(page, {
        text: `Sample text goes here. This is inside the TRIM box.


            Next we’ll add helpers for paragraphs, stat blocks, and image placement with a 300 DPI check based on print size.`,
        font,
        fontSize: 18,
        x: 0,
        y: topY - mmToPt(10) - 18,
        color: rgb(0, 0, 0),
        lineHeight: 14,
        width: mmToPt(60),
        height: mmToPt(30)
    })


    xpdf.attachToIFrame(iframe)

}

