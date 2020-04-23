
import types from '../actions/types'
import initialState from '../constants/initialState'

const play = (state = initialState.play, action) => {
  const { payload, type } = action

  switch(type) {
    case types.BOARD_WRITE: return boardWrite(state, payload)
    default:
      if (!type.match(/@@/gi)) {
        console.warn(`[play reducer]: default route taken in switch for type: ${type}`, { state, action })
      }
      return state
  }
}

// IDEA: name conflict, consider resolve
function boardWrite (state, payload) {
  const { board } = payload
  return Object.assign({}, state, { board })
}

export default play
