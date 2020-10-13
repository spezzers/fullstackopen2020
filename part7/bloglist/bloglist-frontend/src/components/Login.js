import React, { useState } from 'react'
import loginService from '../services/login'
import propTypes from 'prop-types'
import { setUser, clearUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from '../reducers/notificationReducer'



const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')


	const user = useSelector(state => state.user)
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
			notification('welcome', 'confirm')
		} catch (exception) {
			notification('wrong username or password', 'error')
		}
	}

	const handleLogout = event => {
		event.preventDefault()
		window.localStorage.removeItem('loggedInUser')
		dispatch(clearUser())
		notification('log out successful', 'confirm')
	}

	if (user.username === '') {
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
			<div>Hello {user.name}</div>
			<button onClick={handleLogout}>logout</button>
		</div>
	)
}

Login.propTypes = {
	user: propTypes.exact({
		username: propTypes.string.isRequired,
		name: propTypes.string.isRequired,
		token: propTypes.string.isRequired
	}).isRequired,
	setUser: propTypes.func.isRequired,
	notification: propTypes.func
}

export default Login
