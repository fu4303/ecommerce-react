import userTypes from './user.types'

const INITIALSTATE = {
	currentUser: null,
	resetPasswordSuccess: false,
	userError: [],
}

const userReduer = (state = INITIALSTATE, action) => {
	switch (action.type) {
		case userTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				// If sign in success set the userError back to the state
				userError: [],
			}
		case userTypes.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				resetPasswordSuccess: action.payload,
			}
		case userTypes.USER_ERROR:
			return {
				...state,
				userError: action.payload,
			}
		case userTypes.RESET_USER_STATE:
		case userTypes.SIGN_OUT_USER_SUCCESS:
			return {
				...state,
				...INITIALSTATE,
			}
		default:
			return state
	}
}

export default userReduer
