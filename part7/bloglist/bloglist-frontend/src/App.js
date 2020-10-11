import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import Message from './components/Message'
import Login from './components/Login'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	const [message, setMessage] = useState({
		type: 'initial',
		content: ''
	})

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON)
			console.log('App useEffect')
			dispatch(setUser(user))
		}
		// else {
		// 	dispatch(clearUser())
		// }
	}, [dispatch])

	const handleMessage = (content, type) => {
		let messageType
		;['error', 'warning', 'confirm'].includes(type)
			? (messageType = type)
			: (messageType = 'message')
		setMessage({ type: messageType, content: content })
		let messageTimer = setTimeout(
			() => setMessage({ type: '', content: '' }),
			3500
		)
		window.clearTimeout(messageTimer - 1)
	}

	return (
		<div>
			<Login user={user} setUser={setUser} setMessage={handleMessage} />
			<Message message={message} />
			<BlogList user={user} setMessage={handleMessage} />
		</div>
	)
}

export default App
