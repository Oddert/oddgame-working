/**
 * Picks a random value from an array.
 * @param {any[]} arr The array to pick a random value from.
 * @returns {any}
 */
export const ranArr = arr => arr[Math.floor(Math.random() * arr.length)]

/**
 * Picks a random number from within a range.
 * @param {number} min The minimum number.
 * @param {number} max The maximum number.
 * @returns {number}
 */
export const ranNum = (min = 0, max = 9) => Math.floor(Math.random() * (max + 1 - min)) + min
