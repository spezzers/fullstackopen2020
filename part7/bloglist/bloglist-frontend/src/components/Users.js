import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'

const Users = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getAllUsers())
	}, [dispatch])

	const users = useSelector(state => state.users)

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Blogs Added</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.blogCount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Users
