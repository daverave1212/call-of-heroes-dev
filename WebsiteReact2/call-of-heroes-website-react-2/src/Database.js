
import { getUserState, isLoggedIn } from './Auth'
import * as firebaseDatabase from './services/FirebaseDatabase'

// NOTE: All documents in all collections have their id = user.id

function assertLoggedIn() {
    if (isLoggedIn() == false) {
        alert('Unauthorized')
        throw 'Unauthorized - you need to log in first'
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
    return await getMyDocInCollection('player-characters').characters
}
export async function setMyCharacters(array) {
    return await setMyDocInCollection('player-characters', {
        characters: array
    })
}
