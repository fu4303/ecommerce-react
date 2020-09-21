import React from 'react'
import userIMG from '../../assets/user.png'

import './styles.scss'

const UserProfile = (props) => {
	const { currentUser } = props
	const { displayName } = currentUser

	return (
		<section className='user-profile'>
			<ul>
				<li>
					<figure className='img'>
						<img src={userIMG} alt='User Profile Imag' />
					</figure>
				</li>
				<li>
					<figcaption className='display-name'>
						{displayName && displayName}
					</figcaption>
				</li>
			</ul>
		</section>
	)
}

export default UserProfile
