
import { checkIsRotate, checkIsFloor, checkIsBlackhole } from '../check'
import { getRotation } from '../rotate'

/**
 * @typedef {'up'|'right'|'down'|'left'} Directions
 */

/**
 * @typedef {Object} SliderMoveResponse
 * @prop {number} y The next Y coordinate.
 * @prop {number} x The next X coordinate.
 * @prop {Directions} direction The next direction the entity is facing.
 * @prop {boolean} toBeRemoved If true, the entity should be deleted.
 * @prop {boolean} bounce If true, the entity will change direction.
 */

/**
 * Simple lookup object to find a direction's opposite.
 */
const dirMap = {
    left: 'right',
    right: 'left',
    up: 'down',
    down: 'up',
}

/**
 * Wraps the response from the {@link moveValidator}.
 * @param {SliderMoveResponse} move The response from the moveValidator.
 * @returns {SliderMoveResponse}
 */
const moveResponse = move => ({
    y: move.y,
    x: move.x,
    direction: move.direction,
    toBeRemoved: move.toBeRemoved,
    bounce: move.bounce,
})

/**
 * When facing an entity, determine if that entity is to be pushed forwards.
 *
 * Blocks, Timers, Marbles, and Sliders may be nudged forward if there is a clear floor in the direction of travel.
 * @param {number} targetY The Y coordinate of the entity in front of the Sentry.
 * @param {number} targetX The X coordinate of the entity in front of the Sentry.
 * @param {Object[][]} boardRef Copy of the board object to search within.
 * @param {Directions} dir The direction of travel for the Sentry.
 * @returns {(null|{ source: { x: number, y: number }, target: { x: number, y: number } })}
 */
const checkIsBounce = (targetY, targetX, boardRef, dir) => {
    /**
     * List of whitelisted entities the sentry may bounce off of.
     */
    const moveTypes = [
        'block', 'timer', 'marble', 'slider', 
    ]

    // Retrieve the entity type the Sentry is facing.
    const target = boardRef[targetY][targetX].type

    // If the entity type is not in the allowed list, return a negative result.
    if (!moveTypes.includes(target)) return null

    /**
     * Tracks if the bounce is allowed.
     */
    let valid = false

    /**
     * X coordinate of the cell to be moved into, initialised as the entity's current X.
     */
    let x = targetX

    /**
     * Y coordinate of the cell to be moved into, initialised as the entity's current Y.
     */
    let y = targetY

    // For each direction, check the cell immediately in front of the entity being bounced.
    // If the space if clear (it is a Floor), list the move as valid and update the relevant coordinate.
    switch(dir) {
        case 'left':
            if (boardRef[targetY][targetX - 1].type === 'floor') {
                x = targetX - 1
                valid = true
            }
            break
        case 'right':
            if (boardRef[targetY][targetX + 1].type === 'floor') {
                x = targetX + 1
                valid = true
            }
            break
        case 'up':
            if (boardRef[targetY - 1][targetX].type === 'floor') {
                y = targetY - 1
                valid = true
            }
            break
        case 'down':
            if (boardRef[targetY + 1][targetX].type === 'floor') {
                y = targetY + 1
                valid = true
            }
            break
        default:
            console.error(
                `[src/utils/moveHandlers/handleSentryMove] > checkIsBounce(): No such direction type "${dir}"`
            )
    }

    // If the move has been found to be valid, return the instructions for the entity's new position as well as its origin.
    if (valid) {
        // 'source' is the cell currently occupied.
        // 'target' is the cell the entity will be pushed into.
        return {
            source: {
                y: targetY,
                x: targetX,
            },
            target: {
                y, x,
            },
        }
    }

    // The entity is blocked by something else, return a negative result.
    return null
}

/**
 * Takes a current status and a 'requested' next position, checks the validity of the request, and returns a new Move object.
 *
 * The validator checks the next position is clear and checks if the entity is to be deleted.
 * @param {SliderMoveResponse} current 
 * @param {SliderMoveResponse} desire 
 * @param {Object[][]} boardRef 
 * @returns {SliderMoveResponse}
 */
