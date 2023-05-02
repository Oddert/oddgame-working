import { checkIsFloor } from '../check'

/**
 * @typedef {'up'|'right'|'down'|'left'} Directions
 */

/**
 * @typedef {Object} EmitOption
 * @prop {'marble'|'slider'} type The emitter entity types.
 * @prop {Directions} direction The Shooter direction.
 */

/**
 * @typedef {Object} EmitOptions
 * @prop {EmitOption} marble 
 * @prop {EmitOption} slider 
 */

/**
 * @typedef {Object} Target
 * @param {number} y The next Y coordinate of the entity.
 * @param {number} x The next X coordinate of the entity.
 * @param {boolean} status The status of the emitter. If false, the Shooter will not emit an item.
 * @param {EmitOptions} data The attributes of the created entity.
 */

/**
 * Creates a set of options for the emitter response.
 * @param {Directions} direction The current direction the Shooter is facing.
 * @returns {EmitOptions}
 */
const emitOptions = direction => ({
    marble: { type: 'marble', direction },
    slider: { type: 'slider', direction },
})

/**
 * Conditionally computes the state and position of the emitted entity.
 *
 * Returns false if the entity cannot be created.
 * @param {number} y The timer's current Y coordinate on the board.
 * @param {number} x The timer's current X coordinate on the board.
 * @param {Object[][]} boardRef A copy of the board object.
 * @param {Directions} dir The current direction the Shooter is facing.
 * @param {string} emit The entity type the shooter emits.
 * @returns {(false|Target)}
 */
const targetCell = (y, x, boardRef, dir, emit) => {

    // Verify if the Shooter entity coordinates are out of bounds.
    if (y > boardRef.length) return false
    if (y < 0) return false
    if (x > boardRef[0].length) return false
    if (x < 0) return false

    let status = true
    let target = { y, x }

    // Compute the next coordinate position for the entity based on the direction.
    switch(dir) {
        case 'left':
            target = { y, x: x - 1 }
            break;
        case 'right':
            target = { y, x: x + 1 }
            break;
        case 'up':
            target = { y: y - 1, x }
            break;
        case 'down':
            target = { y: y + 1, x }
            break;
        default:
            return false
    }

    // Having calculated the target entity's potential position, verify this position is valid.
    // Check that the cell exists.
    if (!(boardRef[target.y] && boardRef[target.y][target.x])) status = false
    // console.log(target.y, target.x, checkIsFloor(target.y, target.x, boardRef))
    // Check that the cell is of type Floor. A Shooter may not overwrite an existing entity.
    if (!checkIsFloor(target.y, target.x, boardRef)) status = false
    
    // If any check has failed, return false.
    if (!status) return false

    return {
        ...target,
        data: emitOptions(dir)[emit],
        status: true,
    }
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
 * @param {string} emit The entity type the shooter emits.
 * @returns {Target}
 */
const handleShoot = (y, x, boardRef, tick, direction, emit) => {
    const target = targetCell(y, x, boardRef, direction, emit)
    if (!target) {
        return {
            status: false,
            data: { type: 'floor' },
        }
    }
    return target
}

export default handleShoot
