import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { signOutUserStart } from '../../redux/User/user.action'

import './styles.scss'

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
})

const Header = (props) => {
	const dispatch = useDispatch()
	const { currentUser } = useSelector(mapState)

	const signOut = () => {
		dispatch(signOutUserStart())
	}

	return (
		<header className='header'>
			<div className='wrap'>
				<div className='logo'>
					<Link to='/'>
						<img src='' alt='logo' />
					</Link>
				</div>

				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/search'>Search</Link>
						</li>
					</ul>
				</nav>

				<div className='call-to-actions'>
					{currentUser && currentUser ? (
						<ul>
							<li>
								<Link to='/dashboard'>My Account</Link>
							</li>
							<li>
								<span className='log-out' onClick={() => signOut()}>
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
