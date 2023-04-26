function drawTextOnCanvas(t, x, y, canvas, font){
    if(font != null) canvas.getContext("2d").font = font;
    canvas.getContext("2d").fillText(t, x, y);
}

function drawImageOnCanvas(imgpath, x, y, canvas, w, h){
    var img = createImage(imgpath);
    img.onload = function(){canvas.getContext("2d").drawImage(img, x, y, w, h);}
}

function getCanvasTextWidth(Text, Canvas){return Canvas.getContext("2d").measureText(Text).width;}
function getCanvasTextHeight(Text, Canvas){return Canvas.getContext("2d").measureText(Text).height;}
    
// Creates a text box (wraps text automatically) in a canvas.
// Use as:
/*
    const textBox = new TextBox(50, 50, 400, "40px TextFont", canvasObject, 40)
    textBox.setText("This is some sample text that will wrap around")
    textBox.draw()  // Draws it at the given X and Y

    // You can get the height of the text box (even before drawing) with:
    textBox.nLines * textBox.lineSpacing
*/
function TextBox(X, Y, MaxWidth, Font, Canvas, LineHeight){
    this.canvas = Canvas;
    this.context = Canvas.getContext("2d");
    this.context.font = Font;
    
    this.lines = new Array();
    this.nLines = 0;
    this.w = MaxWidth;
    this.h = 0;
    this.x = X;
    this.y = Y;
    this.lineSpacing = 20; if(LineHeight) this.lineSpacing = LineHeight;
    this.font = Font;
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
            while(getCanvasTextWidth(this.lines[currentLine] + " " + wordList[currentWord], this.canvas) < this.w && wordList[currentWord] != "NL" && currentWord < wordList.length){
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
    
    this.draw = function(){
        for(var i = 0; i<this.nLines; i++){
            this.context.fillText(this.lines[i], this.x, this.y + i * this.lineSpacing);}}
}


function drawRoundRect(canvas, x, y, width, height, radius, fill, stroke) {
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

}