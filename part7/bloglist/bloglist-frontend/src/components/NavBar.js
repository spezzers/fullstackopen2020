import React from 'react'
import Login from '../components/Login'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavBar = () => {
	const loggedInUser = useSelector(state => state.loggedInUser)
	const showNav = loggedInUser.username !== ''
	const navItem = content => {
		return (
			<div style={{ display: 'inline', padding: '5px 10px' }}>
				{content}
			</div>
		)
	}
	return (
		<>
			<div
				style={{
					display: 'inline-block',
					backgroundColor: '#ddd',
					padding: '5px 10px',
					width: '100%',
					margin: '0px'
				}}
			>
				{showNav ? (
					<>
						{navItem(<Link to='/'>Blogs</Link>)}
						{navItem(<Link to='/users'>Users</Link>)}
					</>
				) : null}
				{navItem(<Login />)}
			</div>
		</>
	)
}

export default NavBar
