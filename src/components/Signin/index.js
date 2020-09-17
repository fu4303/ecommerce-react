import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Form/Button'

import FormInput from '../Form/FormInput'
import AuthWrapper from '../AuthWrapper'

import './styles.scss'
import {
	signInUser,
	signInWithGoogle,
	resetAllAuthForms,
} from '../../redux/User/user.action'

const mapState = ({ user }) => ({
	signInSuccess: user.signInSuccess,
})

const Signin = (props) => {
	const { signInSuccess } = useSelector(mapState)
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		if (signInSuccess) {
			resetForm()
			dispatch(resetAllAuthForms())
			props.history.push('/')
		}
	}, [signInSuccess])

	const resetForm = () => {
		setEmail('')
		setPassword('')
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(signInUser({ email, password }))
	}

	const handleGoogleSignIn = () => {
		dispatch(signInWithGoogle())
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
							<Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
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
