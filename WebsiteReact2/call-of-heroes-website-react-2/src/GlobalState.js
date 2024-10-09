
import { configureStore } from '@reduxjs/toolkit'

const BASE_STATE = {
    isActionPointsSystem: false
}

export const globalStateStore = configureStore({
    reducer: function(globalState = BASE_STATE, {type, payload}) {
        if (type == 'isActionPointsSystem') {
            return {...globalState, isActionPointsSystem: payload}
        }
    }
})

export const getIsActionPointsSystem = () => globalStateStore.getState().isActionPointsSystem
export const setIsActionPointsSystem = (val) => globalStateStore.dispatch({type: 'isActionPointsSystem', payload: val})
setIsActionPointsSystem(false)

