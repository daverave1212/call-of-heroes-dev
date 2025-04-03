
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

export async function getAnyDocInCollection(collectionName) {
    return await firebaseDatabase.getDocument(collectionName, 'uHCqdNCbc69tRKk7r6kA')
}
