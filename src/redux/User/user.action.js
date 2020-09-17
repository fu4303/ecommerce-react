import { auth, GoogleProvider, handleUserProfile } from '../../firebase/utils'
import userTypes from './user.types'

export const setCurrentUser = (user) => ({
	type: userTypes.SET_CURRENT_USER,
	payload: user,
})

export const resetAllAuthForms = () => ({
	type: userTypes.RESET_AUTH_FORM,
})

export const signInUser = ({ email, password }) => async (dispatch) => {
	try {
		await auth.signInWithEmailAndPassword(email, password)
		dispatch({
			type: userTypes.SIGN_IN_SUCCESS,
			payload: true,
		})
	} catch (error) {
		console.log(error)
	}
}

export const signUpUser = ({
	email,
	password,
	confirmPassword,
	displayName,
}) => async (dispatch) => {
	if (password !== confirmPassword) {
		const err = ["Password Don't match"]
		dispatch({
			type: userTypes.SIGN_UP_ERROR,
			payload: err,
		})
		return
	}

	try {
		const { user } = await auth.createUserWithEmailAndPassword(email, password)
		await handleUserProfile(user, { displayName })
		dispatch({
			type: userTypes.SIGN_UP_SUCCESS,
			payload: true,
		})
	} catch (err) {
		console.log(err)
	}
}

export const resetPassword = ({ email }) => async (dispatch) => {
	const config = {
		url: 'http://localhost:3000/login',
	}
	try {
		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				dispatch({
					type: userTypes.RESET_PASSWORD_SUCCESS,
					payload: true,
				})
			})
			.catch(() => {
				const error = ['Email not found. Please try again.']
				dispatch({
					type: userTypes.RESET_PASSWORD_ERROR,
					payload: error,
				})
			})
	} catch (error) {
		console.log(error)
	}
}

export const signInWithGoogle = () => async (dispatch) => {
	try {
		await auth.signInWithPopup(GoogleProvider).then(() => {
			dispatch({
				type: userTypes.SIGN_IN_SUCCESS,
				payload: true,
			})
		})
	} catch (error) {
		console.log(error)
	}
}
