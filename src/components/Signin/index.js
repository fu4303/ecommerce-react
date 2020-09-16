import React, { useState } from 'react'

import Button from '../Form/Button'

import { auth, signInWithGoogle } from '../../firebase/utils'

import FormInput from '../Form/FormInput'
import AuthWrapper from '../AuthWrapper'

import './styles.scss'
import { Link, withRouter } from 'react-router-dom'

const Signin = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const resetForm = () => {
		setEmail('')
		setPassword('')
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			await auth.signInWithEmailAndPassword(email, password)
			resetForm()
			props.history.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	const configAuthWrapper = {
		headline: 'Login',
	}

	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className='formwrap'>
				<form onSubmit={handleSubmit}>
					<FormInput
						type='email'
						name='email'
						value={email}
						placeholder='Email'
						handleChange={(event) => setEmail(event.target.value)}
					/>

					<FormInput
						type='password'
						name='password'
						value={password}
						placeholder='Password'
						handleChange={(event) => setPassword(event.target.value)}
					/>

					<Button type='submit'>Login</Button>

					<div className='socialSignin'>
						<div className='row'>
							<Button onClick={signInWithGoogle}>Sign in with Google</Button>
						</div>
					</div>

					<div className='links'>
						<Link to='/recovery'>Reset Password</Link>
					</div>
				</form>
			</div>
		</AuthWrapper>
	)
}

export default withRouter(Signin)
