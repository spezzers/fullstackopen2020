import React from 'react'
import Login from '../components/Login'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = props => {
	const loggedInUser = useSelector(state => state.loggedInUser)

	const NavItem = props => (
		<div
			style={{
				display: 'inline',
				padding: '10px'
			}}
		>
			{props.children}
		</div>
	)
	return (
		<>
			<div
				style={{
					display: 'inline-block'
				}}
			>
				<NavItem>
					<Link to='/'>Blogs</Link>
				</NavItem>
				<NavItem>
					<Link to='/users'>Users</Link>
				</NavItem>
				<NavItem>
					<Login user={loggedInUser}>{props.children}</Login>
				</NavItem>
			</div>
		</>
	)
}

export default NavBar
