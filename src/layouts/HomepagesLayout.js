import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer.js'

const HomepagesLayout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}

export default HomepagesLayout
