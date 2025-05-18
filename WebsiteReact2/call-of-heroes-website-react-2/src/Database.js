
import { getUserState, isLoggedIn } from './Auth'
import * as firebaseDatabase from './services/FirebaseDatabase'

// NOTE: All documents in all collections have their id = user.id

function assertLoggedIn() {
    if (isLoggedIn() == false) {
        alert('Unauthorized')
        throw 'Unauthorized - you need to be logged in to do this.'
    }
}

export async function setMyDocInCollection(collectionName, data) {
    assertLoggedIn()
    const userState = getUserState()
    return await firebaseDatabase.setDocument(collectionName, userState.id, data)
}

export async function getMyDocInCollection(collectionName) {
    assertLoggedIn()
    const userState = getUserState()
    return await firebaseDatabase.getDocument(collectionName, userState.id)
}
export async function existsMyDocInCollection(collectionName) {
    assertLoggedIn()
    const userState = getUserState()
    return firebaseDatabase.existsDocument(collectionName, userState.id)
}
window.getMyDocInCollection = getMyDocInCollection





// ------------- Character API -------------
export async function getMyCharacters() {
    assertLoggedIn()
    if (await existsMyDocInCollection('player-characters') == false) {
        return []
    }
    const getMyCharactersResult = await getMyDocInCollection('player-characters')
    return getMyCharactersResult.characters
}
export async function setMyCharacters(array) {
    return await setMyDocInCollection('player-characters', {
        characters: array
    })
}



// ------------- Homebrew API -------------
export async function getMyHomebrews() {
    assertLoggedIn()
    if (await existsMyDocInCollection('player-homebrew') == false) {
        return []
    }
    const getMyHomebrewResult = await getMyDocInCollection('player-homebrew')
    return getMyHomebrewResult.homebrews
}
export async function setMyHomebrews(array) {
    return await setMyDocInCollection('player-homebrew', {
        homebrews: array
    })
}