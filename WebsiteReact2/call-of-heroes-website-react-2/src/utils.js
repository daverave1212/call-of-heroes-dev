import { Link } from "react-router-dom"
import Icon from "./components/Icon"
import Separator from "./components/Separator/Separator"


// ---------------- Spells Utilities ----------------

export function spellWithName(name, spellData) {
    return {...spellData, Name: removeTildes(name)}
}
function getErrorSpellObject(message) {
    return {
        'Name': 'Error',
        'A': '?',
        'Effect': `An error has occured with a spell: ${message}`
    }
}
/*  obj = {
        Push: {
            Effect: ...
        },
        ...
    }
    returns = [
        { Name: "Push", "Effect": ...},
    ]
*/
export function spellsFromObject(obj) /* -> Array */ {
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

export function removeTildes(spellName) {
    if (spellName.startsWith('~') || spellName.startsWith('<'))
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
export function getIconPathByName(name) {
    const iconName = getUniqueSpellID(name)
    const iconPath = `/Icons/Spells/${iconName}.png`
    return iconPath
}
export function getUniqueSpellID(name) {
    const idName = stringReplaceAllMany(name, [' ', '/', '%'], ['_', '_', ''])
    return idName
}


// --------------- Questguard Utilities --------------
export function isDice(str) {
    if (str == null) return false
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
    return title.toLowerCase().split(' ').join('-').split('.').join('_')
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

}
// text: "250 (125 x2)" -> 2
export function extractXPMultiplierFromText(text) {
    const indexOfX = text.indexOf('x')
    if (indexOfX == null)
        return null
    const multiplierDigit = text[indexOfX + 1]
    return parseInt(multiplierDigit)
}
// text: "250 (125 x2)" -> 250;     250 -> 250
export function extractBaseXPFromText(text) {
    if (Number.isInteger(text))
        return text
    let xpSoFar = ''
    let i = 0
    while (i < text.length && isCharDigit(text[i])) {
        xpSoFar += text[i]
        i += 1
    }
    return parseInt(xpSoFar)
}
export function extractDefenseFromMonsterArmor(text) {
    if (Number.isInteger(text))
        return text
    let defenseSoFar = ''
    let i = 0
    while (i < text.length && isCharDigit(text[i])) {
        defenseSoFar += text[i]
        i += 1
    }
    return parseInt(defenseSoFar)
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

export function mapObject(obj, func) {
    const keys = Object.keys(obj)
    let newObj = {}
    for (const oldKey of keys) {
        const oldValue = obj[oldKey]
        const { key, value } = func({key: oldKey, value: oldValue})
        newObj = {...newObj, [key]: value }
    }
    return newObj
}

export function groupBy(arr, hashFunc) {
    const hashKeyArrayElemValuePairs = {}
    for (const elem of arr) {
        const elemHash = hashFunc(elem)
        if (elemHash == null)
            continue
        if (hashKeyArrayElemValuePairs[elemHash] == null) {
            hashKeyArrayElemValuePairs[elemHash] = []
        }
        hashKeyArrayElemValuePairs[elemHash].push(elem)
    }
    return hashKeyArrayElemValuePairs
}





// ---------------- Forms and Valdiation ----------------

export function ifOk(whatToCheck, then) {
    return (whatToCheck == null)? null : then
}

// Wraps sections like "1d10 + 20" in a dark red span; returns an array of text or span components
export function enspanDamageCalculations(text) {
    const words = text.split(' ')

    const isWordDamageCalcPart = (word) => {
        return isDice(word) || isOperator(word) || isStringNumeric(word)
    }

    let state = 'none'
    let currentPhraseWords = []
    const phrases = []
    for (let i = 0; i < words.length; i++) {
        const word = words[i]
        const nextWord = (i + 1 <= words.length - 1) ? words[i+1] : null
        switch (state) {
            case 'none':
                currentPhraseWords.push(word)
                if (isWordDamageCalcPart(word)) {
                    if (isWordDamageCalcPart(nextWord)) {
                        state = 'in-damage'
                    } else {
                        state = 'in-normal'
                    }
                } else {
                    state = 'in-normal'
                }
                break
            case 'in-normal':
                if (isWordDamageCalcPart(word)) {
                    if (isWordDamageCalcPart(nextWord)) {
                        phrases.push(currentPhraseWords.join(' '))
                        currentPhraseWords = [word]
                        state = 'in-damage'
                    } else {
                        currentPhraseWords.push(word)
                    }
                } else {
                    currentPhraseWords.push(word)
                }
                break
            case 'in-damage':
                if (isWordDamageCalcPart(word)) {
                    currentPhraseWords.push(word)
                } else {
                    phrases.push(
                        (<span className='monster-ability__damage'>{currentPhraseWords.join(' ')}</span>)
                    )
                    currentPhraseWords = [word]
                    state = 'in-normal'
                }
                break
        }
    }
    if (currentPhraseWords.length > 0) {
        if (state == 'in-normal') {
            phrases.push(currentPhraseWords.join(' '))
        } else {
            phrases.push(
                (<span className='monster-ability__damage'>{currentPhraseWords.join(' ')}</span>)
            )
        }
    }
    return phrases
}

// Returns an array of componentos
export function parseTextWithSymbols(text, customSymbols) {

    let symbolToInsertion = {
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
        'Cover': () => (<span>If a Unit has Cover from you (e.g. is behind an obstacle), everything you do to it gets -2.</span>),
        'DiceUpgrade': () => (<span>Having <b>Dice Upgraded</b> means, for example, d6's become d8's, or d10's become d12's. D12's and d20's don't increase.</span>),
        
        'Gold': () => (<Icon name="Gold"/>)
    }
    if (customSymbols != null) {
        symbolToInsertion = {...symbolToInsertion, ...customSymbols}
    }
    const symbolToMarkup = {
        '^': text => (<b>{text}</b>),
        '_': text => (<i>{text}</i>),
        '~': text => (<span style={{color: 'var(--blue-color)'}}>{text}</span>)
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
                if (char == '^' || char == '_' || char == '~') {
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

export function hasAnyProperty(obj, propList) {
    for (const prop of propList) {
        if (obj[prop] != undefined) return true
    }
    return false
}
export function isCharDigit(char) {
    return '0123456789'.includes(char)
}

// ---------------- Other Small Utilities ----------------
export function logAndReturn(obj) {
    console.log(obj)
    return obj
}
export function def(val, func) {
    return func(val)
}
export function getOnlyProp(obj) {
    return getAnyPropNameExcept(obj, 'default')
}
export function stringReplaceAllMany(str, replaceWhats, replaceWiths) {
    for (let i = 0; i < replaceWhats.length; i++) {
        str = str.split(replaceWhats[i]).join(replaceWiths[i])
    }
    return str
}
export function isObject(obj) {
    return typeof obj === 'object'
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
export function getPageHashFromLocation(location) {       // Use 'const location = useLocation()' in a component to get location (from 'react-router-dom')
    const decodedHash = decodeURIComponent(location.hash)
    if (decodedHash == null || decodedHash.length == 0)
        return ''
    return decodedHash.substring(1) // Remove the "#" at the beginning
}
export function scrollToId(id, offset) {
    offset = offset == null? 0 : offset
    const elemWithId = document.getElementById(id)
    if (elemWithId != null) {
        const elemPosition = elemWithId.getBoundingClientRect().top
        const scrollPosition = elemPosition + window.scrollY - offset
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        })
    }
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