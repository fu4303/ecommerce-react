import { takeLatest, put, all, call } from 'redux-saga/effects'
import { auth } from '../../firebase/utils'
import { fetchProductsStart, setProduct, setProducts } from './products.action'
import {
	handleAddProduct,
	handleDeleteProduct,
	handleFetchProducts,
	handleFetchProduct,
} from './products.helpers'
import productsTypes from './products.types'

export function* addProduct({ payload }) {
	try {
		const timestamp = new Date()
		yield handleAddProduct({
			...payload,
			productAdminUserUID: auth.currentUser.uid,
			createdDate: timestamp,
		})
		// Fetch Products and display on the admin page after clicked the add button
		yield put(fetchProductsStart())
	} catch (err) {
		// console.log(err);
	}
}

export function* onAddProductStart() {
	yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts({ payload }) {
	try {
		const products = yield handleFetchProducts(payload)
		yield put(setProducts(products))
	} catch (error) {
		console.log(error)
	}
}

export function* onFetchProductsStart() {
	yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }) {
	try {
		yield handleDeleteProduct(payload)
		yield put(fetchProductsStart())
	} catch (error) {
		console.log(error)
	}
}

export function* onDeleteProductStart() {
	yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export function* fetchProduct({ payload }) {
	try {
		const product = yield handleFetchProduct(payload)
		yield put(setProduct(product))
	} catch (err) {
		// console.log(err);
	}
}

export function* onFetchProductStart() {
	yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct)
}

export default function* productSagas() {
	yield all([
		call(onAddProductStart),
		call(onFetchProductsStart),
		call(onDeleteProductStart),
		call(onFetchProductStart),
	])
}
