
import { withAntiSpamCache } from '../anti-spam-cache/anti-spam-cache'
import { getUserState, isLoggedIn } from '../auth/Auth'
import * as firebaseDatabase from '../Firebase/FirebaseDatabase'

// NOTE: All documents in all collections have their id = user.id

function assertLoggedIn() {
    if (isLoggedIn() == false) {
        alert('Unauthorized')
        throw 'Unauthorized - you need to be logged in to do this.'
    }
}


// ------------- General Use Case API -------------
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
export async function existsMyDocInCollection(collectionName, userState=null) {
    assertLoggedIn()
    console.orange(`2. Assert passed in existsMyDocInCollection`)
    userState = userState ?? getUserState()
    console.orange(`3. User state:`)
    console.log({...userState})
    console.orange(`TODO: There is an issue with this withAntiSpamCache! With the normal await firebase... it works!`)
    const result = await withAntiSpamCache('collectionName', 'exists', userState?.name, async () => await firebaseDatabase.existsDocument(collectionName, userState.id))
    console.orange(`4. Got a result with anti-spam!`)
    return result
}
export async function getDocInCollection(collectionName, docId) {
    assertLoggedIn()
    return firebaseDatabase.getDocument(collectionName, docId)
}
export async function getAllDocumentsWithProp(collectionName, propName, propValue) {
    assertLoggedIn()
    return firebaseDatabase.getAllDocumentsWhere(collectionName, [propName, '==', propValue])
}
window.getMyDocInCollection = getMyDocInCollection
window.setMyDocInCollection = setMyDocInCollection
window.existsMyDocInCollection = existsMyDocInCollection




// ------------- Admin Only API -------------
// Firebase rules prevent abuse. These requests only work for Admins
export async function getUserIDFromEmail(email) {
    const users = await getAllDocumentsWithProp('public-user-data', 'email', email)
    if (users.length == 0) {
        return null
    }
    return users[0].id
}




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
