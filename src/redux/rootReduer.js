import { combineReducers } from 'redux'
import cartReducer from './Cart/cart.reducer'
import productsReducer from './Products/products.reducer'

import userReduer from './User/user.reduer'

export default combineReducers({
	user: userReduer,
	productsData: productsReducer,
	cartData: cartReducer,
})
