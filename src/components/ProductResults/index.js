import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchProductsStart } from '../../redux/Products/products.action'
import FormSelect from '../Form/FormSelect'
import Product from './Product'

import './styles.scss'

const mapState = ({ productsData }) => ({
	products: productsData.products,
})

const ProductResults = (props) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const { filterType } = useParams()
	const { products } = useSelector(mapState)

	useEffect(() => {
		dispatch(fetchProductsStart({ filterType }))
	}, [filterType])

	const handleFilter = (event) => {
		const nextFilter = event.target.value
		// Select path from options value
		history.push(`/search/${nextFilter}`)
	}

	if (!Array.isArray(products)) return null
	if (products.length < 1) {
		return (
			<div className='products'>
				<p>No search results.</p>
			</div>
		)
	}

	const configFilters = {
		defaultValue: filterType,
		options: [
			{
				name: 'Show all',
				value: '',
			},
			{
				name: 'Mens',
				value: 'mens',
			},
			{
				name: 'Womens',
				value: 'womens',
			},
		],
		handleChange: handleFilter,
	}

	return (
		<section className='products'>
			<h1>Browse Products</h1>

			<FormSelect {...configFilters} />

			<div className='product-results'>
				{products.map((product, pos) => {
					const { productThumbnail, productName, productPrice } = product
					if (
						!productThumbnail ||
						!productName ||
						typeof productPrice === 'undefined'
					)
						return null

					const configProduct = {
						productThumbnail,
						productName,
						productPrice,
					}
					return <Product key={pos} {...configProduct} />
				})}
			</div>
		</section>
	)
}

export default ProductResults
