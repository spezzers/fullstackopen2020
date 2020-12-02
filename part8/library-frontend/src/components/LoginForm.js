import React, { useState } from 'react'

const LoginForm = props => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	
	const auth = props.auth


	

	if (!props.show) {
		return null
	}

	if (auth.token) {
		return <h2>Welcome</h2>
	}



	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={auth.submit(username, password)}>
				<div>
					username
					<input
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>submit</button>
			</form>
		</div>
	)
}

export default LoginForm
