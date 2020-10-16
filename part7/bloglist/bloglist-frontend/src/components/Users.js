import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

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
							<td><Link to={`./users/${user.id}`}>{user.name}</Link></td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Users
