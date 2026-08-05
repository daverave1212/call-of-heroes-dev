import { configureStore } from "@reduxjs/toolkit";
import * as firebaseAuth from "../Firebase/FirebaseAuth";
import { useEffect, useState } from "react";
import { getLocalStorageJSON, isSetFreeAsync, setLocalStorageJSON, useLocalStorageState } from "../../utils";
import { existsMyDocInCollection, getMyDocInCollection, setMyDocInCollection } from "../online-database/Database";
import defaultPublicUserDataMap from './default-public-user-data-map.json'

let userSets = null
export const getUserState = () => getLocalStorageJSON('currentUserData')

window.getUserState = getUserState
window._getUserSets = () => userSets

const authChangedListeners = {}


firebaseAuth.onAuthChanged(async user => {
    // Setup some easy to access localStorage info
    let newUserData
    if (user == null) {
        newUserData = null
    } else {
        const idToken = await user.getIdToken()
        newUserData = {
            id: user.uid,
            name: user.displayName,
            token: user.accessToken,
            email: user.email,
            idToken
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

export function useIsLoggedIn(uniqueLocationID) {
    const { user } = useAuth(uniqueLocationID)
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
    return getLocalStorageJSON('currentUserData') != null
}

export function onUserStateChanged(funcId, func) {
    authChangedListeners[funcId] = func
}


export async function getMyOwnedSetsAsync() {
    if (!isLoggedIn()) {
        console.warn(`WARNING: Can not getMyOwnedSets when not logged in. Returning []`)
        return []
    }

    if (userSets != null) {
        return userSets
    }

    const existsPrivateUserData = await existsMyDocInCollection('private-user-data')
    if (!existsPrivateUserData) {
        console.warn(`Currently logged user does not have a private-user-data.`)
        return []
    }

    const myPrivateData = await getMyDocInCollection('private-user-data')
    console.log({myPrivateData})
    const mySets = myPrivateData?.ownedProducts ?? {}

    return mySets
}
export async function doIOwnSetAsync(setName) {
    const ownedSets = await getMyOwnedSetsAsync()
    console.log({ownedSets})
    return setName in ownedSets
}
export async function isSetUnavailableAsync(setName) {
    return !(await doIOwnSetAsync(setName))
}
export function useDoIOwnSet(setName) {
    const [doI, setDoI] = useState(false)

    useEffect(() => {
        (async () => {
            const isFree = await isSetFreeAsync(setName)

            if (isFree) {
                setDoI(true)
            } else {
                const doIOwnIt = await doIOwnSetAsync(setName)
                setDoI(doIOwnIt)
            }
        })()
    }, [setName])

    return doI
}

export function useOwnedSets() {
    const [ownedSets, setOwnedSets] = useState({})

    useEffect(() => {
        (async () => {
            const sets = await getMyOwnedSetsAsync()
            setOwnedSets(sets)
        })()
    }, [])

    return ownedSets
}