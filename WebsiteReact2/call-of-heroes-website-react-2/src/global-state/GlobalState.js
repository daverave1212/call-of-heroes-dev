
import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit'
import { characterCreationDetails } from './CharacterCreationReducers'
import { createContext } from 'react'

export const AppStateContext = createContext()

const BASE_STATE = {
    isActionPointsSystem: false
}

export const globalStateStore = configureStore({
    reducer: characterCreationDetails
})


export function getIsActionPointsSystem() { return false }
export function setIsActionPointsSystem(v) { }


