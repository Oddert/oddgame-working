const checkIsFloor = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'floor'

const targetCell = (y, x, dir, emit, boardRef) => {

  if (y > boardRef.length) return false
  if (y < 0) return false
  if (x > boardRef[0].length) return false
  if (x < 0) return false

  let status = true
  let target
  switch(dir) {
    case 'left':
      target = { y, x: x - 1 }
      break;
    case 'right':
      target = { y, x: x + 1 }
      break;
    case 'up':
      target = { y: y - 1, x }
      break;
    case 'down':
      target = { y: y + 1, x }
      break;
    default:
      return false
  }
  if (!(boardRef[target.y] && boardRef[target.y][target.x])) status = false
  // console.log(target.y, target.x, checkIsFloor(target.y, target.x, boardRef))
  if (!checkIsFloor(target.y, target.x, boardRef)) status = false
  if (!status) return false
  return { ...target, data: emitOpts(dir)[emit], status: true }
}

const emitOpts = direction => ({
  marble: { direction, type: 'ball' },
  slider: { direction, type: 'slider' }
})

const handleShoot = (y, x, direction, emit, boardRef) => {
  const target = targetCell(y, x, direction, emit, boardRef)
  if (!target) return { status: false, data: { type: 'floor' } }
  return target
}

export default handleShoot
