
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
  const { board, resetTick, resetRegistry } = payload

  function createRegister () {
    const out = {}
    board.forEach((row, y) => {
      row.forEach((col, x) => {
        if (![
          'floor',
          'wall',
          'block',
          'diamond',
          'magnet',
          'forcefield',
        ].includes(col.type)) {
          if (!out[col.type]) out[col.type] = []
          out[col.type].push({ y, x, ...col })
        }
      })
    })
    return out
  }

  return Object.assign({}, state, {
    board,
    tick: resetTick ? 0 : tick + 1,
    registry: resetRegistry ? createRegister() : { ...state.registry }
  })
}

export default play
