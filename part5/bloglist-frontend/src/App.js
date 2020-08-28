import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Message from './components/Message'
import Login from './components/Login'

const App = () => {
	const [user, setUser] = useState({username: '', name: '', token: ''})
	const [message, setMessage] = useState(
		{
			type: 'initial',
			content: 'This is the initial message content'
		}
	)

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON)
			setUser(user)
		}
	}, [])
	
	const handleMessage = (content, type) => {
		let messageType
		['error', 'warning', 'confirm'].includes(type) ? messageType = type : messageType = 'message'
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
