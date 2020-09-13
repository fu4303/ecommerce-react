import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer.js'

const MainLayouts = ({ children }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	)
}

export default MainLayouts
