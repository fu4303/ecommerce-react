import React, { Component } from 'react'

import Button from '../Form/Button'

import { auth, signInWithGoogle } from '../../firebase/utils'

import './styles.scss'
import FormInput from '../Form/FormInput'

const initialState = {
	email: '',
	password: '',
}

class Signin extends Component {
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

	handleSubmit = async (event) => {
		event.preventDefault()
		const { email, password } = this.state

		try {
			await auth.signInWithEmailAndPassword(email, password)
			this.setState({
				...initialState,
			})
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		const { email, password } = this.state

		return (
			<section className='signin'>
				<div className='wrap'>
					<h2>Login</h2>

					<div className='formwrap'>
						<form onSubmit={this.handleSubmit}>
							<FormInput
								type='text'
								name='email'
								value={email}
								placeholder='Email'
								handleChange={this.handleChange}
							/>

							<FormInput
								type='password'
								name='password'
								value={password}
								placeholder='
                            Password'
								handleChange={this.handleChange}
							/>

							<Button type='submit'>Login</Button>

							<div className='socialSignin'>
								<div className='row'>
									<Button onClick={signInWithGoogle}>
										Sign in with Google
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		)
	}
}

export default Signin
