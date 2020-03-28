
import { getRoatation } from '../Utils/rotate'
import { checkIsFloor, checkIsRotate, checkIsBlackhole } from '../Utils/check'

// OPTIMIZE: Double check these files for potential unused code / vars

const handleSliderMove = (y, x, direction, boardRef) => {
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


function mLeft(y, x, boardRef, direction) {
  const move = moveValidator({ y, x, direction }, { y, x: x - 1, direction }, boardRef)
  return { y: move.y, x: move.x, direction: move.direction }
}
function mRight(y, x, boardRef, direction) {
  const move = moveValidator({ y, x, direction }, { y, x: x + 1, direction }, boardRef)
  return { y: move.y, x: move.x, direction: move.direction }
}
function mUp(y, x, boardRef, direction) {
  const move = moveValidator({ y, x, direction }, { y: y - 1, x, direction }, boardRef)
  return { y: move.y, x: move.x, direction: move.direction }
}
function mDown(y, x, boardRef, direction) {
  const move = moveValidator({ y, x, direction }, { y: y + 1, x, direction }, boardRef)
  return { y: move.y, x: move.x, direction: move.direction }
}

function moveValidator (current, desire, boardRef) {
  let status = true
  let toBeRemoved = false
  if (checkIsBlackhole(desire.y, desire.x, boardRef)) toBeRemoved = true
  if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false
  if (checkIsRotate(desire.y, desire.x, boardRef)) return {
    y: current.y,
    x: current.x,
    direction: getRoatation(current.direction, desire, boardRef),
    toBeRemoved
  }
  if (!status) return { y: current.y, x: current.x, toBeRemoved }

  return { y: desire.y, x: desire.x, toBeRemoved }
}


export default handleSliderMove
