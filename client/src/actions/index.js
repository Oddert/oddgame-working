
import types from './types'

export const playBoardWrite = board => ({
  type: types.PLAY_BOARD_WRITE,
  payload: { board }
})

export const editToggleOpen = (override, value) => ({
  type: types.EDIT_TOGGLE_OPEN,
  payload: { override, value }
})

export const editWriteBoardNew = (save = null) => ({
  type: types.EDIT_WRITE_BOARD_NEW,
  payload: { save }
})

export const editWriteCol = inc => ({
  type: types.EDIT_WRITE_COL,
  payload: { inc }
})

export const editWriteRow = inc => ({
  type: types.EDIT_WRITE_ROW,
  payload: { inc }
})

export const editWriteRowsDirect = value => ({
  type: types.EDIT_WRITE_ROWS_DIRECT,
  payload: { value }
})

export const editWriteColsDirect = value => ({
  type: types.EDIT_WRITE_COLS_DIRECT,
  payload: { value }
})

export const editChangePainterSelect = selected => ({
  type: types.EDIT_CHANGE_PAINTER_SELECT,
  payload: { selected }
})

export const editChangeCell = (y, x, cell) => ({
  type: types.EDIT_CHANGE_CELL,
  payload: { y, x, cell }
})

// const genericAction = ({ type, payload }) => ({})
