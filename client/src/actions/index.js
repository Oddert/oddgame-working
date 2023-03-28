
import types from './types'

export const playBoardWrite = (board, resetTick, resetRegistry) => ({
    type: types.PLAY_BOARD_WRITE,
    payload: { board, resetTick, resetRegistry }
})

export const editToggleOpen = (override, value) => ({
    type: types.EDIT_TOGGLE_OPEN,
    payload: { override, value }
})

export const editWriteBoard = board => ({
    type: types.EDIT_WRITE_BOARD,
    payload: { board }
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
    type: types.EDIT_PAINTER_SELECT_CHANGE,
    payload: { selected }
})

export const editChangeCell = (y, x, cell) => ({
    type: types.EDIT_CHANGE_CELL,
    payload: { y, x, cell }
})

export const uiMousedownHigh = () => ({
    type: types.UI_MOUSEDOWN_HIGH
})

export const uiMousedownLow = () => ({
    type: types.UI_MOUSEDOWN_LOW
})

export const editPaintmodeToggle = mode => ({
    type: types.EDIT_PAINTMODE_TOGGLE,
    payload: { mode }
})

export const editPainterModeSwitch = mode => ({
    type: types.EDIT_PAINTER_MODE_SWITCH,
    payload: { mode }
})

export const editPainterFocusUpdate = (y, x) => ({
    type: types.EDIT_PAINTER_FOCUS_UPDATE,
    payload: { y, x }
})

// const genericAction = ({ type, payload }) => ({})
