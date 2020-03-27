

import { getClockwise, getAnticlockwise } from './Utils/rotate'

const checkIsWall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'wall'
const checkIsBall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'marble'
const checkIsRotate = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'rotate'
// const checkIsFloor = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'floor'

const getCell = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x]

export function mUp (y, x, boardRef, dir) {
  if (checkIsWall(y - 1, x, boardRef)) return { y, x, status: false }
  if (y - 1 < 0 || false) return { y, x, status: false }
  return { x, y: y - 1, status: true }
}

export function mDown (y, x, boardRef, dir) {
  if (checkIsWall(y + 1, x, boardRef)) return { y, x, status: false }
  if (y + 1 >= boardRef[0].length) return { y, x, status: false }
  return { x, y: y + 1, status: true }
}

export function mLeft (y, x, boardRef, dir) {
  if (checkIsWall(y, x - 1, boardRef)) return { y, x, status: false }
  if (x - 1 < 0) return { y, x, status: false }
  return { x: x - 1, y, status: true }
}

const swerve = (originalY, originalX, boardRef, dir) => {

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

  const pickDirection = (y1, x1, y2, x2, dir, originalY, originalX) => {

    // BUG: this code assumes the marble acting as obstical is going to move in the same direction as the marble
    // which is deciding to halt. Direction must be read from target and 'infront' calculated from there
    const getOffset = (dir, y, x, inc) => {
      switch (dir) {
        case 'left':
        // return boardRef[y] && boardRef[y][x - inc] ? { cell: boardRef[y][x - inc], y, x: x - inc } : { cell: { type: 'wall' }, y, x: x - inc }
        return {
          y,
          x: x - inc,
          cell: boardRef[y] && boardRef[y][x - inc] ? boardRef[y][x - inc] : { type: 'wall' }
        }
        case 'right':
        return {
          y,
          x: x + inc,
          cell: boardRef[y] && boardRef[y][x + inc] ? boardRef[y][x + inc] : { type: 'wall' }
        }
        case 'up':
        return {
          y: y - inc,
          x,
          cell: boardRef[y] && boardRef[y - inc][x] ? boardRef[y - inc][x] : { type: 'wall' }
        }
        case 'down':
        return {
          y: y + inc,
          x,
          cell: boardRef[y] && boardRef[y + inc][x] ? boardRef[y + inc][x] : { type: 'wall' }
        }
        default:
        return { cell: { type: 'wall' }, y, x }
      }
    }
    const infrontOfObstical = (dir, originalY, originalX) => {
      const obstical = getOffset(dir, originalY, originalX, 1)
      // console.log(obstical)
      if (obstical.cell.type === 'marble') {
        const infront = getOffset(obstical.cell.direction, obstical.y, obstical.x, 1)
        // console.log(obstical, infront)
        if (infront.cell.type === 'floor' || infront.cell.type === 'marble' || infront.cell.type === 'rotateX') return true
      } else {
        return false
      }
    }

    console.log('#')
    if (infrontOfObstical(dir, originalY, originalX)) return { y: originalY, x: originalX }
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
  }

  switch(dir) {
    case 'left':
      return pickDirection(originalY + 1, originalX - 1, originalY - 1, originalX - 1, dir, originalY, originalX)
    case 'right':
      return pickDirection(originalY - 1, originalX + 1, originalY + 1, originalX + 1, dir, originalY, originalX)
    case 'up':
      return pickDirection(originalY - 1, originalX - 1, originalY - 1, originalX + 1, dir, originalY, originalX)
    case 'down':
      return pickDirection(originalY + 1, originalX - 1, originalY + 1, originalX + 1, dir, originalY, originalX)
    default:
      return { y: originalY, x: originalX }
  }

}

const moveValidator = (current, desire, boardRef, dir) => {
  let status = true
  if (checkIsWall(desire.y, desire.x, boardRef)) status = false
  if (checkIsBall(desire.y, desire.x, boardRef)) status = false
  if (checkIsRotate(desire.y, desire.x, boardRef)) status = false
  console.log(`### ${current.y}, ${current.x}, ${status} trying to move into: ${desire.y}, ${desire.x} (${boardRef[desire.y][desire.x].type})`)

  switch (dir) {
    case 'left':
      return { y: current.y, x: current.x, status }
    case 'right':
      if (!status) {
        console.log('528491')
        let swerved = swerve(current.y, current.x, boardRef, dir)
        console.log('nah swerve that: ', swerved)
        return { y: swerved.y, x: swerved.x, direction: swerved.direction, status: true }
      }
      console.log('*** Givin it what it wants ***')
      return { y: desire.y, x: desire.x, status }
    case 'up':
      return { y: current.y, x: current.x, status }
    case 'down':
      return { y: current.y, x: current.x, status }
    default:
      console.log('def')
      return { y: current.y, x: current.x, status }
  }
}

// A move to the right is requested from the controller
export function mRight (y, x, boardRef, dir) {
  // Desired move (to right) is validated by a universal function
  const move = moveValidator({ y, x }, { y, x: x + 1 }, boardRef, dir)
  // The status attr returns is move is valid
  if (!move.status) return { y, x, status: false }
  // Validator may make an adjustment to the request (e.g changin object direction) so return y,x is used
  return { x: move.x, y: move.y, direction: move.direction, status: true }
}
