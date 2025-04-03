import { configureStore } from "@reduxjs/toolkit";
import * as firebaseAuth from "./services/FirebaseAuth";

const DEFAULT_USER_STATE = {
    id: null,
    name: '',
    authToken: null
}

const userStateStore = configureStore({
    reducer: function(userState = DEFAULT_USER_STATE, {type, payload}) {
        if (type != 'change') {
            return userState
        }
        return {...userState, ...payload}
    }
})

const setUserState = (newUserState) => userStateStore.dispatch({ type: 'change', payload: newUserState })
export const getUserState = () => userStateStore.getState()
export function subscribeToUserStateChanged(func) {
    userStateStore.subscribe(func)
}

export async function login() {
    const result = await firebaseAuth.loginWithGoogle()
    const newUserState = {
        id: result.user.uid,
        authToken: result.accessToken,
        name: result.user.displayName
    }
    setUserState(newUserState)
    return result
}

export async function logout() {
    const result = await firebaseAuth.logout()
    setUserState(DEFAULT_USER_STATE)
    return DEFAULT_USER_STATE
}

export async function test() {
    const isLogged = isLoggedIn()
    console.log({isLogged})
    console.log({userState: getUserState()})
}

export function isLoggedIn() {
    return firebaseAuth.isLoggedIn()
}