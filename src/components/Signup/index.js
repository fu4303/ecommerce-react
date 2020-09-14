import React, { Component } from 'react'

import { auth, handleUserProfile } from '../../firebase/utils'

import Button from '../Form/Button'
import FormInput from '../Form/FormInput'

import './styles.scss'

const initialState = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
	errors: [],
}

export class Signup extends Component {
	constructor(props) {
		super(props)
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

	handleFormSubmit = async (event) => {
		event.preventDefault()
		const { displayName, email, password, confirmPassword } = this.state

		if (password !== confirmPassword) {
			const err = ["Password Don't match"]
			this.setState({
				errors: err,
			})
			return
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			)

			await handleUserProfile(user, { displayName })

			this.setState({
				...initialState,
			})
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const { displayName, email, password, confirmPassword, errors } = this.state

		return (
			<div className='signup'>
				<div className='wrap'>
					<h2>Signup</h2>

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
					<form onSubmit={this.handleFormSubmit}>
						<FormInput
							type='text'
							name='displayName'
							value={displayName}
							placeholder='Full name'
							onChange={this.handleChange}
						/>

						<FormInput
							type='text'
							name='email'
							value={email}
							placeholder='Email'
							onChange={this.handleChange}
						/>

						<FormInput
							type='password'
							name='password'
							value={password}
							placeholder='
                            Password'
							onChange={this.handleChange}
						/>

						<FormInput
							type='password'
							name='confirmPassword'
							value={confirmPassword}
							placeholder='Confirm Password'
							onChange={this.handleChange}
						/>

						<Button type='submit'>Registration</Button>
					</form>
				</div>
			</div>
		)
	}
}

export default Signup
