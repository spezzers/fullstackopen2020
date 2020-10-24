import React from 'react'
import BlogList from './components/BlogList'
import Message from './components/Message'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import Blog from './components/Blog'
import { Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import { useUser } from './hooks'
import styled from 'styled-components'
import { colors } from './styled'

const AppContainer = styled.div`
	margin: 0 auto;
	max-width: 800px;
	color: ${colors.main};
	height: 100vh;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	/* padding: 3%; */
	box-sizing: border-box;
	h2 {
		width: 100%;
		text-align: center;
	}
	link,
	a {
		text-decoration: none;
		color: inherit;
		:visited {
			/* color: inherit; */
		}
	}
`
const ViewContainer = styled.div`
	margin-top: 60px;
`

const App = () => {
	const user = useUser()

	const accessApp = () => {
		if (user.isLoggedIn) {
			return (
				<Switch>
					<Route path='/blogs/:id'>
						<Blog />
					</Route>
					<Route path='/users/:id'>
						<UserInfo />
					</Route>
					<Route path='/users'>
						<Users />
					</Route>
					<Route path='/'>
						<BlogList />
					</Route>
				</Switch>
			)
		}
	}

	return (
		<AppContainer>
			<Message />
			<ViewContainer>
				<NavBar />
				{accessApp()}
			</ViewContainer>
		</AppContainer>
	)
}

export default App
