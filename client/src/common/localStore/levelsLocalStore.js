import { USER_LEVELS_LOCAL_STORE_KEY } from '../../constants/commonConstants'

import { getLocalStore, updateLocalStore, writeLocalStore } from './objectLocalStorage'

export const loadUserLevels = () => {
    return getLocalStore(USER_LEVELS_LOCAL_STORE_KEY)
}

export const saveUserLevel = (name, text) => {
    updateLocalStore(
        USER_LEVELS_LOCAL_STORE_KEY,
        { [name]: text },
    )
    return loadUserLevels()
}

export const deleteUserLevels = (name) => {
    const retrieved = loadUserLevels()
    delete retrieved[name]
    return writeLocalStore(USER_LEVELS_LOCAL_STORE_KEY, retrieved)
}
