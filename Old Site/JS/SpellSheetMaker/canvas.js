

	var K = {
		canvasWidth			: 2480,
		canvasHeight		: 3508,
		columnWidth			: 1175,
		columnPaddingSide	: 30,
		columnPaddingTop	: 30,
		columnPaddingMiddle	: 15,
		iconBoxWidth		: 300,
		iconWidth			: 200,
		iconPaddingSide		: 50,
		iconPaddingTop		: 50,
		textBoxMaxWidth		: 850,
		textBoxPaddingTop 	: 25,
		font				: "45px defaultFont",
		lineHeight			: 45,
		backgroundColor		: "#FFFFFF",
		strokeColor			: "#222020",
		titleFont			: "45px defaultFont",
		canvasID			: "Canvas",
		getCanvas			: function(){return get(K.canvasID);}
	}

	function parseComponents(str){
		if(str.length > 7){
			return substringTo(str, 6)
		}
		return str
	}
	
	
	
	function addSpell(s){	// Spell object from Spells.js
		Spells[s.name] = s
		SpellNames.push(s.name)
		s.spellBox = null;
	}
	
	
	
	const notEmpty = str => str != null && str.length > 0
		
	var __testSpell = {
		name : "Default",
		A : "0 Actions",
		Cost : "2",
		Range : "3 meters",
		Duration : "1 minute",
		Effect : "This spell does nothing.",
		Extra : "Nothing special"
	}

	function SpellBox(spell, x, y){
		spell.spellBox = this;
		this.x = x;
		this.y = y;
		let nTitleRows 	= 5	// 1 title, 3 more, 1 empty
		this.title		= spell.name + "  (" + spell.A + ')'
		this.Cost       = spell.Cost
		this.Range      = spell.Range
		this.Duration   = spell.Duration
		if(notEmpty(this.Cost))			nTitleRows--
		if(notEmpty(this.Range))		nTitleRows--
		if(notEmpty(this.Duration)) 	nTitleRows--
		this.Effect = new TextBox(x, y + K.lineHeight * (nTitleRows + 1), K.textBoxMaxWidth, K.font, K.getCanvas(), K.lineHeight);
		this.Effect.setText(spell.Effect);
		this.draw = function(){
			K.getCanvas().getContext("2d").fillStyle = "black";
			let offsetMultiplier = 2;
			drawTextOnCanvas(this.title, this.x, this.y + K.lineHeight, K.getCanvas(), K.titleFont);
			if(notEmpty(this.Cost)){
				K.getCanvas().getContext("2d").fillStyle = "#41d3d8";
				drawTextOnCanvas(this.Cost, this.x, this.y + K.lineHeight * offsetMultiplier, K.getCanvas(), K.font);
				offsetMultiplier++;
			}
			if(notEmpty(this.Range)){
				K.getCanvas().getContext("2d").fillStyle = "#c63dc2";
				drawTextOnCanvas(this.Range, this.x, this.y + K.lineHeight * offsetMultiplier, K.getCanvas(), K.font);
				offsetMultiplier++;
			}
			if(notEmpty(this.Duration)){
				K.getCanvas().getContext("2d").fillStyle = "#96ba35";
				drawTextOnCanvas(this.Duration, this.x, this.y + K.lineHeight * offsetMultiplier, K.getCanvas(), K.font);
				offsetMultiplier++;
			}
			K.getCanvas().getContext("2d").fillStyle = "black";
			this.Effect.draw();}
		this.height = this.Effect.h + (nTitleRows) * K.lineHeight + K.textBoxPaddingTop;}
		
	function SpellBoxFinal(spell, x, y){
		this.x = x;
		this.y = y;
		this.spell = spell;
		this.spellBox = new SpellBox(spell, x + K.iconBoxWidth, y + K.textBoxPaddingTop);
		this.height = 400;	if(this.spellBox.height > this.height) this.height = this.spellBox.height;
		
		const getIconPath = spell => "Images/Icons/Spells/" + spell.name.split(' ').join('_') + '.png'

		this.draw = function(){// - K.columnPaddingMiddle - K.columnPaddingSide
			K.getCanvas().getContext("2d").lineWidth = 2;
			drawRoundRect(K.getCanvas(), x, y, K.columnWidth, this.height, 15, K.backgroundColor, K.strokeColor);
			drawImageOnCanvas(getIconPath(this.spell), x + K.iconPaddingSide, y + K.iconPaddingTop, K.getCanvas(), K.iconWidth, K.iconWidth);
			this.spellBox.draw()
			var currentCanvas = K.getCanvas()
			setTimeout(function(){
				currentCanvas.getContext("2d").lineWidth = 2;
				drawRoundRect(currentCanvas, x + K.iconPaddingSide, y + K.iconPaddingTop, K.iconWidth, K.iconWidth, 5, null, "#222020");
				currentCanvas.getContext("2d").lineWidth = 1;},1000);}}
	
	var canvasCounter = 0
	function A4Canvas(){
		this.canvas	= createElement("canvas")
		this.canvas.setAttribute("width", K.canvasWidth)
		this.canvas.setAttribute("height", K.canvasHeight)
		this.canvas.setAttribute("id", "Canvas" + canvasCounter)
		K.canvasID = "Canvas" + canvasCounter
		canvasCounter++
		get("CanvasWrapper").appendChild(this.canvas)
		
		this.currentSide = "LEFT"	// or "RIGHT"
		this.spellToDrawX = K.columnPaddingSide
		this.spellToDrawY = K.columnPaddingTop
		
		this.spellsLeft	 = []
		this.spellsRight = []
		
		this.switchSide = function(){
			this.currentSide = "RIGHT";
			this.spellToDrawX = K.columnWidth + K.columnPaddingMiddle + K.columnPaddingSide;
			this.spellToDrawY = K.columnPaddingTop;}
		this.addSpell = function(spell){
			console.log("Adding " + spell.name);
			var s = new SpellBoxFinal(spell, this.spellToDrawX, this.spellToDrawY);
			if(this.spellToDrawY + s.height > K.canvasHeight){
				if(this.currentSide == "LEFT"){
					console.log("No more space on this side");
					this.switchSide();
					return "SWITCH";}
				else if(this.currentSide == "RIGHT"){
					return "NOSPACE";}}
			else{
				print("Drawing at " + this.spellToDrawX + "," + this.spellToDrawY);
				s.draw();
				this.spellToDrawY += s.height + K.textBoxPaddingTop;
				return "ADDED";}}}

				
	var CanvasManager = {
		canvases 	: [],
		addSpell	: function(spell){
			if(CanvasManager.canvases.length == 0){
				CanvasManager.canvases.push(new A4Canvas());}
			var result = CanvasManager.canvases[CanvasManager.canvases.length - 1].addSpell(spell);
			if(result == "ADDED"){/* Good for you! */}
			else if(result == "SWITCH"){
				CanvasManager.canvases[CanvasManager.canvases.length - 1].switchSide();
				CanvasManager.canvases[CanvasManager.canvases.length - 1].addSpell(spell);}
			else if(result == "NOSPACE"){
				CanvasManager.canvases.push(new A4Canvas());
				CanvasManager.canvases[CanvasManager.canvases.length - 1].addSpell(spell);}
		}
		
	}


