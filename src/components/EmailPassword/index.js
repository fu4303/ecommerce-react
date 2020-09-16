import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { auth } from '../../firebase/utils'

import AuthWrapper from '../AuthWrapper'
import Button from '../Form/Button'
import FormInput from '../Form/FormInput'

const EmailPassword = (props) => {
	const [email, setEmail] = useState('')
	const [errors, setErrors] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()

		const config = {
			url: 'http://localhost:3000/login',
		}

		try {
			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					props.history.push('/login')
				})
				.catch(() => {
					const error = ['Email not found. Please try again.']
					setErrors(error)
				})
		} catch (error) {
			console.log(error)
		}
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

export default withRouter(EmailPassword)
