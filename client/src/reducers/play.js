
import types from '../actions/types'
import initialState from '../constants/initialState'
import reducerFilter from '../constants/reducerFilter'

const play = (state = initialState.play, action) => {
  const { payload, type } = action

  switch(type) {
    case types.PLAY_BOARD_WRITE: return boardWrite(state, payload)
    default:
      if (!type.match(reducerFilter('play'))) {
        console.warn(`[play reducer]: default route taken in switch for type: ${type}`, { state, action })
      }
      return state
  }
}

function boardWrite (state, payload) {
  const { tick } = state
  const { board, resetTick } = payload

  return Object.assign({}, state, {
    board,
    tick: resetTick ? 0 : tick + 1
  })
}

export default play
