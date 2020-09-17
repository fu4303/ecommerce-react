import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Form/Button'
import FormInput from '../Form/FormInput'
import AuthWrapper from '../AuthWrapper'

import './styles.scss'
import { resetAllAuthForms, signUpUser } from '../../redux/User/user.action'

const mapState = ({ user }) => ({
	signUpSuccess: user.signUpSuccess,
	signUpError: user.signUpError,
})

const Signup = (props) => {
	const { signUpSuccess, signUpError } = useSelector(mapState)
	const dispatch = useDispatch()
	const [displayName, setDisplayName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState('')

	useEffect(() => {
		if (signUpSuccess) {
			resetForm()
			dispatch(resetAllAuthForms())
			props.history.push('/')
		}
	}, [signUpSuccess])

	useEffect(() => {
		if (Array.isArray(signUpError) && signUpError.length > 0) {
			setErrors(signUpError)
		}
	}, [signUpError])

	const resetForm = () => {
		setDisplayName('')
		setEmail('')
		setPassword('')
		setConfirmPassword('')
		setErrors('')
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()
		dispatch(signUpUser({ email, password, confirmPassword, displayName }))
	}

	const configAuthWrapper = {
		headline: 'Registration',
	}

	return (
		<AuthWrapper {...configAuthWrapper}>
			{errors.length > 0 && (
				<ul>
					{errors.map((err, index) => {
						return (
							<li className='error-message' key={index}>
								{err}
							</li>
						)
					})}
				</ul>
			)}
			<form onSubmit={handleFormSubmit}>
				<FormInput
					type='text'
					name='displayName'
					value={displayName}
					placeholder='Full name'
					handleChange={(event) => setDisplayName(event.target.value)}
				/>

				<FormInput
					type='text'
					name='email'
					value={email}
					placeholder='Email'
					handleChange={(event) => setEmail(event.target.value)}
				/>

				<FormInput
					type='password'
					name='password'
					value={password}
					placeholder='
                            Password'
					handleChange={(event) => setPassword(event.target.value)}
				/>

				<FormInput
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					placeholder='Confirm Password'
					handleChange={(event) => setConfirmPassword(event.target.value)}
				/>

				<Button type='submit'>Registration</Button>
			</form>
		</AuthWrapper>
	)
}

export default withRouter(Signup)
