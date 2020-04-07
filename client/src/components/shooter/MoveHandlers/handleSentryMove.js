
import { checkIsRotate, checkIsFloor, checkIsBlackhole } from '../Utils/check'
import { getRoatation } from '../Utils/rotate'

const dirMap = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up',
}

const handleMove = (y, x, direction, boardRef) => {
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
  return { y: move.y, x: move.x, direction: move.direction, toBeRemoved: move.toBeRemoved }
}
function mRight(y, x, boardRef, direction) {
  const move = moveValidator({ y, x, direction }, { y, x: x + 1, direction }, boardRef)
  return { y: move.y, x: move.x, direction: move.direction, toBeRemoved: move.toBeRemoved }
}
function mUp(y, x, boardRef, direction) {
  const move = moveValidator({ y, x, direction }, { y: y - 1, x, direction }, boardRef)
  return { y: move.y, x: move.x, direction: move.direction, toBeRemoved: move.toBeRemoved }
}
function mDown(y, x, boardRef, direction) {
  const move = moveValidator({ y, x, direction }, { y: y + 1, x, direction }, boardRef)
  return { y: move.y, x: move.x, direction: move.direction, toBeRemoved: move.toBeRemoved }

}

function moveValidator (current, desire, boardRef) {
  let status = true
  let toBeRemoved = false

  if (checkIsBlackhole(desire.y, desire.x, boardRef)) toBeRemoved = true
  if (checkIsRotate(desire.y, desire.x, boardRef)) return {
    y: current.y,
    x: current.x,
    direction: getRoatation(current.direction, desire, boardRef), toBeRemoved
  }
  if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false

  if (!status) return { y: current.y, x: current.x, direction: dirMap[current.direction], toBeRemoved }

  return { y: desire.y, x: desire.x, direction: current.direction, toBeRemoved }
}


export default handleMove
