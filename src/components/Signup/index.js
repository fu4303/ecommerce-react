import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Form/Button'
import FormInput from '../Form/FormInput'
import AuthWrapper from '../AuthWrapper'

import { signUpUserStart } from '../../redux/User/user.action'

import './styles.scss'

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
	userError: user.userError,
})

const Signup = () => {
	const history = useHistory()
	const { currentUser, userError } = useSelector(mapState)
	const dispatch = useDispatch()
	const [displayName, setDisplayName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState('')

	useEffect(() => {
		if (currentUser) {
			resetForm()
			history.push('/')
		}
	}, [currentUser])

	useEffect(() => {
		if (Array.isArray(userError) && userError.length > 0) {
			setErrors(userError)
		}
	}, [userError])

	const resetForm = () => {
		setDisplayName('')
		setEmail('')
		setPassword('')
		setConfirmPassword('')
		setErrors('')
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()
		dispatch(signUpUserStart({ email, password, confirmPassword, displayName }))
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

export default Signup
