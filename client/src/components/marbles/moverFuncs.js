


const checkIsWall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'wall'
const checkIsBall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'ball'
const checkIsFloor = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'floor'

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

  const swerveValid = ({ y, x }) => {
    if (y < 0 || y > boardRef.length - 1) return { valid: false }
    if (x < 0 || x > boardRef[0].length - 1) return { valid: false }
    const cell = boardRef[y] && boardRef[y][x]
    if (!cell || cell.type !== 'floor') return { valid: false }
    return { valid: true, cell, y, x }
  }

  const pickDirection = (y1, x1, y2, x2) => {
    const possibilities = []
    if (swerveValid(y1, x1).valid) possibilities.push({ y: y1, x: x1 })
    if (swerveValid(y2, x2).valid) possibilities.push({ y: y2, x: x2 })
    if (possibilities.length === 0) return { y: originalY, x: originalX }
    return possibilities[Math.floor(Math.random() * possibilities.length)]
  }

  switch(dir) {
    case 'left':
      return pickDirection(originalY + 1, originalX - 1, originalY + 1, originalX - 1)
    case 'right':
      return pickDirection(originalY + 1, originalX + 1, originalY + 1, originalX + 1)
    case 'up':
      return pickDirection(originalY - 1, originalX - 1, originalY - 1, originalX + 1)
    case 'down':
      return pickDirection(originalY + 1, originalX - 1, originalY + 1, originalX + 1)
    default:
      return { y: originalY, x: originalX }
  }

}

const moveValidator = (current, desire, boardRef, dir) => {
  let status = true
  if (checkIsWall(desire.y, desire.x, boardRef)) status = false
  if (checkIsBall(desire.y, desire.x, boardRef)) status = false
  console.log(`### ${current.y}, ${current.x}, ${status} trying to move into: ${desire.y}, ${desire.x} (${boardRef[desire.y][desire.x].type})`)
  console.log(`Is Wall: ${checkIsWall(desire.y, desire.x, boardRef)}, is ball: ${checkIsBall(desire.y, desire.x, boardRef)}, status: ${status}`)

  // if (!status) return { y, x, status }

  switch (dir) {
    case 'left':
      return { y: current.y, x: current.x, status }
    case 'right':
      console.log('swerve: ', swerve(current.y, current.x, boardRef, dir))
      return { y: current.y, x: current.x, status }
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
  // console.log(toBall, toBall.status)
  // The status attr returns is move is valid
  if (!move.status) return { y, x, status: false }
  // Validator may make an adjustment to the request (e.g changin object direction) so return y,x is used
  return { x: move.x, y: move.y, status: true }
}
