
/* This is a standalone JavaScript file that handles all the functionality for an "ability sheets" page */
/* It does not import anything */
/* It uses some old JS syntax */
/* The only export is CanvasManager, which only has 2 functions */


/* --------------------------- UTILS --------------------------- */

function createImage(src){
    var img = document.createElement("img");
    img.setAttribute("src", src);
    return img;
}
function drawTextOnCanvas(t, x, y, canvas, font, textAlign) {
    const ctx = canvas.getContext('2d')
    const align = ctx.textAlign
    ctx.fillStyle = "black";
    ctx.textAlign = textAlign ?? 'left'
    if (font != null) canvas.getContext("2d").font = font;
    canvas.getContext("2d").fillText(t, x, y);
    ctx.textAlign = align
}
function drawImageOnCanvas(imgpath, x, y, canvas, w, h){
    var img = createImage(imgpath);
    img.onload = function() {
        canvas.getContext("2d").drawImage(img, x, y, w, h);
    }
}
function getCanvasTextWidth(Text, Canvas, Font) {
    const ctx = Canvas.getContext('2d')
    const fontBackup = ctx.font
    ctx.font = Font ?? ctx.font
    const result =  Canvas.getContext("2d").measureText(Text).width
    ctx.font = fontBackup
    return result
}
  
function TextBox(X, Y, MaxWidth, Font, Canvas, LineHeight, FillStyle){
    this.canvas = Canvas;
    this.context = Canvas.getContext("2d");
    
    this.lines = new Array();
    this.nLines = 0;
    this.w = MaxWidth;
    this.h = 0;
    this.x = X;
    this.y = Y;
    this.lineSpacing = 20; if(LineHeight) this.lineSpacing = LineHeight;
    this.font = Font;
    this.fillStyle = FillStyle
    this.text = "";
    
    
    this.setText = function(t){
        var wordList = t.split(" ");
        var currentLine = 0;
        var currentWord = 0;
        this.nLines = 0;
        this.text = t;
        while(currentWord < wordList.length - 1){
            this.nLines++;
            this.lines[currentLine] = "";
            var isFirstWordOfLine = true;
            while(getCanvasTextWidth(this.lines[currentLine] + " " + wordList[currentWord], this.canvas, this.font) < this.w && wordList[currentWord] != "NL" && currentWord < wordList.length){
                if(isFirstWordOfLine){
                    isFirstWordOfLine = false;}
                else{
                    this.lines[currentLine] += " ";}
                this.lines[currentLine] += wordList[currentWord];
                currentWord++;}
            currentLine++;
            if(wordList[currentWord] == "NL"){
                currentWord++;}}
        this.h = this.lineSpacing * (1 + this.nLines);}
    
    this.draw = function() {
        const fontBackup = this.context.font
        this.context.font = Font;
        const fillStyleBackup = this.context.fillStyle
        if (this.fillStyle) {
            this.context.fillStyle = this.fillStyle
        }
        for(var i = 0; i<this.nLines; i++) {
            this.context.fillText(this.lines[i], this.x, this.y + i * this.lineSpacing);
        }
        this.context.font = fontBackup
        if (this.fillStyle) {
            this.context.fillStyle = fillStyleBackup
        }
    }
}
function drawRoundRect(canvas, x, y, width, height, radius, fill, stroke, thickness) {
    var ctx = canvas.getContext("2d");
    if (typeof stroke == 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }

    const thicknessBackup = Constants.getCanvas().getContext("2d").lineWidth
    Constants.getCanvas().getContext("2d").lineWidth = thickness

    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill != null) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke != null) {
        ctx.strokeStyle = stroke;
        ctx.stroke();
    }

    Constants.getCanvas().getContext("2d").lineWidth = thicknessBackup

}



/* --------------------------- THE ACTUAL SCRIPT --------------------------- */

const Constants = {
    canvasWidth			: 2480,
    canvasHeight		: 3508,

    columnWidth			: 1175,
    columnPaddingSide	: 30,
    columnPaddingTop	: 30,
    columnPaddingMiddle	: 15,
    getSpellBoxWidth	: () => Constants.columnWidth - Constants.columnPaddingSide - Constants.columnPaddingMiddle,

    iconBoxWidth		: 300,
    iconWidth			: 200,
    iconPaddingSide		: 50,
    iconPaddingTop		: 50,

    textBoxMaxWidth		: 850,
    textBoxPaddingBottom: 0,

    tagsPaddingTop		: 55,
    tagsPaddingBottom	: 45,

    titlePaddingTop 	: 65,
    titleFont			: "55px IskoolaPota",
    titlePaddingLeft	: 650,

    font				: "40px IskoolaPota",
    upgradeFont			: "35px IskoolaPota",
    notesFont			: "italic 35px IskoolaPota",
    lineHeight			: 40,

    backgroundColor		: "#FFFFFF",
    strokeColor			: "#222020",
    borderRadius		: 2,
    borderThickness		: 6,

    currentCanvas       : null,
    canvasID			: "Canvas",
    getCanvas			: function() {
        return Constants.currentCanvas;
    }
}

