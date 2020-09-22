import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import WithAuth from './hoc/withAuth'
import WithAdminAuth from './hoc/withAdminAuth'

import MainLayout from './layouts/MainLayout'
import HomepagesLayout from './layouts/HomepagesLayout'

import AdminToolbar from './components/AdminToolbar'

import Homepage from './pages/Homepages/index'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

import { checkUserSession } from './redux/User/user.action'

import './default.scss'
import AdminLayout from './layouts/AdminLayout'
import Search from './pages/Search'

const App = (props) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(checkUserSession())
	}, [])

	return (
		<div className='App'>
			<AdminToolbar />
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
					path='/search'
					render={() => (
						<MainLayout>
							<Search />
						</MainLayout>
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

				<Route
					path='/admin'
					render={() => (
						<WithAdminAuth>
							<AdminLayout>
								<Admin />
							</AdminLayout>
						</WithAdminAuth>
					)}
				/>
			</Switch>
		</div>
	)
}

export default App
