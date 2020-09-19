import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import WithAuth from './hoc/withAuth'

import MainLayout from './layouts/MainLayout'
import HomepagesLayout from './layouts/HomepagesLayout'

import Homepage from './pages/Homepages/index'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard'

import { checkUserSession } from './redux/User/user.action'

import './default.scss'

const App = (props) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(checkUserSession())
	}, [])

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
						<MainLayout>
							<Registration />
						</MainLayout>
					)}
				/>
				<Route
					path='/login'
					render={() => (
						<MainLayout>
							<Login />
						</MainLayout>
					)}
				/>
				<Route
					path='/recovery'
					render={() => (
						<MainLayout>
							<Recovery />
						</MainLayout>
					)}
				/>

				<Route
					path='/dashboard'
					render={() => (
						<WithAuth>
							<MainLayout>
								<Dashboard />
							</MainLayout>
						</WithAuth>
					)}
				/>
			</Switch>
		</div>
	)
}

export default App
