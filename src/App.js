import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { auth, handleUserProfile } from './firebase/utils'

import WithAuth from './hoc/withAuth'

import MainLayout from './layouts/MainLayout'
import HomepagesLayout from './layouts/HomepagesLayout'

import Homepage from './pages/Homepages/index'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard'

import './default.scss'
import { setCurrentUser } from './redux/User/user.action'

const App = (props) => {
	const { setCurrentUser, currentUser } = props
	useEffect(() => {
		const authListener = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth)
				userRef.onSnapshot((snapshot) => {
					setCurrentUser({
						currentUser: {
							id: snapshot.id,
							...snapshot.data(),
						},
					})
				})
			}
			setCurrentUser(userAuth)
		})

		return () => {
			authListener()
		}
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
					render={() =>
						currentUser ? (
							<Redirect to='' />
						) : (
							<MainLayout>
								<Login />
							</MainLayout>
						)
					}
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

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
