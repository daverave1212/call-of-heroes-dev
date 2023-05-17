
	
	
	var Constants = {
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
		font				: "40px IskoolaPota",
		lineHeight			: 40,
		backgroundColor		: "#FFFFFF",
		strokeColor			: "#444040",
		titleFont			: "45px IskoolaPota",
		canvasID			: "Canvas",
		getCanvas			: function(){return get(Constants.canvasID);}
	}

	var Spells = {};
	var SpellNames = new Array();
	function Spell(Name, Type, CastingTime, Range, Components, Duration, Description, IconPath){
		Spells[Name] = this;
		SpellNames.push(Name);this.name = Name;
		this.type = Type;
		this.iconPath = IconPath;
		this.castingTime = CastingTime;	//removeFirst2Words(CastingTime);
		this.range = Range;	//removeFirstWord(Range);
		this.components = Components;	//removeFirstWord(Components);
		this.duration = Duration;	//removeFirstWord(Duration);
		this.description = Description;
		this.spellBox = null;}

	function SpellBox(spell, x, y){
		spell.spellBox = this;
		this.x = x;
		this.y = y;
		this.title = spell.name + " : " + spell.castingTime + ", " + spell.range;
		this.type = spell.type + " - " + spell.components;
		this.duration = "Duration: " + spell.duration;
		this.description = new TextBox(x, y + Constants.lineHeight * 5, Constants.textBoxMaxWidth, Constants.font, Constants.getCanvas(), Constants.lineHeight);
		this.description.setText(spell.description);
		this.draw = function(){
			Constants.getCanvas().getContext("2d").fillStyle = "black";
			drawTextOnCanvas(this.title, this.x, this.y + Constants.lineHeight, Constants.getCanvas(), Constants.titleFont);
			drawTextOnCanvas(this.type, this.x, this.y + Constants.lineHeight * 2, Constants.getCanvas(), Constants.font);
			drawTextOnCanvas(this.duration, this.x, this.y + Constants.lineHeight * 3, Constants.getCanvas(), Constants.font);
			this.description.draw();}
		this.height = this.description.h + 4 * Constants.lineHeight + Constants.textBoxPaddingTop;}
		
	function SpellBoxFinal(spell, x, y){
		this.x = x;
		this.y = y;
		this.spell = spell;
		this.spellBox = new SpellBox(spell, x + Constants.iconBoxWidth, y + Constants.textBoxPaddingTop);
		this.height = 400;	if(this.spellBox.height > this.height) this.height = this.spellBox.height;
		
		this.draw = function(){// - Constants.columnPaddingMiddle - Constants.columnPaddingSide
			drawRoundRect(Constants.getCanvas(), x, y, Constants.columnWidth, this.height, 15, Constants.backgroundColor, Constants.strokeColor);
			drawImageOnCanvas(this.spell.iconPath, x + Constants.iconPaddingSide, y + Constants.iconPaddingTop, Constants.getCanvas(), Constants.iconWidth, Constants.iconWidth);
			this.spellBox.draw();
			var currentCanvas = Constants.getCanvas();
			setTimeout(function(){
				currentCanvas.getContext("2d").lineWidth = 3;
				drawRoundRect(currentCanvas, x + Constants.iconPaddingSide, y + Constants.iconPaddingTop, Constants.iconWidth, Constants.iconWidth, 5, null, "#333333");
				currentCanvas.getContext("2d").lineWidth = 1;},1000);}}
	
	var canvasCounter = 0;
	function A4Canvas(){
		this.canvas	= createElement("canvas");
		this.canvas.setAttribute("width", Constants.canvasWidth);
		this.canvas.setAttribute("height", Constants.canvasHeight);
		this.canvas.setAttribute("id", "Canvas" + canvasCounter);
		Constants.canvasID = "Canvas" + canvasCounter;
		canvasCounter++;
		get("CanvasWrapper").appendChild(this.canvas);
		
		this.currentSide = "LEFT";	// or "RIGHT"
		this.spellToDrawX = Constants.columnPaddingSide;
		this.spellToDrawY = Constants.columnPaddingTop;
		
		this.spellsLeft = new Array();
		this.spellsRight = new Array();
		this.switchSide = function(){
			this.currentSide = "RIGHT";
			this.spellToDrawX = Constants.columnWidth + Constants.columnPaddingMiddle + Constants.columnPaddingSide;
			this.spellToDrawY = Constants.columnPaddingTop;}
		this.addSpell = function(spell){
			console.log("Adding " + spell.name);
			var s = new SpellBoxFinal(spell, this.spellToDrawX, this.spellToDrawY);
			if(this.spellToDrawY + s.height > Constants.canvasHeight){
				if(this.currentSide == "LEFT"){
					console.log("No more space on this side");
					this.switchSide();
					return "SWITCH";}
				else if(this.currentSide == "RIGHT"){
					return "NOSPACE";}}
			else{
				print("Drawing at " + this.spellToDrawX + "," + this.spellToDrawY);
				s.draw();
				this.spellToDrawY += s.height + Constants.textBoxPaddingTop;
				return "ADDED";}}}

				
	var CanvasManager = {
		canvases : new Array(),
		addSpell	: function(spell){
			console.log(CanvasManager.canvases.length);
			if(CanvasManager.canvases.length == 0){CanvasManager.canvases.push(new A4Canvas());}
			console.log(CanvasManager.canvases.length);
			console.log(CanvasManager.canvases[CanvasManager.canvases.length - 1]);
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

	function main(){

		
	} window.onload = main;


	// Name
	// Type
	// CastingTime
	// Range
	// Components
	// Duration
	// Description


