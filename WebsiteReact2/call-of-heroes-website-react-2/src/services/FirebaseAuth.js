
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, getDoc } from "firebase/firestore"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM7H2vU3n-Kn1DmMHo2-rAKP3vemI18Tg",
  authDomain: "questguard-17750.firebaseapp.com",
  projectId: "questguard-17750",
  storageBucket: "questguard-17750.firebasestorage.app",
  messagingSenderId: "341416158803",
  appId: "1:341416158803:web:634f437b44a9da24aa88a6",
  measurementId: "G-M6VBWCN7KV"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Authentication
const auth = getAuth()
auth.languageCode = 'en'

// Provider (strategy specific)
const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.setCustomParameters({
    'login_hint': 'user@example.com'
})






export async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleAuthProvider)  // or signInWithRedirect
    const user = result.user
    const { accessToken } = GoogleAuthProvider.credentialFromResult(result)
    console.log({ accessToken, user })
    return { accessToken, user }
}

export async function logout() {
    await auth.signOut()
}

export async function isLoggedIn() {
    return auth().currentUser != null
}

export async function test() {
    // const userDocRef = doc(db, "user-data", 'uHCqdNCbc69tRKk7r6kA')
    // const docSnapshot = await getDoc(userDocRef)
    // if (docSnapshot.exists() == false) {
    //     alert('Document does not exist')
    // }
    // const document = docSnapshot.data()
    // console.log({document})
}