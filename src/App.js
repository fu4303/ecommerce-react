import React from 'react'

import './default.scss'

import Header from './components/Header/index'
import Homepage from './pages/Homepages/index'

function App() {
	return (
		<div className='App'>
			<Header />
			<main>
				<Homepage />
			</main>
		</div>
	)
}

export default App
