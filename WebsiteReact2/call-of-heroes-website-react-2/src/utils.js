import Separator from "./components/Separator/Separator"


// ---------------- Spells Utilities ----------------

export function spellWithName(name, spellData) {
    return {...spellData, Name: name}
}
// Retrieves all keys as .Name in an array of all objects
export function spellsFromObject(obj) {
    const spellsArray = []
    for (const key of Object.keys(obj)) {
        if (key == 'default')   // Ignore it if it's the 'default' module property
            continue
        const spellName = (key.startsWith('<') || key.startsWith('~')) ?
            key.substring(1, key.length - 1) :
            key
        spellsArray.push(spellWithName(spellName, obj[key]))
    }
    return spellsArray
}
// Gets all keys as spell objects into an array, BUT the objects are taken from a database by their key
// Use import classAbilities, then give a database as a parameter
// This is useful because some class abilities have ": Inherit", therefore you need to get the spell from the database by name
export function spellFromObject(obj, name) {
    return spellWithName(name, obj[name])
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
    const textParts = text.split('{Separator}')
    return insertBetweenAll(textParts, (<Separator/>))
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






// ---------------- React Small Utilities ----------------
export const styleMargined = { marginBottom: 'var(--element-padding)' }    // Use this as style={styleMargined}
export const stylePadded   = { padding: 'var(--element-padding)' }