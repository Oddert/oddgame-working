/**
 * Converts a direction to its next direction if rotated clockwise.
 * @param {'left'|'right'|'up'|'down'} dir The current direction to be converted.
 * @returns {'left'|'right'|'up'|'down'}
 */
export const  getClockwise = dir => {
    switch (dir) {
        case 'left':
            return 'up'
        case 'right':
            return 'down'
        case 'up':
            return 'right'
        case 'down':
            return 'left'
        default:
            console.error(`[src/utils/rotate:getClockwise] Invalid direction found: ${dir}`)
            return dir
    }
}

/**
 * Converts a direction to its next direction if rotated anti-clockwise.
 * @param {'left'|'right'|'up'|'down'} dir The current direction to be converted.
 * @returns {'left'|'right'|'up'|'down'}
 */
export const getAnticlockwise = dir => {
    switch (dir) {
        case 'left':
            return 'down'
        case 'right':
            return 'up'
        case 'up':
            return 'left'
        case 'down':
            return 'right'
        default:
            console.error(`[src/utils/rotate:getAnticlockwise]Invalid direction found: ${dir}`)
            return dir
    }
}

/**
 * Gets a cells next rotation based on its rotation direction in the boardRef.
 *
 * Entity on the boardRef must have a `direction` attribute.
 *
 * Does not actually rotate the cell, it simply returns the next value based on the board.
 *
 * Wrapper function for {@link getClockwise} and {@link getAnticlockwise}
 * @param {'left'|'right'|'up'|'down'} dir The current direction to be converted.
 * @param {{ x: number, y: number }} desire The coordinates of the cell to be rotated.
 * @param {Object[][]} boardRef A copy of the board.
 * @returns {'left'|'right'|'up'|'down'}
 */
export const getRotation = (dir, desire, boardRef) =>
    boardRef[desire.y][desire.x]?.direction === 'clock'
        ? getClockwise(dir)
        : getAnticlockwise(dir)