function getPngName(abilityName) {
    return abilityName.split(' ').join('_') + '.png'
}

class SpellBox {
    constructor(spell, x, y) {
        this.x = x;
        this.y = y;
        this.spell = spell;

        // Title positions calculations
        const nTags = 0 +
            (spell.A ? 1 : 0) +
            (spell.Cost ? 1 : 0) +
            (spell.Range ? 1 : 0) +
            (spell.Duration ? 1 : 0) +
            (spell.Cooldown ? 1 : 0)
        this.titleBorderX = this.x + Constants.iconPaddingSide + Constants.iconWidth
        this.titleBorderY = this.y + Constants.titlePaddingTop
        this.titleBorderWidth = Constants.columnWidth - Constants.columnPaddingSide * 2 - Constants.iconBoxWidth
        this.titleBorderHeight = Constants.lineHeight * 2.5
        this.titleY = this.titleBorderY + (this.titleBorderHeight + Constants.lineHeight) / 2;
        
        const tagsHeight = nTags * Constants.lineHeight
        this.upperSideHeight = Math.max(
            Constants.titlePaddingTop + this.titleBorderHeight + Constants.tagsPaddingTop + tagsHeight + Constants.tagsPaddingBottom,
            Constants.iconPaddingTop + Constants.iconWidth + Constants.iconPaddingTop
        )

        // Text Box
        const textBoxesX = this.x + Constants.iconPaddingSide
        const textBoxesWidth = Constants.columnWidth - Constants.iconPaddingSide * 2

        this.spellBoxDescription = new TextBox(textBoxesX, this.y + this.upperSideHeight, textBoxesWidth, Constants.font, Constants.getCanvas(), Constants.lineHeight);
        this.spellBoxDescription.setText(spell.Effect)

        if (this.spell.Upgrade) {
            this.upgradeBox = new TextBox(textBoxesX, this.spellBoxDescription.y + this.spellBoxDescription.h, textBoxesWidth, Constants.upgradeFont, Constants.getCanvas(), Constants.lineHeight)
            this.upgradeBox.setText(spell.Upgrade)
        }

        if (this.spell.Notes) {
            const notesBoxY = this.spell.Upgrade? this.upgradeBox.y + this.upgradeBox.h : (this.spellBoxDescription.y + this.spellBoxDescription.h)
            this.notesBox = new TextBox(textBoxesX, notesBoxY, textBoxesWidth, Constants.notesFont, Constants.getCanvas(), Constants.lineHeight, 'gray')
            this.notesBox.setText(spell.Notes)
        }
        
        const totalHeight =
            this.upperSideHeight +
            this.spellBoxDescription.h +
            (this.spell.Upgrade? this.upgradeBox.h : 0) +
            (this.spell.Notes? this.notesBox.h : 0) +
            Constants.textBoxPaddingBottom

        this.height = totalHeight > 350? totalHeight: 350

    }

