import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { addProduct } from '../../../redux/Cart/cart.actions'
import Button from '../../Form/Button'

const Product = (product) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const { documentID, productThumbnail, productName, productPrice } = product
	if (
		!documentID ||
		!productThumbnail ||
		!productName ||
		typeof productPrice === 'undefined'
	)
		return null

	const configAddToCartBtn = {
		type: 'button',
	}

	const handleAddCart = (product) => {
		if (!product) return
		dispatch(addProduct(product))
		history.push('/cart')
	}

	return (
		<div className='product'>
			<div className='thumb'>
				<Link to={`/product/${documentID}`}>
					<img src={productThumbnail} alt={productName} />
				</Link>
			</div>

			<div className='details'>
				<ul>
					<li>
						<span className='name'>
							<Link to={`/product/${documentID}`}>{productName}</Link>
						</span>
					</li>
					<li>
						<span className='price'>${productPrice}</span>
					</li>
					<li>
						<div className='add-to-cart'>
							<Button
								{...configAddToCartBtn}
								onClick={() => handleAddCart(product)}>
								Add to cart
							</Button>
						</div>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Product
