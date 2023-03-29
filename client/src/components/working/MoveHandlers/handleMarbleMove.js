

import { getClockwise, getAnticlockwise } from '../Utils/rotate'
import { /*checkIsWall, checkIsBall, checkIsRotate, */ checkIsFloor, checkIsBlackhole, getCell } from '../Utils/check'

function mUp (y, x, boardRef, dir, halted) {
    const move = moveValidator({ y, x, halted }, { y: y - 1, x }, boardRef, dir)
    if (!move.status) return { y, x, status: false, toBeRemoved: move.toBeRemoved, halted: move.halted }
    return { y: move.y, x: move.x, direction: move.direction, status: true, toBeRemoved: move.toBeRemoved, halted: move.halted }
}

function mDown (y, x, boardRef, dir, halted) {
    // if (checkIsWall(y + 1, x, boardRef)) return { y, x, status: false }
    // if (y + 1 >= boardRef[0].length) return { y, x, status: false }
    // return { x, y: y + 1, status: true }

    const move = moveValidator({ y, x, halted }, { y: y + 1, x }, boardRef, dir)
    if (!move.status) return { y, x, status: false, toBeRemoved: move.toBeRemoved, halted: move.halted }
    return { y: move.y, x: move.x, direction: move.direction, status: true, toBeRemoved: move.toBeRemoved, halted: move.halted }
}

function mLeft (y, x, boardRef, dir, halted) {
    const move = moveValidator({ y, x, halted }, { y, x: x - 1 }, boardRef, dir)
    if (!move.status) return { y, x, status: false, toBeRemoved: move.toBeRemoved, halted: move.halted }
    return { y: move.y, x: move.x, direction: move.direction, status: true, toBeRemoved: move.toBeRemoved, halted: move.halted }
}

// A move to the right is requested from the controller
function mRight (y, x, boardRef, dir, halted) {
    // Desired move (to right) is validated by a universal function
    const move = moveValidator({ y, x, halted }, { y, x: x + 1 }, boardRef, dir)
    // The status attr returns is move is valid
    if (!move.status) return { y, x, status: false, toBeRemoved: move.toBeRemoved, halted: move.halted }
    // Validator may make an adjustment to the request (e.g changin object direction) so return y,x is used
    return { y: move.y, x: move.x, direction: move.direction, status: true, toBeRemoved: move.toBeRemoved, halted: move.halted }
}

