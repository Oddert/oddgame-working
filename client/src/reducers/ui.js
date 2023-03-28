import types from '../actions/types'
import initialState from '../constants/initialState'
import reducerFilter from '../constants/reducerFilter'

const ui = (state = initialState.ui, action) => {
    const { type, } = action

    switch (type) {
        case types.UI_MOUSEDOWN_HIGH: return mousedownHigh(state)
        case types.UI_MOUSEDOWN_LOW: return mousedownLow(state)
        default:
            if (!type.match(reducerFilter('ui'))) {
                console.warn(`[ui reducer]: default route taken in switch for type: ${type}`, { state, action, })
            }
            return state
    }
}

function mousedownHigh (state) {
    return Object.assign({}, state, {
        mouseIsDown: true,
    })
}

function mousedownLow (state) {
    return Object.assign({}, state, {
        mouseIsDown: false,
    })
}

export default ui
