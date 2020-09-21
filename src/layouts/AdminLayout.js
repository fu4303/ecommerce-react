import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutUserStart } from '../redux/User/user.action'

import Header from '../components/Header'
import VerticalNav from './../components/VerticalNav'
import Footer from '../components/Footer'

const AdminLayout = (props) => {
	const dispatch = useDispatch()

	const signOut = () => {
		dispatch(signOutUserStart())
	}

	return (
		<div className='admin-layout'>
			<Header {...props} />
			<section className='control-panel'>
				<aside className='sidebar'>
					<VerticalNav>
						<ul>
							<li>
								<Link to='/admin'>Home</Link>
							</li>
							<li>
								<span className='sign-out' onClick={() => signOut()}>
									Sign Out
								</span>
							</li>
						</ul>
					</VerticalNav>
				</aside>
				<div className='content'>{props.children}</div>
			</section>
			<Footer />
		</div>
	)
}

export default AdminLayout
