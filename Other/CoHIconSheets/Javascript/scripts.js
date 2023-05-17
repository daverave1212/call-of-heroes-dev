
	var QueuedSpells = new Array();
	var userDidAnything = false;
	function queueSpell(){
		var spellName = get("Input").value;
		if(SpellNames.indexOf(spellName) > -1){
			QueuedSpells.push(spellName);
			var option = createElement("option");
			option.innerHTML = spellName;
			get("AddedSpells").appendChild(option);
			get("Input").value = "";
			userDidAnything = true;
			get("AddSpell").setAttribute("class", "Button");}
		else{
			flashAddButton();
		}
	}
	
	function flashAddButton(){
		var b = get("AddSpell");
		//b.style = "background-color: red;";
		b.setAttribute("class", "Flashed1");
		setTimeout(function(){
			b.setAttribute("class", "Flashed2");
		}, 250);
	}
	
	function resetSpells(){
		removeAllChildren(get("AddedSpells"));
		if(userDidAnything){
			location.reload();
		}
	}
	
	function removeSpell(){
		get("AddedSpells").removeChild(getSelectedOption("AddedSpells"));
	}
	
	function generate(){
		console.log(QueuedSpells.length);
		for(var i = 0; i<QueuedSpells.length; i++){
			CanvasManager.addSpell(Spells[QueuedSpells[i]]);
		}
		QueuedSpells = new Array();
		removeAllChildren(get("AddedSpells"));
	}
	
	function gotoLink(l){
		window.location = l;
	}
	
	function downloadAllCanvases(){
		console.log("Downloading...");
		var zip = new JSZip();
		for(var i = 0; i<CanvasManager.canvases.length; i++){
			let data = CanvasManager.canvases[i].canvas.toDataURL("image/png; base64");
			data = data.replace(/^data:image\/(png|jpg);base64,/, "");
			zip.file("Page" + i + ".png", data, {base64: true});}
		zip.generateAsync({type:"blob"})
		.then(function(content) {
			// see FileSaver.js
			saveAs(content, "example.zip");
		});
	}
	
	function downloadPng(){
		//console.log("Downloading");
		var data = get("Canvas0").toDataURL("image/png; base64");
		//console.log(data);
		data = data.replace(/^data:image\/(png|jpg);base64,/, "");
		//console.log(data);
		var zip = new JSZip();
		zip.file("Hello.txt", "Hello World\n");
		zip.file("Panda.png", data, {base64: true});
		//var img = zip.folder("images");
		//img.file("smile.gif", imgData, {base64: true});
		zip.generateAsync({type:"blob"})
		.then(function(content) {
			// see FileSaver.js
			saveAs(content, "example.zip");
		});
		//console.log(data);
		return;
		
		
		 
		var data = get("Canvas0").toDataURL("image/png; base64");
		var zip = new JSZip();
		console.log("Saving");
		zip.file("Download.png", data, {type: "blob"})
		.then(function(content){
			saveAs(content, "example.zip");
		});
		console.log("saved?");
		return;
		
		
		var a = document.createElement('a');
		var data = get("Canvas0").toDataURL("image/png; base64");
		var img = createElement("img");
		img.setAttribute("src", data);
		document.body.appendChild(img);
		img.setAttribute("crossOrigin", "Anonymous");
		return;
		
		data.setAttribute("crossOrigin", "Anonymous");
		a.href = data;
		a.name = "Spell Sheet";
		a.download = a.name;
		a.setAttribute("crossOrigin", "Anonymous");
		document.body.appendChild(a);
		a.click();
	}

	function download() {
		// ReImg.fromCanvas(get("Canvas0")).downloadPng("Spell Sheet");
		downloadAllCanvases();
		//downloadPng();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
