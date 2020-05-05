import { combineReducers } from 'redux'

import play from './play'
import edit from './edit'

// const def = (state = null, action) => {
//   if (!action.type.match(/@@/gi)) console.error('[def reducer]: testing')
//   return state
// }

const rootReducer = combineReducers ({
  play,
  edit,
  // def
})

export default rootReducer
