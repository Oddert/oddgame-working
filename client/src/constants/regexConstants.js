/**
 * Matches a line entirely composed of numbers matching wall entities in the text editor.
 *
 * Used to match the beginning or end of a level in the text editor.
 * @constant
 */
// export const LINE_OF_WALLS = /^([1-9])\1*$/
export const LINE_OF_WALLS = /^[1-9]+$/

/**
 * Matches a line within a level that is a valid format.
 *
 * Lines must begin and end with a wall and only contain valid characters.
 * @constant
 */
export const LEVEL_SEGMENT = /^[1-9](\s|!|"|\*|[1-9]|<|>|B|C|D|E|F|H|K|L|R|S|T|U|\[|\^|[a-i]|l|r|s|u|v|w|x|y|z|{|\||}|~)+[1-9]$/

/**
 * Matches a valid entity characters.
 * @constant
 */
export const VALID_ENTITY_CODE = /\s|!|"|\*|[1-9]|<|>|B|C|D|E|F|H|K|L|R|S|T|U|\[|\^|[a-i]|l|r|s|u|v|w|x|y|z|{|\||}|~/
