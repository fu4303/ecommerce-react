import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const HomepagesLayout = (props) => {
	return (
		<>
			<Header {...props} />
			{props.children}
			<Footer />
		</>
	)
}

export default HomepagesLayout
