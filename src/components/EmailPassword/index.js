import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AuthWrapper from '../AuthWrapper'
import Button from '../Form/Button'
import FormInput from '../Form/FormInput'
import {
	resetPasswordStart,
	resetUserState,
} from '../../redux/User/user.action'

const mapState = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	userError: user.userError,
})

const EmailPassword = () => {
	const history = useHistory()
	const { resetPasswordSuccess, userError } = useSelector(mapState)
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [errors, setErrors] = useState('')

	useEffect(() => {
		if (resetPasswordSuccess) {
			dispatch(resetUserState())
			history.push('/login')
		}
	}, [resetPasswordSuccess])

	useEffect(() => {
		if (Array.isArray(userError) && userError.length > 0) {
			setErrors(userError)
		}
	}, [userError])

	const handleSubmit = (event) => {
		event.preventDefault()

		dispatch(resetPasswordStart({ email }))
	}

	const configAuthWrapper = {
		headline: 'Email Password',
	}

	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className='form-wrap'>
				{errors.length > 0 && (
					<ul>
						{errors.map((e, index) => {
							return (
								<li className='error-message ' key={index}>
									{e}
								</li>
							)
						})}
					</ul>
				)}
				<form onSubmit={handleSubmit}>
					<FormInput
						type='email'
						name='email'
						value={email}
						placeholder='Email'
						handleChange={(event) => setEmail(event.target.value)}
					/>

					<Button type='submit'> Email Password</Button>
				</form>
			</div>
		</AuthWrapper>
	)
}

export default EmailPassword
