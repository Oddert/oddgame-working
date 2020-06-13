
import { checkIsRotate, checkIsFloor, checkIsBlackhole } from '../Utils/check'
import { getRoatation } from '../Utils/rotate'

const dirMap = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up',
}

const handleMove = (y, x, boardRef, tick, direction) => {
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
  return { y: move.y, x: move.x, direction: move.direction, toBeRemoved: move.toBeRemoved, bounce: move.bounce }
}
function mRight(y, x, boardRef, direction) {
  const move = moveValidator({ y, x, direction }, { y, x: x + 1, direction }, boardRef)
  return { y: move.y, x: move.x, direction: move.direction, toBeRemoved: move.toBeRemoved, bounce: move.bounce }
}
function mUp(y, x, boardRef, direction) {
  const move = moveValidator({ y, x, direction }, { y: y - 1, x, direction }, boardRef)
  return { y: move.y, x: move.x, direction: move.direction, toBeRemoved: move.toBeRemoved, bounce: move.bounce }
}
function mDown(y, x, boardRef, direction) {
  const move = moveValidator({ y, x, direction }, { y: y + 1, x, direction }, boardRef)
  return { y: move.y, x: move.x, direction: move.direction, toBeRemoved: move.toBeRemoved, bounce: move.bounce }

}

function checkIsBounce (targetY, targetX, boardRef, dir) {
  if (!['block'].includes(boardRef[targetY][targetX].type)) return null

  let valid = false
  let x = targetX
  let y = targetY

  switch(dir) {
    case 'left':
      if (boardRef[targetY][targetX - 1].type === 'floor') {
        x = targetX - 1
        valid = true
      }
      break
    case 'right':
      if (boardRef[targetY][targetX + 1].type === 'floor') {
        x = targetX + 1
        valid = true
      }
      break
    case 'up':
      if (boardRef[targetY - 1][targetX].type === 'floor') {
        y = targetY - 1
        valid = true
      }
      break
    case 'down':
      if (boardRef[targetY + 1][targetX].type === 'floor') {
        y = targetY + 1
        valid = true
      }
      break
    default:
      console.error(`[handleSentryMove > checkIsBounce] No such direction type ${dir}`)
  }

  console.log('nope')
  if (valid) return {
    source: {
      y: targetY,
      x: targetX,
    },
    target: {
      y, x,
    }
  }
  return null
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

  const bounce = checkIsBounce(desire.y, desire.x, boardRef, current.direction)

  if (!status) return { y: current.y, x: current.x, direction: dirMap[current.direction], toBeRemoved, bounce }

  return { y: desire.y, x: desire.x, direction: current.direction, toBeRemoved, bounce }
}


export default handleMove
