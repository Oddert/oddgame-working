

import { getClockwise, getAnticlockwise } from '../rotate'
import { /*checkIsWall, checkIsBall, checkIsRotate, */ checkIsFloor, checkIsBlackhole, getCell } from '../check'

/**
 * @typedef {'up'|'right'|'down'|'left'} Directions
 */

/**
 * @typedef {Object} Position
 * @prop {number} y The Y coordinate.
 * @prop {number} x The X coordinate.
 * @prop {boolean} halted If true, the Marble is not currently able to move.
 */

/**
 * @typedef {Object} SwerveResponse
 * @prop {number} y The next Y coordinate.
 * @prop {number} x The next X coordinate.
 * @prop {boolean} halted If true, the marble will be halted on its next move.
 * @prop {boolean} status (potentially to be removed) If true, the move is valid.
 */

/**
 * @typedef {Object} MarbleMoveResponse
 * @prop {number} y The next Y coordinate.
 * @prop {number} x The next X coordinate.
 * @prop {Directions} direction The next direction the entity is facing.
 * @prop {boolean} toBeRemoved If true, the entity should be deleted.
 * @prop {boolean} halted If true, the marble will be halted on its next move.
 * @prop {boolean} status (potentially to be removed) If true, the move is valid.
 */

/**
 * For a Marble that is attempting to "swerve", check if the move is allowed.
 *
 * Called on both possible target cells the marble could swerve into.
 *
 * Checks for obstacles, and if the move is "valid" e.g. avoiding 'jumping diagonals'.
 * @param {number} y The Y coordinate of cell the Marble would 'like' to swerve into.
 * @param {number} x The X coordinate of cell the Marble would 'like' to swerve into.
 * @param {Object[][]} boardRef Copy of the board object to check.
 * @param {Directions} dir The direction the marble is facing.
 * @param {{ y: number, x: number, cell: Object }} obstacle The entity the Marble is swerving around.
 * @returns {{ valid: true, cell, y, x }}
 */
const isSwerveValid = (y, x, boardRef, dir, obstacle) => {
    // Example of moving the marble right (->)
    // x represents the Marble's current position.
    // # represents the obstacle to swerve.
    // ? represents a cell being checked by one call of this function.
    // [ ][ ][?]
    // [ ][x][#]
    // [ ][ ][?]

    // If the cell is out of bounds, cancel the request.
    if (y < 0 || y > boardRef.length - 1) return { valid: false }
    if (x < 0 || x > boardRef[0].length - 1) return { valid: false }
    
    const cell = boardRef[y] && boardRef[y][x]

    // If the target cell is not clear, deny the move.
    if (!cell || cell.type !== 'floor') return { valid: false }

    // For each direction, check the 'obstacle' entity and the cell behind.
    // If the obstacle is of the wrong type, or the space behind is not clear, deny the move.
    if (dir === 'right') {
        // if the obstacle is a wall we must determine it's type (direction) and validate this vs our marble's direction
        if (obstacle.cell.type === 'wall') {
            // if the target y is smaller then the obstacle is "above", the movement is a vector pointing top right.
            if (y < obstacle.y && ![
                4, 7, 8, 
            ].includes(obstacle.cell.direction)) {
                // reference the encoding guidelines for which wall types 6, 8, and 9 are
                return { valid: false }
            }
            // we repeat the process for the cell "under" the obstacle
            if (y > obstacle.y && ![
                1, 2, 4, 
            ].includes(obstacle.cell.direction)) {
                return { valid: false }
            }
        }
        // assuming this does not disqualify the route, the getCell function is used to check that the target is clear
        if (getCell(y, x - 1, boardRef).type !== 'floor') return { valid: false }
    }

    if (dir === 'down') {
        if (obstacle.cell.type === 'wall') {
            if (x < obstacle.x && ![
                4, 7, 8, 
            ].includes(obstacle.cell.direction)) {
                return { valid: false }
            }
            if (x > obstacle.x && ![
                6, 8, 9, 
            ].includes(obstacle.cell.direction)) {
                return { valid: false }
            }
        }
        if (getCell(y - 1, x, boardRef).type !== 'floor') return { valid: false }
    }

    if (dir === 'left') {
        if (obstacle.cell.type === 'wall') {
            if (y < obstacle.y && ![
                6, 8, 9, 
            ].includes(obstacle.cell.direction)) {
                return { valid: false }
            }
            if (y > obstacle.y && ![
                2, 3, 6, 
            ].includes(obstacle.cell.direction)) {
                return { valid: false }
            }
        }
        if (getCell(y, x + 1, boardRef).type !== 'floor') return { valid: false }
    }

    if (dir === 'up') {
        if (obstacle.cell.type === 'wall') {
            if (x < obstacle.x && ![
                1, 2, 4, 
            ].includes(obstacle.cell.direction)) {
                return { valid: false }
            }
            if (x > obstacle.x && ![
                2, 3, 6, 
            ].includes(obstacle.cell.direction)) {
                return { valid: false }
            }
        }
        if (getCell(y + 1, x, boardRef).type !== 'floor') return { valid: false }
    }

    return { valid: true, cell, y, x }
}

