
import editInitialState from './editInitialState'
import filesInitialState from './filesInitialState'
import levelsInitialState from './levelsInitialState'
import playInitialState from './playInitialState'
import uiInitialState from './uiInitialState'

const initialState = {
    // board: generateBoard()
    edit: editInitialState,
    files: filesInitialState,
    levels: levelsInitialState,
    play: playInitialState,
    ui: uiInitialState,
    // def: null
}

export default initialState
