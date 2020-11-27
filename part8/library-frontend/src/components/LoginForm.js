import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = props => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN, {
		onError: error => {
			props.setError(error.graphQLErrors[0].message)
		}
	})

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			props.setToken(token)
			localStorage.setItem('bookLibrary-user-token', token)
		}
	}, [result.data]) //eslint-disable-line

	if (!props.show) {
		return null
	}

	if (localStorage.getItem('bookLibrary-user-token')) {
		return <h2>Welcome</h2>
	}

	const submit = async event => {
		event.preventDefault()

		login({ variables: { username, password } }).then(() => {
			setUsername('')
			setPassword('')
		})
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={submit}>
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
