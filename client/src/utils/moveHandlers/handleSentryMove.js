
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
 * Checks the target cell to determine if the entity is going to 'bounce' (change direction 180 degrees).
 * @param {number} targetY 
 * @param {number} targetX 
 * @param {Object[][]} boardRef 
 * @param {Directions} dir 
 * @returns {(null|{ source: { x: number, y: number }, target: { x: number, y: number } })}
 */
const checkIsBounce = (targetY, targetX, boardRef, dir) => {
    const moveTypes = [
        'block', 'timer', 'marble', 'slider', 
    ]
    const target = boardRef[targetY][targetX].type

    if (!moveTypes.includes(target)) return null

    let valid = false
    let x = targetX
    let y = targetY

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
            console.error(`[handleSentryMove > checkIsBounce] No such direction type ${dir}`)
    }

    if (valid) {
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
    let status = true
    let toBeRemoved = false

    if (checkIsBlackhole(desire.y, desire.x, boardRef)) toBeRemoved = true
    if (checkIsRotate(desire.y, desire.x, boardRef)) {
        return {
            y: current.y,
            x: current.x,
            direction: getRotation(current.direction, desire, boardRef),
            toBeRemoved,
        }
    }
    if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false

    const bounce = checkIsBounce(desire.y, desire.x, boardRef, current.direction)

    if (!status) {
        return {
            y: current.y,
            x: current.x,
            direction: dirMap[current.direction],
            toBeRemoved,
            bounce,
        }
    }

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
