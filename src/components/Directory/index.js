import React from 'react'

import ShopWomen from '../../assets/shopWomens.jpg'
import ShopMen from '../../assets/shopMens.jpg'

import './styles.scss'

const Directory = () => {
	return (
		<div className='directory'>
			<div className='wrap'>
				<div className='item' style={{ backgroundImage: `url(${ShopWomen})` }}>
					<a>ShopWomen</a>
				</div>
				<div className='item' style={{ backgroundImage: `url(${ShopMen})` }}>
					<a>ShopMen</a>
				</div>
			</div>
		</div>
	)
}

export default Directory
