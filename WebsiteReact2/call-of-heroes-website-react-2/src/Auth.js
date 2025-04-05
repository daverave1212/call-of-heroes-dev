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
const setUserState = (newUserState) => userStateStore.dispatch({ type: 'change', payload: newUserState })
export const getUserState = () => userStateStore.getState()

firebaseAuth.onAuthChanged(user => {
    if (user == null) {
        setUserState(null)
    } else {
        setUserState({
            id: user.uid,
            name: user.displayName,
            token: user.accessToken,
        })
    }
})







export async function login() {
    const result = await firebaseAuth.loginWithGoogle()
    return result
}

export async function logout() {
    const result = await firebaseAuth.logout()
}

export async function test() {

}

export function isLoggedIn() {
    console.log(`Auth.isLoggedIn...`)
    return getUserState() != null
}

export function onUserStateChanged(func) {
    firebaseAuth.onAuthChanged(data => {
        func(data)
    })
}