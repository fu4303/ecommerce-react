import React from 'react'
import { Link } from 'react-router-dom'

import { auth } from '../../firebase/utils'

import './styles.scss'

const Header = (props) => {
	const { currentUser } = props
	return (
		<header className='header'>
			<div className='wrap'>
				<div className='logo'>
					<Link to='/'>
						<img src='' alt='logo' />
					</Link>
				</div>

				<div className='callToActions'>
					{currentUser && currentUser ? (
						<ul>
							<li>
								<span className='log-out' onClick={() => auth.signOut()}>
									LogOut
								</span>
							</li>
						</ul>
					) : (
						<ul>
							<li>
								<Link to='/registration'>Registration</Link>
							</li>
							<li>
								<Link to='/login'>Login</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</header>
	)
}

Header.defautProps = {
	currentUser: null,
}

export default Header
