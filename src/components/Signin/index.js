import React from 'react'

import Buttons from '../Form/Button'

import { signInWithGoogle } from '../../firebase/utils'

import './styles.scss'

const Signin = () => {
	const handleSubmit = async (event) => {
		event.preventDefault()
	}
	return (
		<section className='signin'>
			<div className='wrap'>
				<h2>Login</h2>

				<div className='formwrap'>
					<form onSubmit={handleSubmit}>
						<div className='socialSignin'>
							<div className='row'>
								<Buttons onClick={signInWithGoogle}>
									Sign in with Google
								</Buttons>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Signin