/**
 * Wraps the response from {@link getOffset}.
 * @param {number} y The Y coordinate of the cell to be checked.
 * @param {number} x The X coordinate of the cell to be checked.
 * @param {Object[][]} boardRef Copy of the board state to check within.
 * @returns {{ y: number, x: number, cell: Object }}
 */
const offsetResponse = (y, x, boardRef) => {
    const cell = (boardRef[y] && boardRef[y][x]) || { type: '' }
    return { y, x, cell }
}

// Note from future: is this true????? ->
// BUG: this code assumes the marble acting as obstacle is going to move in the same direction as the marble
// which is deciding to halt. Direction must be read from target and 'infront' calculated from there
/**
 * Looks ahead of a marble to return the entity located there.
 *
 * Looks ahead by a specified amount. This is intended for the recursive lookahead function.
 * @param {Directions} dir The direction the marble is facing.
 * @param {number} y The Marble's current y coordinate.
 * @param {number} x The Marble's current X coordinate.
 * @param {number} inc How many steps ahead to search.
 * @param {Object[][]} boardRef Copy of the board state to check within.
 * @returns {{ y: number, x: number, cell: Object }}
 */
const getOffset = (dir, y, x, inc, boardRef) => {
    switch (dir) {
        case 'left':
            // return boardRef[y] && boardRef[y][x - inc]
            //     ? { cell: boardRef[y][x - inc], y, x: x - inc, }
            //     : { cell: { type: 'wall', }, y, x: x - inc, }
            return offsetResponse(y, x - inc, boardRef)
        case 'right':
            return offsetResponse(y, x + inc, boardRef)
        case 'up':
            return offsetResponse(y - inc, x, boardRef)
        case 'down':
            return offsetResponse(y + inc, x, boardRef)
        default:
            return { y, x , cell: { type: 'default' }}
    }
}

/**
 * Recursively searches ahead of a given location to check if the object is expected to move.
 *
 * Checks down a chain of marbles to see if the outermost marble has a clear path to move.
 *
 * If the outermost marble is likely to move then the entire chain may be likely to move.
 *
 * Used to determine if a marble should attempt to swerve or wait to move, i.e. is the marble in a queue moving as a group,
 * or is it at the head of a stack and therefore should tumble 'down' the stack.
 * @param {Directions} dir The direction of search (direction the marble is facing).
 * @param {number} originalY The Y coordinate of the last searched position.
 * @param {number} originalX The X coordinate of the last searched position.
 * @param {Object[][]} boardRef Copy of the board object to search within.
 * @returns {boolean} If true, the Marble is likely to move.
 */
const obstacleLikelyToMove = (dir, originalY, originalX, boardRef) => {
    // if (halted) console.log('[obstacleLikelyToMove]: halted, returning false')
    // if (halted) return false

    // Object to store items searched for.
    const recursionMem = {}

    // Creates a unique identifier to lookup entities in `recursionMem`
    const createLookupHash = (y, x, type) => `${y}_${x}_${type}`

    /**
     * For a given set of coordinates, checks the adjacent entity.
     * If the entity has been encountered or is of the wrong type it returns false.
     *
     * If the entity is a marble the function calls itself again to search along a chain of marbles.
     * @param {Directions} dir The direction of search (direction the marble is facing).
     * @param {number} previousY The Y coordinate of the last searched position.
     * @param {number} previousX The X coordinate of the last searched position.
     * @returns {boolean} If true, the Marble is likely to move.
     */
    function checkAheadAndRecurse (dir, previousY, previousX) {
        // console.log('[checkAheadAndRecurse]', { dir, previousY, previousX })
        const obstacle = getOffset(dir, previousY, previousX, 1, boardRef)

        // If the entity is floor then the Marble (or chain or Marbles) may be likely to move.
        // Return a positive result.
        if (obstacle.cell.type === 'floor') return true

        // If the entity is a Marble we must search ahead.
        // There is the possibility the search has looped round.
        if (obstacle.cell.type === 'marble') {

            // Calculate the entity's hash and check if it has been encountered previously.
            const thisHash = createLookupHash(obstacle.y, obstacle.x, obstacle.type)
            if (recursionMem.hasOwnProperty(thisHash)) {                
                // If this marble has been previously encountered then we have looped at some point.
                // Return a negative result.
                return false
            } else {

                // The Marble has not been encountered previously, continue searching.
                recursionMem[thisHash] = true
                return checkAheadAndRecurse(obstacle.cell.direction, obstacle.y, obstacle.x)
            }
        }
        // The entity is not a Floor or Marble.
        // The Marble (or chain or Marbles) is blocked. Return a negative result.
        return false
    }
    // Initialise the recursion loop with the Marble's current position.
    return checkAheadAndRecurse(dir, originalY, originalX)
}

