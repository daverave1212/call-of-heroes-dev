import { readFile } from "node:fs/promises";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import FIREBASE_ADMIN from './firebase-admin.json' with { type: 'json' }

// NOTE: This requires the private file firebase-admin, which is in gitignore.
// Whenever I need to use this script, I must download a new admin JSON from firebase


let auth
let db

initializeApp({
    credential: cert(FIREBASE_ADMIN),
});

auth = getAuth();
db = getFirestore();


export async function setDocument(path, docId, data, merge = false) {
  try {
    const docRef = db.collection(path).doc(docId);
    
    await docRef.set(data, { merge });
    
    // console.log(`Document successfully written to path: ${path}/${docId}`);
    return docRef;
  } catch (error) {
    console.error(`Error writing document at ${path}/${docId}:`, error);
    throw error;
  }
}

export async function getAllDocuments(collectionName) {
  try {
    const snapshot = await db.collection(collectionName).get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    // Map through documents to extract IDs and data
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
}