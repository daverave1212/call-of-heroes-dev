import { Link } from "react-router-dom"
import Icon from "./components/Icon"
import Separator from "./components/Separator/Separator"


// ---------------- Spells Utilities ----------------

export function spellWithName(name, spellData) {
    return {...spellData, Name: name}
}
function getErrorSpellObject(message) {
    return {
        'Name': 'Error',
        'A': '?',
        'Effect': `An error has occured with a spell: ${message}`
    }
}
// Retrieves all keys as .Name in an array of all objects
export function spellsFromObject(obj) {
    if (obj == null) return getErrorSpellObject('Null obj given to spellsFromObject')

    const spellsArray = []
    for (const key of Object.keys(obj)) {
        if (key == 'default' || isNumber(key))   // Ignore it if it's the 'default' module property or array element
            continue
        const spellName = (key.startsWith('<') || key.startsWith('~')) ?
            key.substring(1, key.length - 1) :
            key
        if (obj[key] == null)
            spellsArray.push(getErrorSpellObject(`Spell ${spellName} has null obj[key]`))
        else
            spellsArray.push(spellWithName(spellName, obj[key]))
    }
    return spellsArray
}
// Gets all keys as spell objects into an array, BUT the objects are taken from a database by their key
// This is useful because some class abilities have ": Inherit", therefore you need to get the spell from the database by name
export function spellFromObject(obj, name) {
    if (obj[name] == null) {
        if (name.startsWith('~')) {
            name = removeTildes(name)
        } else {
            name = addTildes(name)
        }
    }
    return spellWithName(name, obj[name])
}
export function removeTildes(spellName) {
    if (spellName.startsWith('~'))
        return spellName.substring(1, spellName.length - 1)
    return spellName
}
export function addTildes(spellName) {
    return `~${spellName}~`
}
export function getAllSpellsFromCategoriesObject(spellCategoriesObject) {
    const categoryNames = Object.keys(spellCategoriesObject)
    let spells = []
    for (const categoryName of categoryNames) {
        const theseSpells = spellsFromObject(spellCategoriesObject[categoryName])
        spells = [...spells, ...theseSpells]
    }
    return spells
}
export function getSpellFromCategoriesObject(spellCategoriesObject, category, name) {
    const categoryIndex = spellCategoriesObject.indexOf(category)
}



// ------------------ Canvas Utilities -----------------
// function drawTextOnCanvas(t, x, y, canvas, font){
//     if(font != null) canvas.getContext("2d").font = font;
//     canvas.getContext("2d").fillText(t, x, y);
// }

// function drawImageOnCanvas(imgpath, x, y, canvas, w, h){
//     var img = createImage(imgpath);
//     img.onload = function(){canvas.getContext("2d").drawImage(img, x, y, w, h);}
// }

// function getCanvasTextWidth(Text, Canvas){return Canvas.getContext("2d").measureText(Text).width;}
// function getCanvasTextHeight(Text, Canvas){return Canvas.getContext("2d").measureText(Text).height;}
// export function TextBox(X, Y, MaxWidth, Font, Canvas, LineHeight) {
//     this.canvas = Canvas;
//     this.context = Canvas.getContext("2d");
//     this.context.font = Font;
    
//     this.lines = new Array();
//     this.nLines = 0;
//     this.w = MaxWidth;
//     this.h = 0;
//     this.x = X;
//     this.y = Y;
//     this.lineSpacing = 20; if(LineHeight) this.lineSpacing = LineHeight;
//     this.font = Font;
//     this.text = "";
    
    
//     this.setText = function(t) {
//         var wordList = t.split(" ");
//         var currentLine = 0;
//         var currentWord = 0;
//         this.nLines = 0;
//         this.text = t;
//         while(currentWord < wordList.length - 1){
//             this.nLines++;
//             this.lines[currentLine] = "";
//             var isFirstWordOfLine = true;
//             while(getCanvasTextWidth(this.lines[currentLine] + " " + wordList[currentWord], this.canvas) < this.w && wordList[currentWord] != "NL" && currentWord < wordList.length){
//                 if(isFirstWordOfLine){
//                     isFirstWordOfLine = false;}
//                 else{
//                     this.lines[currentLine] += " ";}
//                 this.lines[currentLine] += wordList[currentWord];
//                 currentWord++;}
//             currentLine++;
//             if(wordList[currentWord] == "NL"){
//                 currentWord++;}}
//         this.h = this.lineSpacing * (1 + this.nLines);}
    
