
import types from '../actions/types'
import { deleteUserLevels, saveUserLevel } from '../common/localStore/levelsLocalStore'

import initialState from '../constants/initialState'
import reducerFilter from '../constants/reducerFilter'

import { mapUserLevelsToMenu } from '../utils/textEditorUtils'

const deleteUser = (state, { name }) => {
    deleteUserLevels(name)
    return {
        ...state,
        userLevels: state.userLevels.filter(
            level => level.name !== name
        ),
    }
}

const saveUser = (state, { name, text }) => {
    const userLevels = saveUserLevel(name, text)
    return {
        ...state,
        userLevels: mapUserLevelsToMenu(userLevels),
        unSavedChanges: false,
    }
}

const writeUser = (state, payload) => {
    return {
        ...state,
        userLevels: payload.userLevels,
    }
}

const files = (state = initialState.files, action) => {
    const { payload, type } = action
    switch(type) {
        case types.LEVELS_DELETE_USER: return deleteUser(state, payload)
        case types.FILES_SAVE_USER: return saveUser(state, payload)
        case types.LEVELS_WRITE_USER: return writeUser(state, payload)
        default:
            if (!type.match(reducerFilter('levels'))) {
                console.warn(
                    `[levels reducer]: default route taken in switch for type: ${type}`, { state, action }
                )
            }
            return state
    }
}

export default files
