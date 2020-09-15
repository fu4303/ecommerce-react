import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { auth } from '../../firebase/utils'

import AuthWrapper from '../AuthWrapper'
import Button from '../Form/Button'
import FormInput from '../Form/FormInput'

const initialState = {
	email: '',
	errors: [],
}

class EmailPassword extends Component {
	constructor(props) {
		super()
		this.state = {
			...initialState,
		}
	}

	handleChange = (event) => {
		const { name, value } = event.target

		this.setState({
			[name]: value,
		})
	}

	handleSubmit = async (event) => {
		event.preventDefault()
		const { email, password } = this.state

		const config = {
			url: 'http://localhost:3000/login',
		}

		try {
			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					this.props.history.push('/login')
				})
				.catch(() => {
					const error = ['Email not found. Please try again.']
					this.setState({
						errors: error,
					})
				})
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const { email, errors } = this.state

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
					<form onSubmit={this.handleSubmit}>
						<FormInput
							type='email'
							name='email'
							value={email}
							placeholder='Email'
							onChange={this.handleChange}
						/>

						<Button type='submit'> Email Password</Button>
					</form>
				</div>
			</AuthWrapper>
		)
	}
}

export default withRouter(EmailPassword)