//     this.draw = function(){
//         for(var i = 0; i<this.nLines; i++){
//             this.context.fillText(this.lines[i], this.x, this.y + i * this.lineSpacing);}}
// }
// function drawRoundRect(canvas, x, y, width, height, radius, fill, stroke) {
//     var ctx = canvas.getContext("2d");
//     if (typeof stroke == 'undefined') {
//     stroke = true;
//     }
//     if (typeof radius === 'undefined') {
//     radius = 5;
//     }
//     if (typeof radius === 'number') {
//     radius = {tl: radius, tr: radius, br: radius, bl: radius};
//     } else {
//     var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
//     for (var side in defaultRadius) {
//         radius[side] = radius[side] || defaultRadius[side];
//     }
//     }
//     ctx.beginPath();
//     ctx.moveTo(x + radius.tl, y);
//     ctx.lineTo(x + width - radius.tr, y);
//     ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
//     ctx.lineTo(x + width, y + height - radius.br);
//     ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
//     ctx.lineTo(x + radius.bl, y + height);
//     ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
//     ctx.lineTo(x, y + radius.tl);
//     ctx.quadraticCurveTo(x, y, x + radius.tl, y);
//     ctx.closePath();
//     if (fill != null) {
//         ctx.fillStyle = fill;
//         ctx.fill();
//     }
//     if (stroke != null) {
//         ctx.strokeStyle = stroke;
//         ctx.stroke();
//     }

// }



// --------------- Call of Heroes Utilities --------------
export function isDice(str) {
    const parts = str.split('d')
    if (parts.length != 2)          // Must be osmething like <something>d<something>
        return false
    if (isStringNumeric(parts[0]) == false)
        return false
    if (isStringNumeric(parts[1]) == false)
        return false
    return true
}
export function isOperator(str) {
    return str == '+' || str == '-'
}
export function getMonsterStatsAsObject(statsString) {
    let monsterStatsNormalized
    if (isString(statsString) == false) monsterStatsNormalized = '?/?/?/?/?'
    else if (statsString.indexOf('/') == -1) monsterStatsNormalized = '?/?/?/?/?'
    else monsterStatsNormalized = statsString

    const monsterStatsNumbers = monsterStatsNormalized.split('/')
    const monsterStats = [
        { name: 'Mig', value: monsterStatsNumbers[0] },
        { name: 'Dex', value: monsterStatsNumbers[1] },
        { name: 'Int', value: monsterStatsNumbers[2] },
        { name: 'Wis', value: monsterStatsNumbers[3] },
        { name: 'Cha', value: monsterStatsNumbers[4] }
    ]

    return monsterStats
}
export function titleToId(title) {
    return title.toLowerCase().split(' ').join('-')
}
// A hack for GitHub pages; links in browser will look like ...github.io/?/miau/miau (returns "/miau/miau")
export function getLocationHackyPath(location) {
    if (location.href.includes('?') && location.href.includes('=') == false) {
        const qIndex = location.href.indexOf('?')
        let hackyPath = location.href.substring(qIndex + 1)
        console.log(hackyPath.startsWith('/'))
        if (hackyPath.startsWith('/') == false) {
            hackyPath = '/' + hackyPath
        }
        return hackyPath
    } else {
        return null
    }

    decodeURIComponent(location.hash).substring(1)
}




// ---------------- Array Utilities ----------------

