import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { signOutUserStart } from '../../redux/User/user.action'

import { FaAlignRight } from 'react-icons/fa'

import './styles.scss'

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
})

const Header = (props) => {
	const dispatch = useDispatch()
	const { currentUser } = useSelector(mapState)
	const [isOpen, setOpen] = useState(false)

	const signOut = () => {
		dispatch(signOutUserStart())
	}

	const handleToggle = () => {
		setOpen(!isOpen)
	}

	return (
		<header className='header'>
			<nav className='navbar'>
				<div className='wrap'>
					<div className='nav-center'>
						<div className='nav-header'>
							{/* <div className='logo'> */}
							<Link to='/'>
								<img src='' alt='logo' />
							</Link>
							{/* </div> */}

							<button type='button' className='nav-btn' onClick={handleToggle}>
								<FaAlignRight className='nav-icon' />
							</button>
						</div>
						<ul className={isOpen ? 'nav-links show-nav' : 'nav-links'}>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to='/search'>Search</Link>
							</li>

							<div className='call-to-actions'>
								{currentUser && currentUser ? (
									<>
										<li>
											<Link to='/dashboard'>My Account</Link>
										</li>
										<li>
											<span className='log-out' onClick={() => signOut()}>
												LogOut
											</span>
										</li>
									</>
								) : (
									<>
										<li>
											<Link to='/registration'>Registration</Link>
										</li>
										<li>
											<Link to='/login'>Login</Link>
										</li>
									</>
								)}
							</div>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}

Header.defautProps = {
	currentUser: null,
}

export default Header
