import * as PDFLib from 'pdf-lib'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { downloadBytes, drawCropMarks, drawGuides, drawTextBlock, embedFontFromPath, mmToPt } from './pdf-utils';
import fontkit from "@pdf-lib/fontkit";


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

    constructor(settings) {
        this.settings = createPDFSettings(settings)
    }

    async init() {
        this.pdfDoc = await PDFDocument.create()
        await this.#loadFonts()
        return this
    }

    async #loadFonts() {
        console.log('Registering fontkit...')
        this.pdfDoc.registerFontkit(fontkit);
        console.log('Done')
        const fontNames = Object.keys(this.settings.fonts)
        this.availableFonts = {}
        for (const fontName of fontNames) {
            const font = await embedFontFromPath(this.pdfDoc, this.settings.fonts[fontName])
            this.availableFonts[fontName] = font
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

        fonts: {
            'TextFont': '/fonts/LinuxLibertine/LinLibertine_R.ttf',
            'HomeFont': '/fonts/RobotoCondensed/RobotoCondensed-Regular.ttf'
        }
    })
    await xpdf.init()

    const page = xpdf.newPage()


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


// export async function testPDF(iframe, { isDebug } = { isDebug: false }) {
//     // Minimal inputs in mm (you said “normal A4 values in mm”)
//     // If you want your custom 210x297 but different, change pageWidth/pageHeight.
//     const settings = createPDFSettings({
//         pageWidth: 210,
//         pageHeight: 297,
//         bleed: 3,
//         marginTop: 18,
//         marginBottom: 22,
//         marginLeft: 18,
//         marginRight: 18,
//     });

//     const pdfDoc = await PDFDocument.create();

//     // Media/page size = full size (trim + bleed*2)
//     const page = pdfDoc.addPage([settings.pageFullWidth, settings.pageFullHeight]);

//     // Set page boxes.
//     // In this simplified model:
//     // - MediaBox == BleedBox == full page
//     // - TrimBox is inset by bleed
//     page.setMediaBox(settings.mediaX, settings.mediaY, settings.mediaWidth, settings.mediaHeight);
//     page.setBleedBox(settings.bleedX, settings.bleedY, settings.bleedWidth, settings.bleedHeight);
//     page.setTrimBox(settings.trimX, settings.trimY, settings.trimWidth, settings.trimHeight);
//     page.setCropBox(settings.cropX, settings.cropY, settings.cropWidth, settings.cropHeight);

//     const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

//     // Sample content placed inside trim
//     const margin = mmToPt(12);
//     const x = settings.cropX + margin;
//     const topY = settings.cropY + settings.cropHeight - margin;

//     page.drawText("RPG Class: The Example Knight", {
//         x,
//         y: topY,
//         size: 18,
//         font,
//         color: rgb(0, 0, 0),
//     });

//     page.drawText(
//         "Sample text goes here. This is inside the TRIM box.\n" +
//         "Next we’ll add helpers for paragraphs, stat blocks, and image placement\n" +
//         "with a 300 DPI check based on print size.",
//         {
//         x,
//         y: topY - mmToPt(10) - 18,
//         size: 11,
//         font,
//         color: rgb(0, 0, 0),
//         lineHeight: 14,
//         maxWidth: settings.cropWidth - 2 * margin,
//         }
//     );

//     // Crop marks ON
//     drawCropMarks(page, settings);

//     // Dev-only visual guides (comment out for production)
//     drawGuides(page, settings);

//     // Render to a given iframe
//     const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
//     iframe.src = pdfDataUri;

//     // Download
//     // const bytes = await pdfDoc.save();
//     // downloadBytes(bytes, 'application/pdf', 'testpdf.pdf')
// }


