import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Login from './components/Login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON)
			setUser(user)
		}
	}, [])

	const bloglist = () => {
		const list = () => blogs.map(blog => <Blog key={blog.id} blog={blog} />)
		return (
			<div>
				Hello {user.name}
				<Login user={user} setUser={setUser} />
				<h2>Blogs</h2>
				{list()}
			</div>
		)
	}

	return (
		<div>
			{user === null ? <Login user={user} setUser={setUser} /> : bloglist()}
		</div>
	)
}

export default App
