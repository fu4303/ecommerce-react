import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReduer from './rootReduer'

export const middlewares = [logger]

export const store = createStore(rootReduer, applyMiddleware(...middlewares))

export default store
