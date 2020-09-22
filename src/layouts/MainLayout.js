import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayouts = (props) => {
	return (
		<>
			<Header {...props} />
			<main>{props.children}</main>
			<Footer />
		</>
	)
}

export default MainLayouts
