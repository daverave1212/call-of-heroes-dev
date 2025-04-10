import { configureStore, createSlice } from "@reduxjs/toolkit";
import { StateStore } from "../utils";

const initialDetailsState = {
    src: null,
    playerName: '',
    characterName: ''
}

export function characterCreationDetails(state = initialDetailsState, { type, payload }) {
    if (type == 'alter') {
        return {...state, ...payload}
    }
    if (type == 'set') {
        return {...payload}
    }
    return state
}
