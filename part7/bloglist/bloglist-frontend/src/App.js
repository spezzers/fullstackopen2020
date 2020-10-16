import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import Message from './components/Message'
import Login from './components/Login'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import { setUser } from './reducers/loggedInUserReducer'
import { Switch, Route, Link } from 'react-router-dom'

const App = () => {
	const dispatch = useDispatch()
	const loggedInUser = useSelector(state => state.loggedInUser)
	const message = useSelector(state => state.message)

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON)
			dispatch(setUser(user))
		}
	}, [dispatch])

	return (
		<div>
			<Message message={message} />
			<Login user={loggedInUser}>
				<Switch>
					<Route path='/users/:id'>
						<UserInfo />
					</Route>
					<Route path='/users'>
						<Link to='/'>Go to Blogs</Link>
						<Users />
					</Route>
					<Route path='/'>
						<Link to='/users'>Go to Users</Link>
						<BlogList />
					</Route>
				</Switch>
			</Login>
		</div>
	)
}

export default App
