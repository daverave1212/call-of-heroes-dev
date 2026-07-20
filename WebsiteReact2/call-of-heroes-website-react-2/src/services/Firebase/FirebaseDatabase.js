import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { getUserState, isLoggedIn } from "../auth/Auth";

const db = getFirestore()
const userDataCollection = collection(db, 'public-user-data')



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

export async function existsDocument(collectionName, documentId) {
    const docRef = doc(db, collectionName, documentId); // Create a document reference
  
    try {
      const docSnap = await getDoc(docRef); // Get the document snapshot
  
      if (docSnap.exists()) {
        return true; // Document exists
      } else {
        return false; // Document does not exist
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return false; // Handle errors as needed
    }
}

export async function getAllDocuments(collectionName) {
  try {
    const collectionRef = collection(db, collectionName)
    const querySnapshot = await getDocs(collectionRef)
    const documents = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data()) // doc.data() is never undefined for query doc snapshots
      documents.push({
        id: doc.id,
        ...doc.data()
      })
    })
    return documents
  } catch (e) {
    console.error("Error getting documents: ", e)
    return []
  }
}

export async function getAllDocumentsWhere(collectionName, whereClauses) {
  try {
    const collectionRef = collection(db, collectionName)
    
    const q = query(
      collectionRef,
      where(...whereClauses)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return []
    }

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("Error getting documents: ", e)
    return []
  }
}

