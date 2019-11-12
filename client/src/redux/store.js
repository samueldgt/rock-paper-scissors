import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reduxThunk  from 'redux-thunk'
import reducer from './reducer'

const store = createStore(reducer, applyMiddleware(reduxThunk, logger))

export default store