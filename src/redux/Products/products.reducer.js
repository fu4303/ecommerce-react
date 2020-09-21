import productsTypes from './products.types'

const INITIALSTATE = {
	products: [],
}

const productsReducer = (state = INITIALSTATE, action) => {
	switch (action.type) {
		case productsTypes.SET_PRODUCTS:
			return {
				...state,
				products: action.payload,
			}
		default:
			return state
	}
}

export default productsReducer
