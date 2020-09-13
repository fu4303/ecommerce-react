import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './default.scss'

import Homepage from './pages/Homepages/index'
import Registration from './pages/Registration'
import MainLayouts from './layouts/MainLayouts'
import HomepagesLayout from './layouts/HomepagesLayout'

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route
					exact
					path='/'
					render={() => (
						<HomepagesLayout>
							<Homepage />
						</HomepagesLayout>
					)}
				/>
				<Route
					path='/registration'
					render={() => (
						<MainLayouts>
							<Registration />
						</MainLayouts>
					)}
				/>
			</Switch>
		</div>
	)
}

export default App
