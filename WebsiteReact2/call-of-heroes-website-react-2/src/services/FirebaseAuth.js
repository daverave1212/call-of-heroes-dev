
import { configureStore } from "@reduxjs/toolkit"
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
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


const firebaseUserStore = configureStore({
    reducer: function(firebaseUserState = null, {type, payload}) {
        if (type != 'change') {
            return firebaseUserState
        }
        if (payload == null) {
            return null
        }
        return {...firebaseUserState, ...payload}
    }
})


onAuthStateChanged(auth, user => {
    console.log(`Changing auth: user null? ${user == null}`)
    if (user == null) {
        firebaseUserStore.dispatch({ type: 'change', payload: null })
    } else {
        firebaseUserStore.dispatch({ type: 'change', payload: {
            id: user.uid,
            name: user.displayName,
            token: user.accessToken,
        }})
    }
})

export function onAuthChanged(func) {
    onAuthStateChanged(auth, user => {
        func(user)
    })
}

export function isLoggedIn() {
    console.log(`FirebaseAuth.isLoggedIn...`)
    return firebaseUserStore.getState() != null
}

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


export async function test() {

}


