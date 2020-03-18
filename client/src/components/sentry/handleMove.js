

const checkIsWall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'wall'
const checkIsBall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'ball'
const checkIsFloor = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'floor'


function mLeft(y, x, boardRef, direction) {}
function mRight(y, x, boardRef, direction) {}
function mUp(y, x, boardRef, direction) {}
function mDown(y, x, boardRef, direction) {}


function moveValidator (current, desire, boardRef, direction) {
  let status = true
  if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false

  switch (direction) {
    case 'left':
      return { y: current.y, x: current.x }
    case 'right':
      return { y: current.y, x: current.x }
    case 'up':
      return { y: current.y, x: current.x }
    case 'down':
      return { y: current.y, x: current.x }
    default:
      return { y: current.y, x: current.x }
  }
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
       return { x, y }
  }
}

export default handleMove