function swerve (originalY, originalX, boardRef, dir, halted) {

    switch(dir) {
        case 'left':
            return pickDirection(originalY + 1, originalX - 1, originalY - 1, originalX - 1, dir, originalY, originalX, halted)
        case 'right':
            return pickDirection(originalY - 1, originalX + 1, originalY + 1, originalX + 1, dir, originalY, originalX, halted)
        case 'up':
            return pickDirection(originalY - 1, originalX - 1, originalY - 1, originalX + 1, dir, originalY, originalX, halted)
        case 'down':
            return pickDirection(originalY + 1, originalX - 1, originalY + 1, originalX + 1, dir, originalY, originalX, halted)
        default:
            return { y: originalY, x: originalX }
    }

    function pickDirection (y1, x1, y2, x2, dir, originalY, originalX, halted) {

        // console.log('#')
        if (obsticalLikelyToMove(dir, originalY, originalX, halted)) return { y: originalY, x: originalX, halted: true }
        // console.log('##')

        const obstical = getOffset(dir, originalY, originalX, 1)
        // console.log(obstical)
        if (obstical.cell.type === 'rotate') {
            return {
                y: originalY,
                x: originalX,
                direction: obstical.cell.direction === 'clock' ? getClockwise(dir) : getAnticlockwise(dir),
            }
        }
        const possibilities = []
        // going "left" / "up"
        // console.log({ obstical })
        if (swerveValid(y1, x1, dir, null, obstical).valid) possibilities.push({ y: y1, x: x1 })
        // going "right" / "down"
        if (swerveValid(y2, x2, dir, null, obstical).valid) possibilities.push({ y: y2, x: x2 })
        if (possibilities.length === 0) return { y: originalY, x: originalX }
        // console.log({ possibilities })
        return possibilities[Math.floor(Math.random() * possibilities.length)]


        // Note from future: is this true????? ->
        // BUG: this code assumes the marble acting as obstical is going to move in the same direction as the marble
        // which is deciding to halt. Direction must be read from target and 'infront' calculated from there
        function getOffset (dir, y, x, inc) {
            switch (dir) {
                case 'left':
                    // return boardRef[y] && boardRef[y][x - inc]
                    //     ? { cell: boardRef[y][x - inc], y, x: x - inc, }
                    //     : { cell: { type: 'wall', }, y, x: x - inc, }
                    return {
                        y,
                        x: x - inc,
                        cell: boardRef[y] && boardRef[y][x - inc] ? boardRef[y][x - inc] : { type: '' },
                    }
                case 'right':
                    return {
                        y,
                        x: x + inc,
                        cell: boardRef[y] && boardRef[y][x + inc] ? boardRef[y][x + inc] : { type: '' },
                    }
                case 'up':
                    return {
                        y: y - inc,
                        x,
                        cell: boardRef[y] && boardRef[y - inc][x] ? boardRef[y - inc][x] : { type: '' },
                    }
                case 'down':
                    return {
                        y: y + inc,
                        x,
                        cell: boardRef[y] && boardRef[y + inc][x] ? boardRef[y + inc][x] : { type: '' },
                    }
                default:
                    return { cell: { type: 'default' }, y, x }
            }
        }

        function obsticalLikelyToMove (dir, originalY, originalX, halted) {
            // if (halted) console.log('[obsticalLikelyToMove]: halted, returning false')
            // if (halted) return false
            const recursionMem = {}
            const recHash = (y, x, type) => `${y}_${x}_${type}`
            function checkAheadRecurse (dir, previousY, previousX) {
                // console.log('[checkAheadRecurse]', { dir, previousY, previousX })
                const obstical = getOffset(dir, previousY, previousX, 1)

                if (obstical.cell.type === 'floor') return true
                if (obstical.cell.type === 'marble') {
                    if (recursionMem.hasOwnProperty(recHash(obstical.y, obstical.x, obstical.type))) {
                        return false
                    } else {
                        recursionMem[recHash(obstical.y, obstical.x, obstical.type)] = true
                        return checkAheadRecurse(obstical.cell.direction, obstical.y, obstical.x)
                    }
                }

                return false
            }
            return checkAheadRecurse (dir, originalY, originalX)
        }

    } // pickDirection

    function swerveValid (y, x, dir, rotation, obstical) {
    // called on both possible target cells the marble could swerve into
    // this function checks for obsticals and if the move is "valid" e.g. avoiding 'jumping diagonals'
    // "move marble right ->"
    // [ ][ ][?]
    // [ ][x][#]
    // [ ][ ][?]
        if (y < 0 || y > boardRef.length - 1) return { valid: false }
        if (x < 0 || x > boardRef[0].length - 1) return { valid: false }

        if (dir === 'right') {
            if (obstical.cell.type === 'wall') {
                if (y < obstical.y && ![
                    4, 7, 8, 
                ].includes(obstical.cell.direction)) {
                    return { valid: false }
                }
                if (y > obstical.y && ![
                    1, 2, 4, 
                ].includes(obstical.cell.direction)) {
                    return { valid: false }
                }
            }
            if (getCell(y, x - 1, boardRef).type !== 'floor') return { valid: false }
        }
        if (dir === 'down') {
            if (obstical.cell.type === 'wall') {
                if (x < obstical.x && ![
                    4, 7, 8, 
                ].includes(obstical.cell.direction)) {
                    return { valid: false }
                }
                if (x > obstical.x && ![
                    6, 8, 9, 
                ].includes(obstical.cell.direction)) {
                    return { valid: false }
                }
            }
            if (getCell(y - 1, x, boardRef).type !== 'floor') return { valid: false }
        }
        if (dir === 'left') {
            // if the obstical is a wall we must determine it's type (direction) and validate this vs our marble's direction
            if (obstical.cell.type === 'wall') {
                // if the target y is smaller then the obstical is "above", the movement is a vector poiting top right.
                if (y < obstical.y && ![
                    6, 8, 9, 
                ].includes(obstical.cell.direction)) {
                    // reference the encoding guidelines for which wall types 6, 8, and 9 are
                    return { valid: false }
                }
                // we repeat the process for the cell "under" the obstical
                if (y > obstical.y && ![
                    2, 3, 6, 
                ].includes(obstical.cell.direction)) {
                    return { valid: false }
                }
            }
            // assuming this does not disqualify the route, the getCell function is used to check that the tartget is clear
            if (getCell(y, x + 1, boardRef).type !== 'floor') return { valid: false }
        }
        if (dir === 'up') {
            if (obstical.cell.type === 'wall') {
                if (x < obstical.x && ![
                    1, 2, 4, 
                ].includes(obstical.cell.direction)) {
                    return { valid: false }
                }
                if (x > obstical.x && ![
                    2, 3, 6, 
                ].includes(obstical.cell.direction)) {
                    return { valid: false }
                }
            }
            if (getCell(y + 1, x, boardRef).type !== 'floor') return { valid: false }
        }

        const cell = boardRef[y] && boardRef[y][x]
        if (!cell || cell.type !== 'floor') return { valid: false }
        return { valid: true, cell, y, x }
    } // swerveValid

} // swerve

const moveValidator = (current, desire, boardRef, dir) => {
    const unswervables = [
        'diamondX', 'magnet', 'block', 'wall', 
    ]
    let status = true
    let swervable = true
    let toBeRemoved = false
    // if (checkIsWall(desire.y, desire.x, boardRef)) status = false
    // if (checkIsBall(desire.y, desire.x, boardRef)) status = false
    // if (checkIsRotate(desire.y, desire.x, boardRef)) status = false
    if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false
    if (checkIsBlackhole(desire.y, desire.x, boardRef)) toBeRemoved = true
    // eslint-disable-next-line max-len
    // console.log(`### ${current.y}, ${current.x}, ${status} trying to move into: ${desire.y}, ${desire.x} (${boardRef[desire.y][desire.x].type})`)

    // console.log({current})
    if (!status) {
        const target = boardRef[desire.y] && boardRef[desire.y][desire.x]
        if (target && unswervables.includes(target.type)) {
            if (
                !(target.type === 'wall' && target.variant === 'round') &&
        !(target.type === 'block' && target.variant === 'round')
            ) {
                swervable = false
            }
        }
        if (!swervable) return { y: current.y, x: current.x, status, toBeRemoved }
        const swerved = swerve(current.y, current.x, boardRef, dir, current.halted)
        // console.log('nah swerve that: ', swerved)
        return { y: swerved.y, x: swerved.x, direction: swerved.direction, status: true, toBeRemoved, halted: swerved.halted }
    }
    // console.log('*** Givin it what it wants ***')
    return { y: desire.y, x: desire.x, status, toBeRemoved, halted: desire.halted }

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
            return { x, y }
    }
}

export default handleMove