// Puts it at the end if it has no keyName property.
export function sortObjectArrayByKey(array, keyName) {
    if (Array.isArray(array) == false) {
        console.log({array})
        throw `Did not give an array to sortObjectArrayByKey. See object above.`
    }
    const sortedArray = [...array].sort(function(a, b) {
        const aSort = a[keyName] != null? a[keyName]: 99999
        const bSort = b[keyName] != null? b[keyName]: 99999
        return aSort - bSort
    })
    return sortedArray
}
export function sortSpellsArrayByOrderOnWebsite(array) {
    return sortObjectArrayByKey(array, 'OrderOnWebsite')
}

export function insertBetweenAll(array, insertWhat) {
    if (array.length == 0) return array;

    const newArray = [array[0]]

    for (let i = 1; i < array.length; i++) {
        newArray.push(
            typeof insertWhat === 'function'?
                insertWhat(i):
                insertWhat
        )
        newArray.push(array[i])
    }

    return newArray
}
export function areArraysEqual(a1, a2) {
    if (a1.length != a2.length) return false
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) return false
    }
    return true
}





// ---------------- Forms and Valdiation ----------------

export function ifOk(whatToCheck, then) {
    return (whatToCheck == null)? null : then
}

// Returns an array of componentos
export function parseTextWithSymbols(text) {

    const symbolToInsertion = {
        'Damage': () => (<Icon name="Damage"/>),
        'Diamond': () => (<span style={{fontSize: '0.8em'}}>🔹</span>),
        'Pets and Animals': () => (<Link to="/Other/PetsAndAnimals">Pets and Animals</Link>),
        'Offensive Abilities': () => (<span>Offensive means that it deals Damage or applies hard Crowd Control (anything better than Slow and creating Hard Terrain).</span>),
        
        'Feared': () => (<span>A Feared Unit can only do <b>one</b> Act on its turn (e.g. move, make one attack, use one Ability, etc).</span>),
        'Crippled': () => (<span>A Crippled Unit can't make physical Attacks.</span>),
        'Silenced': () => (<span>A Silenced Unit can't make cast Spells.</span>),
        'Fumbling': () => (<span>A Fumbling Unit has -2 to all Attacks.</span>),
        'Blinded': () => (<span>A Blinded Unit has -4 to all rolls.</span>),
        'Slowed': () => (<span>A Slowed Unit has -2 Movement Speed.</span>),
        'Rooted': () => (<span>A Rooted Unit has can't move from its space (but it can attack, cast Spells, etc).</span>),
        'Stunned': () => (<span>A Stunned Unit skips its turn.</span>),
        
        'Gold': () => (<Icon name="Gold"/>)
    }
    const symbolToMarkup = {
        '^': text => (<b>{text}</b>),
        '_': text => (<i>{text}</i>)
    }

    let currentTextPartStart = 0
    let textParts = []

    let state = 'reading-normal-text'
    let symbolStart = null
    let markupSymbol = null
    for (let i = 0; i < text.length; i++) {
        const char = text[i]
        switch (state) {
            case 'reading-normal-text':
                if (char == '{') {
                    textParts.push(text.substring(currentTextPartStart, i))
                    symbolStart = i
                    state = 'reading-symbol'
                }
                if (char == '^' || char == '_') {
                    textParts.push(text.substring(currentTextPartStart, i))
                    symbolStart = i
                    state = 'reading-markup'
                    markupSymbol = char
                }
                break
            case 'reading-symbol':
                if (char == '}') {
                    const symbol = text.substring(symbolStart + 1, i)
                    textParts.push(symbolToInsertion[symbol]())    // Push current symbol
                    currentTextPartStart = i + 1
                    state = 'reading-normal-text'
                }
                break
            case 'reading-markup':
                if (char == markupSymbol) {
                    const markupedText = text.substring(symbolStart + 1, i)
                    textParts.push(symbolToMarkup[markupSymbol](markupedText))    // Push markuped text
                    currentTextPartStart = i + 1
                    state = 'reading-normal-text'
                }
                break
        }
    }

    if (state == 'reading-normal-text') {
        if (currentTextPartStart < text.length) {
            textParts.push(text.substring(currentTextPartStart, text.length))
        }
    }

    return textParts

}
export function parseTextWithMixins(text) {
    const getMixinComponent = {
        '{Defense}': () => <Icon name="Defense"/>,
        '{Damage}': () => <Icon name="Damage"/>,
        '{Health}': () => <Icon name="Health"/>,
    }
    const possibleMixins = Object.keys(getMixinComponent)

    let parts = [text]
    for (const mixin of possibleMixins) {
        
        let newParts = []
        for (const part of parts) {
            if (part.includes(mixin)) {
                let partParts = part.split(mixin)
                partParts = insertBetweenAll(partParts, getMixinComponent[mixin])
                newParts = [...newParts, ...partParts]
            } else {
                newParts.push(part)
            }
        }
        parts = newParts
    }
    return parts
}

export function isFormValueNumeric(value) {
    if (value.length == 0)
        return true
    if (value.length == 1 && value[0] == '-')
        return true
    return isStringNumeric(value)
}
export function isFormValueInt(value) {
    if (value.includes('.'))
        return false
    return isFormValueNumeric(value)
}
// Tries to cast whatever is given to an int
// If it fails, returns the default value
export function asIntOr(toCast, defaultValue) {
    if (Number.isInteger(toCast))
        return toCast
    if (isNumber(toCast))
        return Math.floor(toCast)
    if (isStringNumeric(toCast))
        return parseInt(toCast)
    return defaultValue
}


export function formValueIntOr(value, orUseThis) {
    if (isFormValueInt(value))
        return value
    return orUseThis
}






// ---------------- Other Small Utilities ----------------
export function stringReplaceAllMany(str, replaceWhats, replaceWiths) {
    for (let i = 0; i < replaceWhats.length; i++) {
        str = str.split(replaceWhats[i]).join(replaceWiths[i])
    }
    return str
}
export function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}
export function isNumber(obj) {
    return ! isNaN(obj)
}
export function isStringNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
export function getPageHashFromLocation(location) {       // Use 'useLocation' in a component to get location (from 'react-router-dom')
    return decodeURIComponent(location.hash).substring(1) // Remove the "#" at the beginning
}
export function getBasePathBeforeHash(linkWithHash) {
    const hashIndex = linkWithHash.indexOf('#')
    return linkWithHash.substring(0, hashIndex)
}
export function isBasePathEmpty(basepath) {
    return basepath == null || basepath.length == 0 || basepath == '/'
}
export function isHashEmpty(hash) {
    return hash == null || hash.length == 0 || hash == '#'
}
export function getAnyPropNameExcept(obj, exceptions) {
    if (Array.isArray(exceptions) == false)
        exceptions = [exceptions]
    const props = Object.keys(obj)
    const remainingProps = props.filter(propName => exceptions.includes(propName) == false)
    if (remainingProps.length == 0)
        return null
    return remainingProps[0]
}
export function getLocalStorageBool(name) {
    const value = window.localStorage.getItem(name)
    if (value == null) return false
    if (value == 'false') return false
    if (value == 'true') return true
    return false
}
export function randomInt(low, high){
    return Math.floor(Math.random() * (high - low + 1) + low);
}
export function randomOf(...args){
    return args[randomInt(0, args.length - 1)];
}
export function shuffle(array_a){
    var iRandomize;
    for(iRandomize = 0; iRandomize < array_a.length; iRandomize++){
        var randomizeArrayIndex = randomInt(0, array_a.length - 1);
        var auxRandomize = array_a[iRandomize];
        array_a[iRandomize] = array_a[randomizeArrayIndex];
        array_a[randomizeArrayIndex] = auxRandomize;
    }
    return array_a
}
export function range(fromIncluding, toExcluding) {
    const numbers = []
    for (let i = fromIncluding; i < toExcluding; i++) {
        numbers.push(i)
    }
    return numbers
}
export function takeRandomElements(fromArray, numberOfElements) {
    return shuffle([...fromArray]).slice(0, numberOfElements)
}
export function capitalizeFirstLetter(str) {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1)
    return str2
}




// ---------------- React Small Utilities ----------------
export const styleMargined = { marginBottom: 'var(--element-padding)' }    // Use this as style={styleMargined}
export const stylePadded   = { padding: 'var(--element-padding)' }