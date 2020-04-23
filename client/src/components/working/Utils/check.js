export const checkIsWall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'wall'
export const checkIsBall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'marble'
export const checkIsRotate = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'rotate'
export const checkIsFloor = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'floor'
export const checkIsBlackhole = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'blackhole'
export const getCell = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x]
