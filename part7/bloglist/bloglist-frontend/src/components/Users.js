import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../styled'

const UserContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	table {
		text-align: center;
		margin: 0 auto;
		thead {
			th {
				padding: 20px;
			}
		}
		td {
			padding: 5px;
			a, Link {
				color: ${colors.blue}
			}
		}
	}
`

const Users = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users)
	useEffect(() => {
		dispatch(getAllUsers())
	}, [dispatch])

	return (
		<UserContainer>
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
							<td>
								<Link to={`./users/${user.id}`}>{user.name}</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</UserContainer>
	)
}

export default Users
