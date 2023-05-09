import { combineReducers } from 'redux'

import edit from './edit'
import files from './files'
import levels from './levels'
import play from './play'
import ui from './ui'

// const def = (state = null, action) => {
//   if (!action.type.match(/@@/gi)) console.error('[def reducer]: testing')
//   return state
// }

const rootReducer = combineReducers ({
    edit,
    files,
    levels,
    play,
    ui,
    // def
})

export default rootReducer
