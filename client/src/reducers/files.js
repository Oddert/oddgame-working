
import types from '../actions/types'

import { saveUserLevel } from '../common/localStore/levelsLocalStore'

import initialState from '../constants/initialState'
import reducerFilter from '../constants/reducerFilter'

import { convertLevelSetToText, convertTextToLevelSet } from '../utils/textEditorUtils'

const openSet = (state, { isUserLevel, levelSet }) => {
    console.log(isUserLevel, levelSet)
    return {
        ...state,
        isUserLevel,
        levelSet,
        name: levelSet.name.replace(/.KYE$/i, ''),
        text: convertLevelSetToText(levelSet),
    }
}

const saveUser = (state) => {
    const set = convertTextToLevelSet(state.text)
    const levelSet = !set.errors.length
        ? set.set
        : {
            name: '',
            levels: [],
        }
    return {
        ...state,
        unSavedChanges: false,
        levelSet,
    }
}

const saveUserAndNew = (state) => {
    saveUserLevel(state.levelSet.name, state.text)
    return {
        ...state,
        unSavedChanges: false,
        name: '',
        levelSet: {
            name: '',
            levels: [],
        },
        text: '',
    }
}

const toggleOpen = (state, { value, override }) => {
    const { open } = state
    if (open === undefined) {
        return {
            ...state,
            open: false,
        }
    }
    return {
        ...state,
        open: override ? !!value : !open,
    }
}

const updateName = (state, { name }) => {
    return {
        ...state,
        name,
        levelSet: {
            ...state.levelSet,
            name,
        },
        unSavedChanges: true,
    }
}

const updateText = (state, { text }) => {
    return {
        ...state,
        text,
        unSavedChanges: true,
    }
}

const files = (state = initialState.files, action) => {
    const { payload, type } = action
    switch(type) {
        case types.FILES_OPEN_SET: return openSet(state, payload)
        case types.FILES_SAVE_USER: return saveUser(state)
        case types.FILES_SAVE_USER_AND_NEW: return saveUserAndNew(state)
        case types.FILES_TOGGLE_OPEN: return toggleOpen(state, payload)
        case types.FILES_UPDATE_NAME: return updateName(state, payload)
        case types.FILES_UPDATE_TEXT: return updateText(state, payload)
        default:
            if (!type.match(reducerFilter('file'))) {
                console.warn(
                    `[files reducer]: default route taken in switch for type: ${type}`, { state, action }
                )
            }
            return state
    }
}

export default files
