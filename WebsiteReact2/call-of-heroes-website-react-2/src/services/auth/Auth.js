import { configureStore } from "@reduxjs/toolkit";
import * as firebaseAuth from "../Firebase/FirebaseAuth";
import { useState } from "react";
import { getLocalStorageJSON, setLocalStorageJSON, useLocalStorageState } from "../../utils";
import { existsMyDocInCollection, setMyDocInCollection } from "../online-database/Database";
import defaultPublicUserDataMap from './default-public-user-data-map.json'

let userData = null
export const getUserState = () => getLocalStorageJSON('currentUserData')
window.getUserState = getUserState

const authChangedListeners = {}


firebaseAuth.onAuthChanged(async user => {
    // Setup some easy to access localStorage info
    let newUserData
    if (user == null) {
        newUserData = null
    } else {
        newUserData = {
            id: user.uid,
            name: user.displayName,
            token: user.accessToken,
            email: user.email
        }
    }
    setLocalStorageJSON('currentUserData', newUserData)
    for (const id of Object.keys(authChangedListeners)) {
        const func = authChangedListeners[id]
        func(newUserData)
    }

    // Make sure the user has public-user-data
    if (newUserData != null) {
        const iHaveUserData = await existsMyDocInCollection('public-user-data')
        if (!iHaveUserData) {
            const myUserData = {...defaultPublicUserDataMap, ...{
                email: user.email
            }}
            await setMyDocInCollection('public-user-data', myUserData)
        }
    }
})


export function useAuth(uniqueLocationID) {
    const [userData, setUserData] = useLocalStorageState('currentUserData', null)

    return { user: userData }
}

// export function useAuth(uniqueLocationID) {
//     const [userData, setUserData] = useState(getUserState())

//     onUserStateChanged(uniqueLocationID + '-auth', newUserData => {
//         setUserData(newUserData)
//     })

//     return { user: userData }
// }

export function useIsLoggedIn(uniqueLocationID) {
    const { user } = useAuth(uniqueLocationID)
    return user != null
}

// const timersForCheckAuth = {}
// export function useIsLoggedIn(uniqueLocationID) {
//     const [innerUserData, setInnerUserData] = useState(getUserState())
//     if (timersForCheckAuth == null) {
//         timersForCheckAuth[uniqueLocationID] = setInterval(() => {
//             if (getUserState() != innerUserData) {
//                 setInnerUserData(getUserState())
//             }
//         }, 500)
//     }
//     return innerUserData != null
// }

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
    return getLocalStorageJSON('currentUserData') != null
}

export function onUserStateChanged(funcId, func) {
    authChangedListeners[funcId] = func
}