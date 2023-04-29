/**
 * Determines if a given cell is a Wall.
 * @param {number} y The Y coordinate of the cell.
 * @param {number} x The X coordinate of the cell.
 * @param {Object[][]} boardRef Copy of the board to search.
 * @returns {boolean}
 */
export const checkIsWall = (y, x, boardRef) =>
    boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'wall'

/**
 * Determines if a given cell is a Marble.
 * @param {number} y The Y coordinate of the cell.
 * @param {number} x The X coordinate of the cell.
 * @param {Object[][]} boardRef Copy of the board to search.
 * @returns {boolean}
 */
export const checkIsBall = (y, x, boardRef) =>
    boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'marble'

/**
 * Determines if a given cell is a Rotate.
 * @param {number} y The Y coordinate of the cell.
 * @param {number} x The X coordinate of the cell.
 * @param {Object[][]} boardRef Copy of the board to search.
 * @returns {boolean}
 */
export const checkIsRotate = (y, x, boardRef) =>
    boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'rotate'

/**
 * Determines if a given cell is a Floor.
 * @param {number} y The Y coordinate of the cell.
 * @param {number} x The X coordinate of the cell.
 * @param {Object[][]} boardRef Copy of the board to search.
 * @returns {boolean}
 */
export const checkIsFloor = (y, x, boardRef) =>
    boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'floor'

/**
 * Determines if a given cell is a Blackhole.
 * @param {number} y The Y coordinate of the cell.
 * @param {number} x The X coordinate of the cell.
 * @param {Object[][]} boardRef Copy of the board to search.
 * @returns {boolean}
 */
export const checkIsBlackhole = (y, x, boardRef) =>
    boardRef[y] && boardRef[y][x] && boardRef[y][x].type === 'blackhole'

/**
 * Returns a cell from a copy of the board.
 * @param {number} y The Y coordinate of the cell.
 * @param {number} x The X coordinate of the cell.
 * @param {Object[][]} boardRef Copy of the board to search.
 * @returns {Object}
 */
export const getCell = (y, x, boardRef) => boardRef[y] && boardRef[y][x]
