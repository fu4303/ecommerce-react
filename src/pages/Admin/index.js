import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../../components/Modal'
import FormInput from '../../components/Form/FormInput'
import FormSelect from '../../components/Form/FormSelect'
import Button from '../../components/Form/Button'

import {
	addProductStart,
	deleteProductStart,
	fetchProductsStart,
} from '../../redux/Products/products.action'

import './styles.scss'

const mapState = ({ productsData }) => ({
	products: productsData.products,
})

const Admin = () => {
	const { products } = useSelector(mapState)
	const dispatch = useDispatch()
	const [hideModal, setHideModal] = useState(true)
	const [productCategory, setProductCategory] = useState('men')
	const [productName, setProductName] = useState('')
	const [productThumbnail, setProductThumbnail] = useState('')
	const [productPrice, setProductPrice] = useState(0)

	useEffect(() => {
		dispatch(fetchProductsStart())
	}, [])

	const toggleModal = () => setHideModal(!hideModal)

	const configModal = {
		hideModal,
		toggleModal,
	}

	const resetForm = () => {
		setHideModal(true)
		setProductCategory('men')
		setProductName('')
		setProductThumbnail('')
		setProductPrice(0)
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		dispatch(
			addProductStart({
				productCategory,
				productName,
				productThumbnail,
				productPrice,
			})
		)
		resetForm()
	}

	return (
		<section className='admin'>
			<div className='call-to-action'>
				<ul>
					<Button onClick={() => toggleModal()}>Add new product</Button>
				</ul>
			</div>

			<Modal {...configModal}>
				<section className='add-new-product-form'>
					<form onSubmit={handleSubmit}>
						<h2>Add new product</h2>

						<FormSelect
							label='Category'
							options={[
								{
									value: 'mens',
									name: 'Mens',
								},
								{
									value: 'womens',
									name: 'Womens',
								},
							]}
							handleChange={(e) => setProductCategory(e.target.value)}
						/>

						<FormInput
							label='Name'
							type='text'
							value={productName}
							handleChange={(e) => setProductName(e.target.value)}
						/>

						<FormInput
							label='Main image URL'
							type='url'
							value={productThumbnail}
							handleChange={(e) => setProductThumbnail(e.target.value)}
						/>

						<FormInput
							label='Price'
							type='number'
							min='0.00'
							max='10000.00'
							step='0.01'
							value={productPrice}
							handleChange={(e) => setProductPrice(e.target.value)}
						/>

						<Button type='submit'>Add product</Button>
					</form>
				</section>
			</Modal>

			<section className='manage-products'>
				<table border='0' cellPadding='0' cellSpacing='0'>
					<tbody>
						<tr>
							<th>
								<h1>Manage Products</h1>
							</th>
						</tr>
						<tr>
							<td>
								<table
									className='results'
									border='0'
									cellPadding='10'
									cellSpacing='0'>
									<tbody>
										{products.map((product, index) => {
											const {
												productName,
												productThumbnail,
												productPrice,
												documentID,
											} = product

											return (
												<tr key={index}>
													<td>
														<img
															className='thumb'
															src={productThumbnail}
															alt='productThumbnail'
														/>
													</td>
													<td>{productName}</td>
													<td>${productPrice}</td>
													<td>
														<Button
															onClick={() =>
																dispatch(deleteProductStart(documentID))
															}>
															Delete
														</Button>
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</section>
	)
}

export default Admin
