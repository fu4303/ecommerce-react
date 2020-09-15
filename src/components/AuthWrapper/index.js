import React from 'react'

import './styles.scss'

const AuthWrapper = ({ headline, children }) => {
	return (
		<section className='authWrapper'>
			<div className='wrap'>
				{headline && <h2>{headline}</h2>}
				<div className='children'>{children && children}</div>
			</div>
		</section>
	)
}

export default AuthWrapper
