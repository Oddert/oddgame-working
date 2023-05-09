
import types from './types'

export const playBoardWrite = (board, resetTick, resetRegistry) => ({
    type: types.PLAY_BOARD_WRITE,
    payload: { board, resetTick, resetRegistry },
})

export const editToggleOpen = (override, value) => ({
    type: types.EDIT_TOGGLE_OPEN,
    payload: { override, value },
})

export const editWriteBoard = board => ({
    type: types.EDIT_WRITE_BOARD,
    payload: { board },
})

export const editWriteBoardNew = (save = null) => ({
    type: types.EDIT_WRITE_BOARD_NEW,
    payload: { save },
})

export const editWriteCol = inc => ({
    type: types.EDIT_WRITE_COL,
    payload: { inc },
})

export const editWriteRow = inc => ({
    type: types.EDIT_WRITE_ROW,
    payload: { inc },
})

export const editWriteRowsDirect = value => ({
    type: types.EDIT_WRITE_ROWS_DIRECT,
    payload: { value },
})

export const editWriteColsDirect = value => ({
    type: types.EDIT_WRITE_COLS_DIRECT,
    payload: { value },
})

export const editChangePainterSelect = selected => ({
    type: types.EDIT_PAINTER_SELECT_CHANGE,
    payload: { selected },
})

export const editChangeCell = (y, x, cell) => ({
    type: types.EDIT_CHANGE_CELL,
    payload: { y, x, cell },
})

export const uiMousedownHigh = () => ({
    type: types.UI_MOUSEDOWN_HIGH,
})

export const uiMousedownLow = () => ({
    type: types.UI_MOUSEDOWN_LOW,
})

export const editPaintmodeToggle = mode => ({
    type: types.EDIT_PAINT_MODE_TOGGLE,
    payload: { mode },
})

export const editPainterModeSwitch = mode => ({
    type: types.EDIT_PAINTER_MODE_SWITCH,
    payload: { mode },
})

export const editPainterFocusUpdate = (y, x) => ({
    type: types.EDIT_PAINTER_FOCUS_UPDATE,
    payload: { y, x },
})

export const filesToggleOpen = (override, value) => ({
    type: types.FILES_TOGGLE_OPEN,
    payload: { override, value },
})

export const filesOpenSet = (levelSet, isUserLevel) => ({
    type: types.FILES_OPEN_SET,
    payload: { levelSet, isUserLevel },
})

export const filesUpdateText = (text) => ({
    type: types.FILES_UPDATE_TEXT,
    payload: { text },
})

export const filesUpdateName = (name) => ({
    type: types.FILES_UPDATE_NAME,
    payload: { name },
})

export const filesSaveUser = (name, text) => ({
    type: types.FILES_SAVE_USER,
    payload: { name, text },
})

export const filesSaveUserAndNew = () => ({
    type: types.FILES_SAVE_USER_AND_NEW,
    payload: null,
})

export const levelsDeleteUser = (name) => ({
    type: types.LEVELS_DELETE_USER,
    payload: { name },
})

export const levelsWriteUser = (userLevels) => ({
    type: types.LEVELS_WRITE_USER,
    payload: { userLevels },
})

// const genericAction = ({ type, payload }) => ({})
