import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, Redirect } from 'react-router-dom'

const UserInfo = () => {
	const users = useSelector(state => state.users)
	const match = useRouteMatch('/users/:id')
	const user = users.find(u => u.id === match.params.id)

	if (!user) {
		return <Redirect to='/users' />
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map(blog => <li key={blog.id}>{blog.title} - <em>{blog.author}</em></li>)}
			</ul>
		</div>
	)
}

export default UserInfo
