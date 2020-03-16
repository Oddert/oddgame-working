
import { mUp, mDown, mLeft, mRight } from './moverFuncs.js'

const handleMove = (y, x, dir, boardRef) => {
  switch (dir) {
    case 'up':
      return mUp(y, x, boardRef, dir)
    case 'down':
      return mDown(y, x, boardRef, dir)
    case 'left':
      return mLeft(y, x, boardRef, dir)
    case 'right':
      return mRight(y, x, boardRef, dir)
    default:
       return { x, y }
  }
}

export default handleMove
