
import { withAntiSpamCache } from '../anti-spam-cache/anti-spam-cache'
import { awaitAuth, getUserState, isAuthReadyPromise, isLoggedIn } from '../auth/Auth'
import { showToast } from '../dom/toaster'
import * as firebaseDatabase from '../Firebase/FirebaseDatabase'

// NOTE: All documents in all collections have their id = user.id

function assertLoggedIn() {
    if (isLoggedIn() == false) {
        showToast('You need to be logged in to do that.', 'red')
        throw 'Unauthorized - you need to be logged in to do this.'
    }
}


// ------------- General Use Case API -------------
export async function setMyDocInCollection(collectionName, data) {
    assertLoggedIn()
    await isAuthReadyPromise
    const userState = getUserState()
    return await firebaseDatabase.setDocument(collectionName, userState.id, data)
}
export async function getMyDocInCollection(collectionName) {
    assertLoggedIn()
    await isAuthReadyPromise
    const userState = getUserState()
    return await firebaseDatabase.getDocument(collectionName, userState.id)
}
export async function existsMyDocInCollection(collectionName, userState=null) {
    await isAuthReadyPromise
    assertLoggedIn()
    userState = userState ?? getUserState()
    // console.log({...userState})
    console.orange(`TODO: There is an issue with this withAntiSpamCache! With the normal await firebase... it works!`)
    console.orange(`TODO: The issue is a lot of existsMyDocInCollection is called before firebase auth code. So I need to force firebase auth to be first somehow (import it at the top?)`)
    // const result = await firebaseDatabase.existsDocument(collectionName, userState.id)
    const result = await withAntiSpamCache('collectionName', 'exists', userState?.name, async () => await firebaseDatabase.existsDocument(collectionName, userState.id))
    console.teal(`  existsMyDocInCollection: ${result}`)
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
