
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

export function ifOk(whatToCheck, then) {
    return (whatToCheck == null)? null : then
}









export function stringReplaceAllMany(str, replaceWhats, replaceWiths) {
    for (let i = 0; i < replaceWhats.length; i++) {
        str = str.split(replaceWhats[i]).join(replaceWiths[i])
    }
    return str
}