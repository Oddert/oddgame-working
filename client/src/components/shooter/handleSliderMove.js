
import { getClockwise, getAnticlockwise } from './Utils/rotate'

// OPTIMIZE: Double check these files for potential unused code / vars

// const checkIsWall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'wall'
// const checkIsBall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'ball'
const checkIsFloor = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'floor'
const checkIsRotate = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'rotate'


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

const getRoatation = (dir, desire, boardRef) => boardRef[desire.y][desire.x].direction === 'clock'
  ? getClockwise(dir)
  : getAnticlockwise(dir)

function moveValidator (current, desire, boardRef) {
  let status = true
  if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false
  if (checkIsRotate(desire.y, desire.x, boardRef)) return {
    y: current.y,
    x: current.x,
    direction: getRoatation(current.direction, desire, boardRef)
  }
  if (!status) return { y: current.y, x: current.x }

  return { y: desire.y, x: desire.x }
}


export default handleSliderMove