/**
 * Returns a swerve result from the given options OR rotates the Marble.
 *
 * Checks the cells to the 'left' and 'right' of the marble in it's direction of travel.
 * @param {number} y1 X coordinate of the 'left' swerve position.
 * @param {number} x1 Y coordinate of the 'left' swerve position.
 * @param {number} y2 X coordinate of the 'right' swerve position.
 * @param {number} x2 Y coordinate of the 'right' swerve position.
 * @param {Directions} dir The direction the Marble is currently facing.
 * @param {number} originalY The Marble's current Y coordinate.
 * @param {number} originalX The Marble's current X coordinate.
 * @param {boolean} halted If true, the Marble is currently halted.
 * @param {Object[][]} boardRef Copy of the board state to check within.
 * @returns {SwerveResponse}
 */
const pickDirection = (y1, x1, y2, x2, dir, originalY, originalX, halted, boardRef) => {
    // If the obstacle is likely to move then it will be 'halted', meaning it should not attempt to swerve.
    if (obstacleLikelyToMove(dir, originalY, originalX, boardRef)) {
        return { y: originalY, x: originalX, halted: true }
    }

    // Checks the entity immediately in front of the Marble
    const obstacle = getOffset(dir, originalY, originalX, 1, boardRef)

    // If the entity in front is a Rotate, return the new direction without moving.
    if (obstacle.cell.type === 'rotate') {
        return {
            y: originalY,
            x: originalX,
            direction: obstacle.cell.direction === 'clock'
                ? getClockwise(dir)
                : getAnticlockwise(dir),
        }
    }
    
    // Holds a list of potential moves if multiple are possible.
    const possibilities = []

    // Searching the "left" / "up" directions.
    if (isSwerveValid(y1, x1, boardRef, dir, obstacle).valid) possibilities.push({ y: y1, x: x1 })

    // Searching the "right" / "down" directions.
    if (isSwerveValid(y2, x2, boardRef, dir, obstacle).valid) possibilities.push({ y: y2, x: x2 })
    
    // If neither result is valid, return the original coordinates.
    if (possibilities.length === 0) return { y: originalY, x: originalX }

    // If there are valid results, pick a random one.
    return possibilities[Math.floor(Math.random() * possibilities.length)]
}

/**
 * Called when a forward move is not possible due to an obstacle in its path.
 * Attempts to 'swerve' to the sides based on direction of travel.
 *
 * Wrapper for {@link pickDirection}.
 *
 * Calls pickDirection based on the two adjacent cells the Marble may swerve into.
 * @param {number} originalY Y coordinate of the Marble's current position.
 * @param {number} originalX X coordinate of the Marble's current position.
 * @param {Object[][]} boardRef Copy of the board object to search within.
 * @param {Directions} dir The direction the marble is facing.
 * @param {boolean} halted If true, the Marble is currently halted.
 * @returns {SwerveResponse}
 */
const swerve = (originalY, originalX, boardRef, dir, halted) => {
    switch(dir) {
        case 'left':
            return pickDirection(
                originalY + 1,
                originalX - 1,
                originalY - 1,
                originalX - 1,
                dir,
                originalY,
                originalX,
                halted,
                boardRef
            )
        case 'right':
            return pickDirection(
                originalY - 1,
                originalX + 1,
                originalY + 1,
                originalX + 1,
                dir,
                originalY,
                originalX,
                halted,
                boardRef
            )
        case 'up':
            return pickDirection(
                originalY - 1,
                originalX - 1,
                originalY - 1,
                originalX + 1,
                dir,
                originalY,
                originalX,
                halted,
                boardRef
            )
        case 'down':
            return pickDirection(
                originalY + 1,
                originalX - 1,
                originalY + 1,
                originalX + 1,
                dir,
                originalY,
                originalX,
                halted,
                boardRef
            )
        default:
            return { y: originalY, x: originalX }
    }
}

