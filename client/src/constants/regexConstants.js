/**
 * Matches a line entirely composed of numbers matching wall entities in the text editor.
 *
 * Used to match the beginning or end of a level in the text editor.
 * @constant
 */
// export const LINE_OF_WALLS = /^([1-9])\1*$/
export const LINE_OF_WALLS = /^[1-9]+$/

/**
 * Matches a line entirely composed of numbers matching wall entities in the text editor.
 *
 * Used to match the beginning or end of a level in the text editor.
 * @constant
 */
export const LEVEL_SEGMENT = /^[1-9](\w)\1*[1-9]$/
