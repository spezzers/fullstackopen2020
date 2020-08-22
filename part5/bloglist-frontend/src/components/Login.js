import React, { useState } from 'react'
import loginService from '../services/login'

const Login = ({ user, setUser, setMessage}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password
			})
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			setUser(user)
			setMessage('confirm', 'log in successful')
			setUsername('')
			setPassword('')
		} catch (exception) {
			alert('wrong credentials')
		}
	}
	
	const handleLogout = event => {
		event.preventDefault()
		window.localStorage.removeItem('loggedInUser')
		setUser(null)
		setMessage('confirm', 'log out successful')
	}

	if (user === null) {
		return (
			<div>
				<h2>Login</h2>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type='text'
							value={username}
							name='Username'
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password
						<input
							type='password'
							value={password}
							name='Password'
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type='submit'>login</button>
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

export default Login
