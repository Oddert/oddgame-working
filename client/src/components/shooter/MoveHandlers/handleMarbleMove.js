

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

const swerve = (originalY, originalX, boardRef, dir, halted) => {
  // BUG: Implament halted plz
  const swerveValid = (y, x, dir, rotation) => {
    if (y < 0 || y > boardRef.length - 1) return { valid: false }
    if (x < 0 || x > boardRef[0].length - 1) return { valid: false }

    if (dir === 'right') {
      if (getCell(y, x - 1, boardRef).type !== 'floor') return { valid: false }
    }
    if (dir === 'down') {
      if (getCell(y - 1, x, boardRef).type !== 'floor') return { valid: false }
    }
    if (dir === 'left') {
      if (getCell(y, x + 1, boardRef).type !== 'floor') return { valid: false }
    }
    if (dir === 'up') {
      if (getCell(y + 1, x, boardRef).type !== 'floor') return { valid: false }
    }

    const cell = boardRef[y] && boardRef[y][x]
    if (!cell || cell.type !== 'floor') return { valid: false }
    return { valid: true, cell, y, x }
  }

  const pickDirection = (y1, x1, y2, x2, dir, originalY, originalX, halted) => {
    // Note from future: is this true????? ->
    // BUG: this code assumes the marble acting as obstical is going to move in the same direction as the marble
    // which is deciding to halt. Direction must be read from target and 'infront' calculated from there
    const getOffset = (dir, y, x, inc) => {
      switch (dir) {
        case 'left':
        // return boardRef[y] && boardRef[y][x - inc] ? { cell: boardRef[y][x - inc], y, x: x - inc } : { cell: { type: 'wall' }, y, x: x - inc }
          return {
            y,
            x: x - inc,
            cell: boardRef[y] && boardRef[y][x - inc] ? boardRef[y][x - inc] : { type: '' }
          }
        case 'right':
          return {
            y,
            x: x + inc,
            cell: boardRef[y] && boardRef[y][x + inc] ? boardRef[y][x + inc] : { type: '' }
          }
        case 'up':
          return {
            y: y - inc,
            x,
            cell: boardRef[y] && boardRef[y - inc][x] ? boardRef[y - inc][x] : { type: '' }
          }
        case 'down':
          return {
            y: y + inc,
            x,
            cell: boardRef[y] && boardRef[y + inc][x] ? boardRef[y + inc][x] : { type: '' }
          }
        default:
          return { cell: { type: 'default' }, y, x }
      }
    }

    const obsticalLikelyToMove = (dir, originalY, originalX, halted) => {

      // console.log('+++++', originalY, originalX)
      // if (halted) console.log('[obsticalLikelyToMove]: halted, returning false')
      // if (halted) return false

      function checkAheadRecurse (dir, previousY, previousX) {
        // console.log('[checkAheadRecurse]', { dir, previousY, previousX })
        const obstical = getOffset(dir, previousY, previousX, 1)
        // console.log(obstical)

        if (obstical.cell.type === 'floor') return true

        // if (obstical.cell.type === 'marble') console.log('recursion begining...')
        if (obstical.cell.type === 'marble') return checkAheadRecurse(obstical.cell.direction, obstical.y, obstical.x)

        return false
      }

      return checkAheadRecurse (dir, originalY, originalX)
    }

    console.log('#')
    if (obsticalLikelyToMove(dir, originalY, originalX, halted)) return { y: originalY, x: originalX, halted: true }
    console.log('##')

    const obstical = getOffset(dir, originalY, originalX, 1)
    console.log(obstical)
    if (obstical.cell.type === 'rotate') {
      return {
        y: originalY,
        x: originalX,
        direction: obstical.cell.direction === 'clock' ? getClockwise(dir) : getAnticlockwise(dir)
      }
    }
    const possibilities = []
    // going "left" / "up"
    if (swerveValid(y1, x1, dir).valid) possibilities.push({ y: y1, x: x1 })
    // going "right" / "down"
    if (swerveValid(y2, x2, dir).valid) possibilities.push({ y: y2, x: x2 })
    if (possibilities.length === 0) return { y: originalY, x: originalX }
    console.log({ possibilities })
    return possibilities[Math.floor(Math.random() * possibilities.length)]
  } // pickDirection

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

} // swerve

const moveValidator = (current, desire, boardRef, dir) => {
  const unswervables = ['diamondX', 'magnet', 'block', 'wall']
  let status = true
  let swervable = true
  let toBeRemoved = false
  // if (checkIsWall(desire.y, desire.x, boardRef)) status = false
  // if (checkIsBall(desire.y, desire.x, boardRef)) status = false
  // if (checkIsRotate(desire.y, desire.x, boardRef)) status = false
  if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false
  if (checkIsBlackhole(desire.y, desire.x, boardRef)) toBeRemoved = true
  console.log(`### ${current.y}, ${current.x}, ${status} trying to move into: ${desire.y}, ${desire.x} (${boardRef[desire.y][desire.x].type})`)

  // console.log({current})
  if (!status) {
    const target = boardRef[desire.y] && boardRef[desire.y][desire.x]
    if (target && unswervables.includes(target.type)) {
      if (!(target.type === 'wall' && target.variant === 'round') && !(target.type === 'block' && target.variant === 'round')) {
        swervable = false
      }
    }
    if (!swervable) return { y: current.y, x: current.x, status, toBeRemoved }
    let swerved = swerve(current.y, current.x, boardRef, dir, current.halted)
    console.log('nah swerve that: ', swerved)
    return { y: swerved.y, x: swerved.x, direction: swerved.direction, status: true, toBeRemoved, halted: swerved.halted }
  }
  console.log('*** Givin it what it wants ***')
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


const handleMove = (y, x, dir, boardRef, halted) => {
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
