import { configureStore } from "@reduxjs/toolkit";
import * as firebaseAuth from "../Firebase/FirebaseAuth";
import { useEffect, useState } from "react";
import { getLocalStorageJSON, isSetFreeAsync, setLocalStorageJSON, useLocalStorageState } from "../../utils";
import { existsMyDocInCollection, getMyDocInCollection, setMyDocInCollection } from "../online-database/Database";
import defaultPublicUserDataMap from './default-public-user-data-map.json'
import { maybeWakeServer } from "../backend-services/wake-server";
import { showToast } from "../dom/toaster";
import * as firebaseDatabase from '../Firebase/FirebaseDatabase'

let userSets = null
export const getUserState = () => getLocalStorageJSON('currentUserData')

window.getUserState = getUserState
window._getUserSets = () => userSets

const authChangedListeners = {
    'Ping server to wake up': async () => {
        try {
            maybeWakeServer()   // No need to await
        } catch (e) {
            
        }
    },
    'Ensure user has public-user-data': async newUserData => {
        if (newUserData == null) {
            return
        }
        console.orange(`1. Ensuring user ${newUserData?.name} has public user data...`)
        const iHaveUserData = await firebaseDatabase.existsDocument('public-user-data', newUserData.id)
        // const iHaveUserData = await existsMyDocInCollection('public-user-data', newUserData)
        if (iHaveUserData) {
            console.orange(`5. I do!`)
            return
        }
        console.orange(`5. I do NOT HAVE IT!`)
        const myUserData = {...defaultPublicUserDataMap, ...{
            email: newUserData.email
        }}
        const _newUserDataBackup = {...newUserData}
        try {
            await firebaseDatabase.setDocument('public-user-data', newUserData.id, myUserData)
            // await setMyDocInCollection('public-user-data', myUserData)
        } catch (e) {
            showToast(`Failed to set public-user-data!`, 'red')
            console.orange(`6. Fail`)
            console.log({_newUserDataBackup})
            console.error(e)
        }
    }
}

export const isAuthReadyPromise = new Promise(resolve => {
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
            await func(newUserData)
        }
        resolve()
    })
})
export async function awaitAuth() {
    await isAuthReadyPromise
}


export function useAuth(uniqueLocationID) {
    const [userData, setUserData] = useLocalStorageState('currentUserData', null)

    return { user: userData }
}

export function useIsLoggedIn(uniqueLocationID) {
    const { user } = useAuth(uniqueLocationID)
    return user != null
}

export async function login() {
    const result = await firebaseAuth.loginWithGoogle()
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
        console.warn(`WARNING: Currently logged user ${getUserState()?.name} does not have a private-user-data.`)
        return []
    }
    const myPrivateData = await getMyDocInCollection('private-user-data')
    const mySets = myPrivateData?.ownedProducts ?? {}

    return mySets
}
export async function doIOwnSetAsync(setName) {
    const ownedSets = await getMyOwnedSetsAsync()
    const result = setName in ownedSets
    console.teal(`doIOwnSetAsync(${setName}): ${result}`)
    return result
}
export async function isSetUnavailableAsync(setName) {
    return !(await doIOwnSetAsync(setName))
}
export function useDoIOwnSet(setName) {
    const [isLoading, setIsLoading] = useState(true)
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
            setIsLoading(false)
        })()
    }, [setName])

    return [doI, isLoading]
}

export function useOwnedSets() {
    const [isLoading, setIsLoading] = useState(true)
    const [ownedSets, setOwnedSets] = useState({})

    useEffect(() => {
        (async () => {
            try {
                const sets = await getMyOwnedSetsAsync()
                setOwnedSets(sets)
            } catch (e) {
                console.error(e)
                showToast(e, 'red')
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    return [ownedSets, isLoading]
}