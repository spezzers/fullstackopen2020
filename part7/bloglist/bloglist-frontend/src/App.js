import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import Message from './components/Message'
import Login from './components/Login'
import Users from './components/Users'
import { setUser } from './reducers/userReducer'

const App = () => {
	const dispatch = useDispatch()

	const user = useSelector(state => state.user)
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
			<Login user={user} setUser={setUser} />
			<Message message={message} />
			<BlogList user={user} />
			<Users />
		</div>
	)
}

export default App
