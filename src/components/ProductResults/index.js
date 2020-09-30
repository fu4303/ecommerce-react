import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchProductsStart } from '../../redux/Products/products.action'
import FormSelect from '../Form/FormSelect'
import LoadMore from '../LoadMore'
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
	const { data, queryDoc, isLastPage } = products

	useEffect(() => {
		dispatch(fetchProductsStart({ filterType }))
	}, [filterType])

	const handleFilter = (event) => {
		const nextFilter = event.target.value
		// Select path from options value
		history.push(`/search/${nextFilter}`)
	}

	if (!Array.isArray(data)) return null
	if (data.length < 1) {
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

	const handleLoadMore = () => {
		dispatch(
			fetchProductsStart({
				filterType,
				startAfterDoc: queryDoc,
				persistProducts: data,
			})
		)
	}

	const configLoadMore = {
		onLoadMoreEvt: handleLoadMore,
	}

	return (
		<section className='products'>
			<h1>Browse Products</h1>

			<FormSelect {...configFilters} />

			<div className='product-results'>
				{data.map((product, pos) => {
					const { productThumbnail, productName, productPrice } = product
					if (
						!productThumbnail ||
						!productName ||
						typeof productPrice === 'undefined'
					)
						return null

					const configProduct = {
						...product,
					}
					return <Product key={pos} {...configProduct} />
				})}
			</div>

			{!isLastPage && <LoadMore {...configLoadMore} />}
		</section>
	)
}

export default ProductResults