    draw() {

        const canvas = Constants.getCanvas()
        
        // Borders
        drawRoundRect(canvas, this.x, this.y, Constants.columnWidth, this.height, Constants.borderRadius, Constants.backgroundColor, Constants.strokeColor, Constants.borderThickness);
        const b2Offset = 10
        drawRoundRect(canvas, this.x + b2Offset, this.y + b2Offset, Constants.columnWidth - b2Offset * 2, this.height - b2Offset * 2, Constants.borderRadius, Constants.backgroundColor, Constants.strokeColor, Constants.borderThickness);
        
        // Icon
        const iconPath = CanvasManager.getIconPathByName(this.spell.Name)
        drawImageOnCanvas(iconPath, this.x + Constants.iconPaddingSide, this.y + Constants.iconPaddingTop, canvas, Constants.iconWidth, Constants.iconWidth);
        const iconBorderPadding = 5
        drawRoundRect(canvas, this.x + Constants.iconPaddingSide - iconBorderPadding, this.y + Constants.iconPaddingTop - iconBorderPadding, Constants.iconWidth + iconBorderPadding * 2, Constants.iconWidth + iconBorderPadding * 2, 1, null, "black", 3);

        // Title
        drawTextOnCanvas(this.spell.Name, this.x + Constants.titlePaddingLeft, this.titleY, Constants.getCanvas(), Constants.titleFont, 'center');
        drawRoundRect(canvas, this.titleBorderX + iconBorderPadding, this.titleBorderY, this.titleBorderWidth, this.titleBorderHeight, 1, null, 'black', 3)
        const pad = 6
        drawRoundRect(canvas, this.titleBorderX + iconBorderPadding, this.titleBorderY + pad, this.titleBorderWidth - pad, this.titleBorderHeight - pad * 2, 4, null, 'black', 2)

        // Properties
        const tagsX = this.x + Constants.iconBoxWidth
        const tagsY = this.y + Constants.titlePaddingTop + this.titleBorderHeight + Constants.tagsPaddingTop
        let currentTagIndex = 0
        const tryDrawTag = tagName => {
            if (this.spell[tagName] != null) {
                drawTextOnCanvas(this.spell[tagName], tagsX, tagsY + currentTagIndex * Constants.lineHeight, Constants.getCanvas(), Constants.font)
                currentTagIndex += 1
            }
        }
        
        tryDrawTag('A')
        tryDrawTag('Cost')
        tryDrawTag('Range')
        tryDrawTag('Duration')
        tryDrawTag('Cooldown')

        // Description
        this.spellBoxDescription.draw();
        if (this.spell.Upgrade) {
            this.upgradeBox.draw();
        }
        if (this.spell.Notes) {
            this.notesBox.draw();
        }
    }
}

var canvasCounter = 0;
function A4Canvas() {
    this.canvas	= document.createElement("canvas");
    Constants.currentCanvas = this.canvas
    CanvasManager.canvasesParentDiv.appendChild(this.canvas);

    const ctx = this.canvas.getContext('2d')
    const fillBackup = ctx.fillStyle
    this.canvas.setAttribute("width", Constants.canvasWidth);
    this.canvas.setAttribute("height", Constants.canvasHeight);
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.fillStyle = fillBackup
    
    this.currentSide = "LEFT";	// or "RIGHT"
    this.spellToDrawX = Constants.columnPaddingSide;
    this.spellToDrawY = Constants.columnPaddingTop;
    
    this.spellsLeft = new Array();
    this.spellsRight = new Array();
    this.switchSide = function() {
        this.currentSide = "RIGHT";
        this.spellToDrawX = Constants.columnWidth + Constants.columnPaddingMiddle + Constants.columnPaddingSide;
        this.spellToDrawY = Constants.columnPaddingTop;
    }
    this.addSpell = function(spell) {
        console.log("Adding " + spell.name);
        var s = new SpellBox(spell, this.spellToDrawX, this.spellToDrawY);
        if (this.spellToDrawY + s.height > Constants.canvasHeight) {
            if (this.currentSide == "LEFT") {
                console.log("No more space on this side");
                this.switchSide();
                return "SWITCH";
            } else if (this.currentSide == "RIGHT") {
                return "NOSPACE";
            }
        } else {
            s.draw();
            this.spellToDrawY += s.height + Constants.titlePaddingTop;
            return "ADDED";
        }
    }
}

            
export const CanvasManager = {
    a4Canvases: [],
    canvasesParentDiv: null,
    setCanvasesParent: function(div) {
        CanvasManager.canvasesParentDiv = div
    },
    getIconPathByName: null,
    setIconPathGetter: function(getIconPathByName) {
        CanvasManager.getIconPathByName = getIconPathByName
    },
    addSpell: function(spell){
        console.log({spell})
        if(CanvasManager.a4Canvases.length == 0){CanvasManager.a4Canvases.push(new A4Canvas());}
        var result = CanvasManager.a4Canvases[CanvasManager.a4Canvases.length - 1].addSpell(spell);
        if(result == "ADDED"){/* Good for you! */}
        else if(result == "SWITCH"){
            CanvasManager.a4Canvases[CanvasManager.a4Canvases.length - 1].switchSide();
            CanvasManager.a4Canvases[CanvasManager.a4Canvases.length - 1].addSpell(spell);}
        else if(result == "NOSPACE"){
            CanvasManager.a4Canvases.push(new A4Canvas());
            CanvasManager.a4Canvases[CanvasManager.a4Canvases.length - 1].addSpell(spell);}
    },
    clear: function() {
        this.a4Canvases = []
        this.canvasesParentDiv.innerHTML = ''
    }
}

