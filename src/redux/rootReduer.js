import { combineReducers } from 'redux'
import productsReducer from './Products/products.reducer'

import userReduer from './User/user.reduer'

export default combineReducers({
	user: userReduer,
	productsData: productsReducer,
})
