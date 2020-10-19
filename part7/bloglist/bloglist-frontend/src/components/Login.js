import React from 'react'
import loginService from '../services/login'
import { setUser, clearUser } from '../reducers/loggedInUserReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const Login = () => {
	const username = useField('text')
	const password = useField('password')

	const loggedInUser = useSelector(state => state.loggedInUser)
	const dispatch = useDispatch()

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username: username.value,
				password: password.value
			})
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			dispatch(setUser(user))
			username.onChange('reset')
			password.onChange('reset')
			dispatch(notification('welcome', 'confirm'))
		} catch (exception) {
			dispatch(notification('wrong username or password', 'error'))
		}
	}

	const handleLogout = event => {
		event.preventDefault()
		dispatch(clearUser())
		dispatch(notification('log out successful', 'confirm'))
	}

	if (loggedInUser.username === '') {
		return (
			<>
				<h2>Login</h2>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							id='username'
							type={username.type}
							value={username.value}
							onChange={username.onChange}
						/>
					</div>
					<div>
						password
						<input
							id='password'
							type={password.type}
							value={password.value}
							onChange={password.onChange}
						/>
					</div>
					<button id='login-button' type='submit'>
						login
					</button>
				</form>
			</>
		)
	}
	return (
		<>
			Hello {loggedInUser.name}
			<button
				style={{ padding: '4px 8px', margin: '0 8px' }}
				onClick={handleLogout}
			>
				logout
			</button>
		</>
	)
}

export default Login
