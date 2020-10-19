import React from 'react'
import BlogList from './components/BlogList'
import Message from './components/Message'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import Blog from './components/Blog'
import { Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import { useUser } from './hooks'

const App = () => {

	const user = useUser()

	const accessApp = () => {
		if (user.isLoggedIn) {
			return (
				<Switch>
					<Route path='/blogs/:id'>
						<Blog />
					</Route>
					<Route path='/users/:id'>
						<UserInfo />
					</Route>
					<Route path='/users'>
						<Users />
					</Route>
					<Route path='/'>
						<BlogList />
					</Route>
				</Switch>
			)
		}
	}

	return (
		<>
			<Message/>
			<NavBar/>
			{accessApp()}
		</>
	)
}

export default App
