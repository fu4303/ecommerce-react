import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from '../UserProfile'

import './styles.scss'

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
})

const VerticalNav = ({ children }) => {
	const { currentUser } = useSelector(mapState)

	const configUserProfile = {
		currentUser,
	}

	return (
		<section className='vertical-nav'>
			<UserProfile {...configUserProfile} />

			<div className='menu'>{children}</div>
		</section>
	)
}

export default VerticalNav
