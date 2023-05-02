// OPTIMIZE: Double check these files for potential unused code / vars
import { getRotation } from '../rotate'
import { checkIsFloor, checkIsRotate, checkIsBlackhole } from '../check'

/**
 * @typedef {'up'|'right'|'down'|'left'} Directions
 */

/**
 * @typedef {Object} SliderMoveRequest
 * @prop {number} y The next Y coordinate.
 * @prop {number} x The next X coordinate.
 * @prop {Directions} direction The next direction the entity is facing.
 */

/**
 * @typedef {Object} SliderMoveResponse
 * @prop {number} y The next Y coordinate.
 * @prop {number} x The next X coordinate.
 * @prop {Directions} direction The next direction the entity is facing.
 * @prop {boolean} toBeRemoved If true the entity should be deleted.
 */

/**
 * Takes a current status and a 'requested' next position, checks the validity of the request, and returns a new Move object.
 *
 * The validator checks the next position is clear and checks if the entity is to be deleted.
 * @param {SliderMoveRequest} current The current position and direction of the entity.
 * @param {SliderMoveRequest} desire The next position of the entity to be checked.
 * @param {Object[][]} boardRef A copy of the board object.
 * @returns {SliderMoveResponse}
 */
const moveValidator = (current, desire, boardRef) => {
    let positionMoveAllowed = true
    let toBeRemoved = false

    if (!checkIsFloor(desire.y, desire.x, boardRef)) positionMoveAllowed = false
    if (checkIsBlackhole(desire.y, desire.x, boardRef)) toBeRemoved = true
    if (checkIsRotate(desire.y, desire.x, boardRef)) {
        return {
            y: current.y,
            x: current.x,
            direction: getRotation(current.direction, desire, boardRef),
            toBeRemoved,
        }
    }

    if (!positionMoveAllowed) {
        return { y: current.y, x: current.x, toBeRemoved }
    }

    return { y: desire.y, x: desire.x, toBeRemoved }
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
})

/**
 * Calls {@link moveValidator} with a Left direction request.
 * @prop {number} y The current Y coordinate.
 * @prop {number} x The current X coordinate.
 * @param {Object[][]} boardRef A copy of the board object.
 * @prop {Directions} direction The next direction the entity is facing.
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
 * @param {SliderMoveResponse} move The response from the moveValidator.
 * @prop {number} y The current Y coordinate.
 * @prop {number} x The current X coordinate.
 * @param {Object[][]} boardRef A copy of the board object.
 * @prop {Directions} direction The next direction the entity is facing.
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
 * @prop {number} y The current Y coordinate.
 * @prop {number} x The current X coordinate.
 * @param {Object[][]} boardRef A copy of the board object.
 * @prop {Directions} direction The next direction the entity is facing.
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
 * @prop {number} y The current Y coordinate.
 * @prop {number} x The current X coordinate.
 * @param {Object[][]} boardRef A copy of the board object.
 * @prop {Directions} direction The next direction the entity is facing.
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
 * Computes a Slider entity's next state.
 * @category Utils
 * @subcategory Move Handlers
 * @param {number} y The timer's current Y coordinate on the board.
 * @param {number} x The timer's current X coordinate on the board.
 * @param {Object[][]} board A copy of the board object.
 * @param {number} tick The current game tick.
 * @param {number} time The timer's current time remaining.
 * @param {number} speed The timer's speed.
 * @returns {{ time: number, toBeRemoved: boolean }}
 */
const handleSliderMove = (y, x, boardRef, tick, direction) => {
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

export default handleSliderMove
