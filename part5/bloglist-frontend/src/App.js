import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'

import Login from './components/Login'

const App = () => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON)
			setUser(user)
		}
	}, [])

	return (
		<div>
			<Login user={user} setUser={setUser} />
			<BlogList user={user} />
		</div>
	)
}

export default App
