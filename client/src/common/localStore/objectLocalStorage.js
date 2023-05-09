import { isObject } from '../../utils/commonUtils'

/**
 * Retrieves information for a given key from the localStore.
 *
 * If the item is not defined or is not able to be JSON parsed an empty object is returned.
 * @param {string} key The local store key to retrieve.
 * @returns {object|array|string}
 */
export const getLocalStore = (key) => {
    const retrieved = localStorage.getItem(key)
    try {
        const parsed = JSON.parse(retrieved)
        return parsed
    } catch(error) {
        return {}
    }
}

/**
 * Deletes the data for a local store key if it exists.
 *
 * Executes the delete command but returns true or false base on whether there was data available to begin with.
 * @param {string} key The local store key to delete.
 * @returns {boolean} True if data for the key previously existed, false if it did not.
 */
export const removeLocalStore = (key) => {
    const testItem = localStorage.getItem(key)
    localStorage.removeItem(key)
    return !(testItem === undefined)
}

/**
 * Writes data to a given local store key.
 *
 * Returns a boolean based on whether data was already assigned to the key.
 * @param {string} key The local store key to write to.
 * @param {any} data The data to write.
 * @returns {boolean} If true, there was data that has been overwritten. If false, the key was empty.
 */
export const writeLocalStore = (key, data) => {
    const testItem = localStorage.getItem(key)
    localStorage.setItem(key, JSON.stringify(data))
    return !(testItem === undefined)
}

/**
 * Updates the data for a an object in a given key while preserving data already there.
 *
 * Combines the object provided with the object retrieved from the store.
 *
 * If the key is not an object or is undefined the operation will be canceled.
 * @param {string} key The local store key to write to.
 * @param {object} data The data to write.
 * @returns {boolean} If true, the write was successful, false if the write was aborted.
 */
export const updateLocalStore = (key, data) => {
    const retrieved = getLocalStore(key)
    if (retrieved && isObject(retrieved)) {
        try {
            writeLocalStore(key, { ...retrieved, ...data })
            return true
        } catch(error) {
            return false
        }
    } else {
        writeLocalStore(key, data)
        return true
    }
}