const moveValidator = (current, desire, boardRef) => {
    /**
     * Tracks if the move forward is valid.
     */
    let status = true

    /**
     * Tracks if the sentry should be deleted.
     */
    let toBeRemoved = false

    // If the position to move to contains a Blackhole, flag the sentry for deletion.
    if (checkIsBlackhole(desire.y, desire.x, boardRef)) toBeRemoved = true

    // If the sentry is faced with a Rotate, cancel its forward movement and rotate it around.
    if (checkIsRotate(desire.y, desire.x, boardRef)) {
        return {
            y: current.y,
            x: current.x,
            direction: getRotation(current.direction, desire, boardRef),
            toBeRemoved,
        }
    }

    // If the cell in front is not a floor the sentry cannot move forward.
    if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false

    // Calculate if the entity blocking the sentry may be 'bounced' (nudged forward one cell).
    const bounce = checkIsBounce(desire.y, desire.x, boardRef, current.direction)

    // The entity is not allowed to move forward, return the results.
    if (!status) {
        return {
            y: current.y,
            x: current.x,
            direction: dirMap[current.direction],
            toBeRemoved,
            bounce,
        }
    }
    
    // The entity is allowed to move forward.
    return {
        y: desire.y,
        x: desire.x,
        direction: current.direction,
        toBeRemoved,
        bounce,
    }
}

/**
 * Calls {@link moveValidator} with a Left direction request.
 * @param {number} y The timer's current Y coordinate on the board.
 * @param {number} x The timer's current X coordinate on the board.
 * @param {Object[][]} boardRef A copy of the board object.
 * @param {Directions} direction The direction the Shooter is facing.
 * @returns {SliderMoveResponse}
 */
const mLeft = (y, x, boardRef, direction) => {
    const move = moveValidator(
        { y, x, direction },
        { y, x: x - 1, direction },
        boardRef
    )
    return moveResponse(move)
}

/**
 * Calls {@link moveValidator} with a Right direction request.
 * @param {number} y The timer's current Y coordinate on the board.
 * @param {number} x The timer's current X coordinate on the board.
 * @param {Object[][]} boardRef A copy of the board object.
 * @param {Directions} direction The direction the Shooter is facing.
 * @returns {SliderMoveResponse}
 */
const mRight = (y, x, boardRef, direction) => {
    const move = moveValidator(
        { y, x, direction },
        { y, x: x + 1, direction },
        boardRef
    )
    return moveResponse(move)
}

/**
 * Calls {@link moveValidator} with an Up direction request.
 * @param {number} y The timer's current Y coordinate on the board.
 * @param {number} x The timer's current X coordinate on the board.
 * @param {Object[][]} boardRef A copy of the board object.
 * @param {Directions} direction The direction the Shooter is facing.
 * @returns {SliderMoveResponse}
 */
const mUp = (y, x, boardRef, direction) => {
    const move = moveValidator(
        { y, x, direction },
        { y: y - 1, x, direction },
        boardRef
    )
    return moveResponse(move)
}

/**
 * Calls {@link moveValidator} with a Down direction request.
 * @param {number} y The timer's current Y coordinate on the board.
 * @param {number} x The timer's current X coordinate on the board.
 * @param {Object[][]} boardRef A copy of the board object.
 * @param {Directions} direction The direction the Shooter is facing.
 * @returns {SliderMoveResponse}
 */
const mDown = (y, x, boardRef, direction) => {
    const move = moveValidator(
        { y, x, direction },
        { y: y + 1, x, direction },
        boardRef
    )
    return moveResponse(move)
}

/**
 * Handles the conditional creation of an entity from the Shooter.
 *
 * Returned object tells the Shooter if it is allowed to emit, and specifies the entity details if so.
 * @category Utils
 * @subcategory Move Handlers
 * @param {number} y The timer's current Y coordinate on the board.
 * @param {number} x The timer's current X coordinate on the board.
 * @param {Object[][]} boardRef A copy of the board object.
 * @param {number} tick The current game tick.
 * @param {Directions} direction The direction the Shooter is facing.
 * @param {number} speed The sentry's speed. REVIEW: verify if this is to stay.
 * @returns {Target}
 */
const handleMove = (y, x, boardRef, tick, direction, speed = 1) => {
    if (tick % speed) return { x, y, direction }
    switch (direction) {
        case 'left':
            return mLeft(y, x, boardRef, direction)
        case 'right':
            return mRight(y, x, boardRef, direction)
        case 'up':
            return mUp(y, x, boardRef, direction)
        case 'down':
            return mDown(y, x, boardRef, direction)
        default:
            return { x, y, direction }
    }
}

export default handleMove
