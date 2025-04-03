import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getUserState, isLoggedIn } from "../Auth";

const db = getFirestore()
const userDataCollection = collection(db, 'user-data')



export async function setDocument(collectionName, docId, dataDoc) {
    return await setDoc(doc(db, collectionName, docId), dataDoc)
}

export async function setDocumentForUser(collectionName, userId, dataDoc) {
    return await setDocument(collectionName, userId, dataDoc)
}

export async function getDocument(collectionName, docId) {
    const docRef = doc(db, collectionName, docId)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists() == false) {
        console.warn(`No document found for ${collectionName}/${docId}`)
        return null
    }
    const document = docSnapshot.data()
    return document
}