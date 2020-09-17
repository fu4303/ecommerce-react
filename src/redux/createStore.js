import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import logger from 'redux-logger'
import rootReduer from './rootReduer'
import rootSaga from './rootSaga'

// const sagaMiddleware = createSagaMiddleware()
export const middlewares = [thunk, logger]

export const store = createStore(rootReduer, applyMiddleware(...middlewares))
// sagaMiddleware.run(rootSaga)

export default store