/**
 * 
 * @param {Position} current The current position of the Marble.
 * @param {Position} desire The anticipated position of the Marble is moved by a single space in a given direction.
 * @param {Object[][]} boardRef Copy of the board object to search within.
 * @param {Directions} dir The direction the marble is facing.
 * @returns {MarbleMoveResponse}
 */
const moveValidator = (current, desire, boardRef, dir) => {
    /**
     * Holds a list of entities that a Marble may not swerve round.
     * List includes 'block' and 'wall' because only some types of Blocks and Walls may be swerved.
     * Checks happen later on to exempt the correct types of Blocks and Walls.
     */
    const unSwervables = [
        'diamondX', 'magnet', 'block', 'wall', 
    ]

    /**
     * Status of the desired moves validity. If false, a swerve will be attempted.
     */
    let status = true

    /**
     * If true, the obstacle may be swerved.
     */
    let swervable = true

    /**
     * If true, the Marble will be flagged for deletion.
     */
    let toBeRemoved = false

    // if (checkIsWall(desire.y, desire.x, boardRef)) status = false
    // if (checkIsBall(desire.y, desire.x, boardRef)) status = false
    // if (checkIsRotate(desire.y, desire.x, boardRef)) status = false
    if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false
    if (checkIsBlackhole(desire.y, desire.x, boardRef)) toBeRemoved = true

    // If the target is not clear, attempt to perform a swerve.
    if (!status) {
        const target = boardRef[desire.y] && boardRef[desire.y][desire.x]

        // If the target is included in the blacklist, flag them as unSwervable.
        if (target && unSwervables.includes(target.type)) {
            const isRoundBlock = target.type === 'block' && target.variant === 'round'
            const isRoundWall = target.type === 'wall' && target.variant === 'round'

            // Rounded Blocks and Walls are exempt. If the entity is not one of those, set swervable to false.
            if (!isRoundBlock && !isRoundWall) {
                swervable = false
            }
        }

        // If the item is not able to be swerved, return the current position.
        if (!swervable) return { y: current.y, x: current.x, status, toBeRemoved }

        // Attempt to swerve the obstacle
        const swerved = swerve(current.y, current.x, boardRef, dir, current.halted)

        return {
            toBeRemoved,
            status: true,
            y: swerved.y,
            x: swerved.x,
            direction: swerved.direction,
            halted: swerved.halted,
        }
    }

    // If the target is clear, return the desired position.
    return {
        status,
        toBeRemoved,
        y: desire.y,
        x: desire.x,
        direction: dir,
        halted: desire.halted,
    }

    // switch (dir) {
    //   case 'left':
    //     return { y: current.y, x: current.x, status }
    //   case 'right':
    //     if (!status) {
    //       let swerved = swerve(current.y, current.x, boardRef, dir)
    //       console.log('nah swerve that: ', swerved)
    //       return { y: swerved.y, x: swerved.x, direction: swerved.direction, status: true }
    //     }
    //     console.log('*** Givin it what it wants ***')
    //     return { y: desire.y, x: desire.x, status }
    //   case 'up':
    //     return { y: current.y, x: current.x, status }
    //   case 'down':
    //     if (!status) {
    //       let swerved = swerve(current.y, current.x, boardRef, dir)
    //       console.log('nah swerve that: ', swerved)
    //       return { y: swerved.y, x: swerved.x, direction: swerved.direction, status: true }
    //     }
    //     console.log('*** Givin it what it wants ***')
    //     return { y: desire.y, x: desire.x, status }
    //     // return { y: current.y, x: current.x, status }
    //   default:
    //     console.log('def')
    //     return { y: current.y, x: current.x, status }
    // }
}

/**
 * Wraps the response from the {@link moveValidator}.
 * @param {MarbleMoveResponse} move The response from the moveValidator.
 * @returns {MarbleMoveResponse}
 */
const moveResponse = move => ({
    status: true,
    y: move.y,
    x: move.x,
    direction: move.direction,
    toBeRemoved: move.toBeRemoved,
    halted: move.halted,
})

