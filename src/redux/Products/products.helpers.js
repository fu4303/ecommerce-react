import { firestore } from '../../firebase/utils'

export const handleAddProduct = (product) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.doc()
			.set(product)
			.then(() => {
				resolve()
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export const handleFetchProducts = ({
	filterType,
	startAfterDoc,
	persistProducts = [],
}) => {
	return new Promise((resolve, reject) => {
		// Set Pagination
		const pageSize = 6

		let ref = firestore
			.collection('products')
			.orderBy('createdDate')
			.limit(pageSize)

		if (filterType) ref = ref.where('productCategory', '==', filterType)
		if (startAfterDoc) ref = ref.startAfter(startAfterDoc)

		ref
			.get()
			.then((snapshot) => {
				const totalCount = snapshot.size
				const data = [
					...persistProducts,
					...snapshot.docs.map((doc) => {
						return {
							...doc.data(),
							documentID: doc.id,
						}
					}),
				]
				resolve({
					data,
					queryDoc: snapshot.docs[totalCount - 1],
					isLastPage: totalCount < 1,
				})
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export const handleDeleteProduct = (documentID) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.doc(documentID)
			.delete()
			.then(() => {
				resolve()
			})
			.catch((error) => {
				reject(error)
			})
	})
}
