import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Form/Button'

import FormInput from '../Form/FormInput'
import AuthWrapper from '../AuthWrapper'

import './styles.scss'
import {
	emailSignInStart,
	googleSignInStart,
} from '../../redux/User/user.action'

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
})

const Signin = () => {
	const history = useHistory()
	const { currentUser } = useSelector(mapState)
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		if (currentUser) {
			resetForm()
			history.push('/')
		}
	}, [currentUser])

	const resetForm = () => {
		setEmail('')
		setPassword('')
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(emailSignInStart({ email, password }))
	}

	const handleGoogleSignIn = () => {
		dispatch(googleSignInStart())
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

export default Signin
