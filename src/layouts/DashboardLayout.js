import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutUserStart } from '../redux/User/user.actions'

import Header from '../components/Header'
import VerticalNav from '../components/VerticalNav'
import Footer from '../components/Footer'

const DashBoardLayout = (props) => {
	const dispatch = useDispatch()

	const signOut = () => {
		dispatch(signOutUserStart())
	}

	return (
		<div className='dashboard-layout'>
			<Header {...props} />
			<div className='control-panel'>
				<div className='sidebar'>
					<VerticalNav>
						<ul>
							<li>
								<Link to='/dashboard'>Home</Link>
							</li>
							<li>
								<span className='sign-out' onClick={() => signOut()}>
									Sign Out
								</span>
							</li>
						</ul>
					</VerticalNav>
				</div>
				<div className='content'>{props.children}</div>
			</div>
			<Footer />
		</div>
	)
}

export default DashBoardLayout
