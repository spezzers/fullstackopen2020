import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Message from './components/Message'
import MessageTest from './components/dev/MessageTest'
import Login from './components/Login'

const App = () => {
	const [user, setUser] = useState(null)
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

	const handleMessage = (type, content) => {
		let messageType
		['error', 'warning', 'confirm'].includes(type) ? messageType = type : messageType ='message'
		setMessage({type: messageType, content: content})
		let messageTimer = setTimeout(
			() => setMessage({type:'', content:''}),
			3500
			)
		window.clearTimeout(messageTimer - 1)
	}

	return (
		<div>
			<MessageTest handleMessage={handleMessage} />
			<Login user={user} setUser={setUser} setMessage={handleMessage}/>
			<Message message={message} />
			<BlogList user={user} setMessage={handleMessage}/>
		</div>
	)
}

export default App
