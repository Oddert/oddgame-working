
import types from './types'

export const playBoardWrite = board => ({
  type: types.PLAY_BOARD_WRITE,
  payload: { board }
})

export const editToggleOpen = (override, value) => ({
  type: types.EDIT_TOGGLE_OPEN,
  payload: { override, value }
})

// const genericAction = ({ type, payload }) => ({})
