
import types from '../actions/types'
import initialState from '../constants/initialState'
import reducerFilter from '../constants/reducerFilter'

const toggleOpen = (state, payload) => {
    const { open } = state
    const { value, override } = payload
    if (open === undefined) {
        return {
            ...state,
            open: false,
        }
    }
    console.log({
        ...state,
        open: override ? !!value : !open,
    })
    return {
        ...state,
        open: override ? !!value : !open,
    }
}

const files = (state = initialState.files, action) => {
    const { payload, type } = action

    switch(type) {
        case types.FILES_TOGGLE_OPEN: return toggleOpen(state, payload)
        default:
            if (!type.match(reducerFilter('file'))) {
                console.warn(
                    `[files reducer]: default route taken in switch for type: ${type}`, { state, action }
                )
            }
            return state
    }
}

export default files
