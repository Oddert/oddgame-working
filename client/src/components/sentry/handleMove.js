

// const checkIsWall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'wall'
// const checkIsBall = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'ball'
const checkIsFloor = (y, x, boardRef) => boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'floor'

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


function moveValidator (current, desire, boardRef) {
    let status = true
    if (!checkIsFloor(desire.y, desire.x, boardRef)) status = false
    if (!status) return { y: current.y, x: current.x, direction: dirMap[current.direction] }

    return { y: desire.y, x: desire.x, direction: current.direction }
}


export default handleMove
