
import types from '../actions/types'
import initialState from '../constants/initialState'
import reducerFilter from '../constants/reducerFilter'

const edit = (state = initialState.play, action) => {
  const { payload, type } = action

  switch(type) {
    case types.EDIT_TOGGLE_OPEN: return toggleOpen(state, payload)
    default:
      if (!type.match(reducerFilter('edit'))) {
        console.warn(`[edit reducer]: default route taken in switch for type: ${type}`, { state, action })
      }
      return state
  }
}

// IDEA: name conflict, consider resolve
function toggleOpen (state, payload) {
  const { open } = state
  const { value, override } = payload
  // IDEA: Patterns like this one should type check?
  if (open === undefined) return Object.assign({}, state, {
    open: false
  })
  return Object.assign({}, state, {
    open: override ? !!value : !open
  })
}

export default edit
