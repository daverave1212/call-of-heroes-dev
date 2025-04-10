import { configureStore } from "@reduxjs/toolkit";
import * as firebaseAuth from "./services/FirebaseAuth";

const userStateStore = configureStore({
    reducer: function(userState = null, {type, payload}) {
        if (type != 'change') {
            return userState
        }
        return {...userState, ...payload}
    }
})
const setUserState = (newUserState) => {
    console.log(`Someone just called setUserState with user:`)
    console.log({newUserState})
    userStateStore.dispatch({ type: 'change', payload: newUserState })
}
export const getUserState = () => userStateStore.getState()

const authChangedListeners = {}


firebaseAuth.onAuthChanged(user => {
    console.log(`onAuthChanged: user:`)
    console.log({user})
    if (user == null) {
        setUserState(null)
    } else {
        setUserState({
            id: user.uid,
            name: user.displayName,
            token: user.accessToken,
        })
    }
    for (const id of Object.keys(authChangedListeners)) {
        const func = authChangedListeners[id]
        func(user)
    }
})







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
    return getUserState() != null
}

export function onUserStateChanged(funcId, func) {
    authChangedListeners[funcId] = func
}