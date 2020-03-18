

const checkIsWall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'wall'
const checkIsBall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'ball'
const checkIsFloor = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'floor'


function mLeft(y, x, boardRef, dir) {}
function mRight(y, x, boardRef, dir) {}
function mUp(y, x, boardRef, dir) {}
function mDown(y, x, boardRef, dir) {}


function moveValidator (current, desire, boardRef, dir) {
  let status = true
  if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false

  switch (dir) {
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


const handleMove = (y, x, dir, boardRef) => {
  switch (dir) {
    case 'left':
      return mLeft(y, x, boardRef, dir)
    case 'right':
      return mRight(y, x, boardRef, dir)
    case 'up':
      return mUp(y, x, boardRef, dir)
    case 'down':
      return mDown(y, x, boardRef, dir)
    default:
       return { x, y }
  }
}

export default handleMove
