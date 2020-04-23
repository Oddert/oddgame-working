
import types from '../actions/types'
import initialState from '../constants/initialState'

const play = (state = initialState.play, action) => {
  const { payload, type } = action

  switch(type) {
    case types.WRITE_BOARD: return writeBoard(state, payload)
    default:
      if (!type.match(/@@/gi)) {
        console.warn(`[play reducer]: default route taken in switch for type: ${type}`, { state, action })
      }
      return state
  }
}

function writeBoard (state, payload) {
  const { board } = payload
  return Object.assign({}, state, { board })
}

export default play
