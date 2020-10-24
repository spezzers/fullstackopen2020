import React from 'react'
import Login from '../components/Login'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { colors } from '../styled'

const NavContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 5px 10px 20px;
	width: 100%;
	margin: 0;
	button {
		background-color: ${colors.blue};
		border-style:  outset;
		border-radius: 6px;
		color: white;
		:hover {
			background-color: yellow;
			color: black;
		}
	}
	.navLinks {
		border-bottom: 1px solid;
		color: ${colors.main};
	}
`
const NavItem = styled.div`
	a,
	Link {
		:hover, :visited:hover {
			border-radius: 20px;
			color: ${colors.offWhite};
			background: linear-gradient(
				63deg,
				${colors.blue} -50%,
				rgba(0, 0, 0, 0) 150%
			);
		}
		:visited {
			color: initial;
		}
		color: ${colors.main};
		padding: 5px 15px;
		text-decoration: none;
	}
`
const NavBar = () => {
	const loggedInUser = useSelector(state => state.loggedInUser)
	const showNav = loggedInUser.username !== ''
	return (
		<>
			<NavContainer>
				{showNav ? (
					<>
						<NavItem className='navLinks'>
							<Link to='/'>Blogs</Link>
							<Link to='/users'>Users</Link>
						</NavItem>
					</>
				) : null}
				<NavItem>
					<Login />
				</NavItem>
			</NavContainer>
		</>
	)
}

export default NavBar
