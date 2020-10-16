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


	return <div>User Info</div>
}

export default UserInfo
