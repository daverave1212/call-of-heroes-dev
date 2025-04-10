
import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit'
import { characterCreationDetails } from './CharacterCreationReducers'

const BASE_STATE = {
    isActionPointsSystem: false
}

export const globalStateStore = configureStore({
    reducer: characterCreationDetails
})


export function getIsActionPointsSystem() { return false }
export function setIsActionPointsSystem(v) { }

// export const getIsActionPointsSystem = () => globalStateStore.getState().isActionPointsSystem
// export const setIsActionPointsSystem = (val) => globalStateStore.dispatch({type: 'isActionPointsSystem', payload: val})
// setIsActionPointsSystem(false)

