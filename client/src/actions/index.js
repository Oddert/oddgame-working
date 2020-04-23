
import types from './types'

export const boardWrite = board => ({
  type: types.BOARD_WRITE,
  payload: { board }
})

// const genericAction = ({ type, payload }) => ({})
