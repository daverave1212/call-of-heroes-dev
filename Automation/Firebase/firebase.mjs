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
    
    console.log(`Document successfully written to path: ${path}/${docId}`);
    return docRef;
  } catch (error) {
    console.error(`Error writing document at ${path}/${docId}:`, error);
    throw error;
  }
}