/**
 * Calls {@link moveValidator} with an Up direction request.
 * @prop {number} y The current Y coordinate.
 * @prop {number} x The current X coordinate.
 * @param {Object[][]} boardRef A copy of the board object.
 * @prop {Directions} direction The next direction the entity is facing.
 * @prop {boolean} halted If true, the marble is currently not moving.
 * @returns {MarbleMoveResponse}
 */
function mUp (y, x, boardRef, dir, halted) {
    const move = moveValidator(
        { y, x, halted },
        { y: y - 1, x },
        boardRef,
        dir
    )
    if (!move.status) {
        return {
            y,
            x,
            status: false,
            toBeRemoved: move.toBeRemoved,
            halted: move.halted,
            direction: move.direction,
        }
    }
    return moveResponse(move)
}

/**
 * Calls {@link moveValidator} with a Down direction request.
 * @prop {number} y The current Y coordinate.
 * @prop {number} x The current X coordinate.
 * @param {Object[][]} boardRef A copy of the board object.
 * @prop {Directions} direction The next direction the entity is facing.
 * @prop {boolean} halted If true, the marble is currently not moving.
 * @returns {MarbleMoveResponse}
 */
function mDown (y, x, boardRef, dir, halted) {
    // if (checkIsWall(y + 1, x, boardRef)) return { y, x, status: false }
    // if (y + 1 >= boardRef[0].length) return { y, x, status: false }
    // return { x, y: y + 1, status: true }

    const move = moveValidator(
        { y, x, halted },
        { y: y + 1, x },
        boardRef,
        dir
    )
    if (!move.status) {
        return {
            y,
            x,
            status: false,
            toBeRemoved: move.toBeRemoved,
            halted: move.halted,
            direction: move.direction,
        }
    }
    return moveResponse(move)
}

/**
 * Calls {@link moveValidator} with a Left direction request.
 * @prop {number} y The current Y coordinate.
 * @prop {number} x The current X coordinate.
 * @param {Object[][]} boardRef A copy of the board object.
 * @prop {Directions} direction The next direction the entity is facing.
 * @prop {boolean} halted If true, the marble is currently not moving.
 * @returns {MarbleMoveResponse}
 */
function mLeft (y, x, boardRef, dir, halted) {
    const move = moveValidator(
        { y, x, halted },
        { y, x: x - 1 },
        boardRef,
        dir
    )
    if (!move.status) {
        return {
            y,
            x,
            status: false,
            toBeRemoved: move.toBeRemoved,
            halted: move.halted,
            direction: move.direction,
        }
    }
    return moveResponse(move)
}

/**
 * Calls {@link moveValidator} with a Right direction request.
 * @prop {number} y The current Y coordinate.
 * @prop {number} x The current X coordinate.
 * @param {Object[][]} boardRef A copy of the board object.
 * @prop {Directions} direction The next direction the entity is facing.
 * @prop {boolean} halted If true, the marble is currently not moving.
 * @returns {MarbleMoveResponse}
 */
function mRight (y, x, boardRef, dir, halted) {
    // Desired move (to right) is validated by a universal function
    const move = moveValidator(
        { y, x, halted },
        { y, x: x + 1 },
        boardRef,
        dir
    )
    // The status attr returns is move is valid
    if (!move.status) {
        return {
            y,
            x,
            status: false,
            toBeRemoved: move.toBeRemoved,
            halted: move.halted,
            direction: move.direction,
        }
    }
    // Validator may make an adjustment to the request (e.g changing object direction) so return y,x is used
    return moveResponse(move)
}

/**
 * Handles the move for a Marble.
 * @param {number} y The Marble's Y coordinate.
 * @param {number} x The Marble's X coordinate.
 * @param {Object[][]} boardRef A copy of the board object.
 * @param {number} tick The game tick (unused).
 * @prop {Directions} direction The next direction the entity is facing.
 * @prop {boolean} halted If true, the marble is currently not moving.
 * @returns {MarbleMoveResponse}
 */
const handleMove = (y, x, boardRef, tick, dir, halted) => {
    switch (dir) {
        case 'up':
            return mUp(y, x, boardRef, dir, halted)
        case 'down':
            return mDown(y, x, boardRef, dir, halted)
        case 'left':
            return mLeft(y, x, boardRef, dir, halted)
        case 'right':
            return mRight(y, x, boardRef, dir, halted)
        default:
            return { x, y, halted, direction: dir, toBeRemoved: false, status: true }
    }
}

export default handleMove
