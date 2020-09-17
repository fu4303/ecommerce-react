import userTypes from './user.types'

const INITIALSTATE = {
	currentUser: null,
	signInSuccess: false,
	signUpSuccess: false,
	signUpError: [],
	resetPasswordSuccess: false,
	resetPasswordError: [],
}

const userReduer = (state = INITIALSTATE, action) => {
	switch (action.type) {
		case userTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			}
		case userTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				signInSuccess: action.payload,
			}
		case userTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				signUpSuccess: action.payload,
			}
		case userTypes.SIGN_UP_ERROR:
			return {
				...state,
				signUpError: action.payload,
			}
		case userTypes.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordSuccess: action.payload,
			}
		case userTypes.RESET_PASSWORD_ERROR:
			return {
				...state,
				resetPasswordError: action.payload,
			}
		case userTypes.RESET_AUTH_FORM:
			return {
				...state,
				signInSuccess: false,
				signUpSuccess: false,
				signUpError: [],
				resetPasswordSuccess: false,
				resetPasswordError: [],
			}
		default:
			return state
	}
}

export default userReduer
