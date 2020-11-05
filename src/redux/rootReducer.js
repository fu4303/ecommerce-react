import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartReducer from './Cart/cart.reducer'
import productsReducer from './Products/products.reducer'

import userReduer from './User/user.reduer'

export const rootReducer = combineReducers({
	user: userReduer,
	productsData: productsReducer,
	cartData: cartReducer,
})

const configStorage = {
	key: 'root',
	storage,
	whitelist: ['cartData'],
}

export default persistReducer(configStorage, rootReducer)
