import { configureStore } from "@reduxjs/toolkit";
import * as firebaseAuth from "./services/FirebaseAuth";
import { useState } from "react";

let userData = null
export const getUserState = () => userData

const authChangedListeners = {}


firebaseAuth.onAuthChanged(user => {
    console.log(`onAuthChanged: user:`)
    console.log({user})
    if (user == null) {
        userData = null
    } else {
        userData = {
            id: user.uid,
            name: user.displayName,
            token: user.accessToken,
        }
    }
    for (const id of Object.keys(authChangedListeners)) {
        const func = authChangedListeners[id]
        func(userData)
    }
})



export function useAuth(uniqueLocationID) {
    const [userData, setUserData] = useState(null)

    onUserStateChanged(uniqueLocationID + '-auth', newUserData => {
        setUserData(newUserData)
    })

    return { user: userData }
}

export function useIsLoggedIn(uniqueLocationID) {
    const { user } = useAuth(uniqueLocationID + '-isLogged')
    return user != null
}



export async function login() {
    console.log(`  Auth.login`)
    const result = await firebaseAuth.loginWithGoogle()
    console.log({result})
    return result
}

export async function logout() {
    const result = await firebaseAuth.logout()
    return result
}

export async function test() {

}

export function isLoggedIn() {
    console.log(`Auth.isLoggedIn userState:`)
    console.log(getUserState())
    return userData != null
}

export function onUserStateChanged(funcId, func) {
    authChangedListeners[funcId] = func
}