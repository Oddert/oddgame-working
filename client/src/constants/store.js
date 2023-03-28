import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import initialState from './initialState'
import rootReducer from '../reducers/'


const middleWare = [thunk]

const enhancer = !!window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose (
        applyMiddleware(...middleWare)
        , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    : compose (applyMiddleware(...middleWare))

const store = createStore (
    rootReducer
    , initialState
    , enhancer
)

export default store
