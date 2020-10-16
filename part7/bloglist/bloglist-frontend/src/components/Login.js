import React, { useState } from 'react'
import loginService from '../services/login'
import { setUser, clearUser } from '../reducers/loggedInUserReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from '../reducers/notificationReducer'



const Login = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')


	const loggedInUser = useSelector(state => state.loggedInUser)
	const dispatch = useDispatch()


	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password
			})
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			dispatch(setUser(user))
			setUsername('')
			setPassword('')
			dispatch(notification('welcome', 'confirm'))
		} catch (exception) {
			dispatch(notification('wrong username or password', 'error'))
		}
	}

	const handleLogout = event => {
		event.preventDefault()
		window.localStorage.removeItem('loggedInUser')
		dispatch(clearUser())
		dispatch(notification('log out successful', 'confirm'))
	}

	if (loggedInUser.username === '') {
		return (
			<div>
				<h2>Login</h2>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type='text'
							value={username}
							id='username'
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password
						<input
							type='password'
							value={password}
							id='password'
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button id="login-button" type='submit'>login</button>
				</form>
			</div>
		)
	}
	return (
		<div>
			<div>Hello {loggedInUser.name}</div>
			<button onClick={handleLogout}>logout</button>
			{props.children}
		</div>
	)
}

export default Login
