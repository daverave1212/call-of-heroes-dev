


	var Constants = {
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

		canvasID			: "Canvas",
		getCanvas			: function() {
			return get(Constants.canvasID);
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
			drawImageOnCanvas('Icons/' + getPngName(this.spell.Name), this.x + Constants.iconPaddingSide, this.y + Constants.iconPaddingTop, canvas, Constants.iconWidth, Constants.iconWidth);
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
	// Effect


