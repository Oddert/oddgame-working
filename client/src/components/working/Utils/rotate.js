export const  getClockwise = dir => {
  switch (dir) {
    case 'left':
      return 'up'
    case 'right':
      return 'down'
    case 'up':
      return 'right'
    case 'down':
      return 'left'
    default:
      console.error(`Invalid direction found: ${dir}`)
      return dir
  }
}

export const getAnticlockwise = dir => {
  switch (dir) {
    case 'left':
      return 'down'
    case 'right':
      return 'up'
    case 'up':
      return 'left'
    case 'down':
      return 'right'
    default:
      console.error(`Invalid direction found: ${dir}`)
      return dir
  }
}

export const getRoatation = (dir, desire, boardRef) => boardRef[desire.y][desire.x].direction === 'clock'
  ? getClockwise(dir)
  : getAnticlockwise(dir)
