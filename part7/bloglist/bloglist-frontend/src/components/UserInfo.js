import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, Redirect } from 'react-router-dom'
import BlogList from './BlogList'

const UserInfo = () => {
	const users = useSelector(state => state.users)
	const match = useRouteMatch('/users/:id')
	const loggedInUser = useSelector(state => state.loggedInUser)

	const user = users.find(u => u.id === match.params.id)

	if (!user) {
		return <Redirect to='/users' />
	}
	const currentUser = user.username === loggedInUser.username

	return (
		<div>
			<h2>{user.name} {currentUser ? '(That\'s you!)' : null}</h2>
			<h3>added blogs</h3>
			<BlogList userFilter={user} />
		</div>
	)
}

export default UserInfo
