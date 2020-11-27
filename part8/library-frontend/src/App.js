import React, { useState, useEffect } from 'react'
import { useMessage } from './hooks/useMessage'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
	const [page, setPage] = useState('books')
	const [token, setToken] = useState(null)

	const client = useApolloClient()
	const message = useMessage()

	useEffect(() => {
		const savedToken = localStorage.getItem('bookLibrary-user-token')
		console.log(savedToken)
		if (savedToken) {
			console.log('token set')
			setToken(savedToken)
		}
	}, [])

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	const loginButton = token ? (
		<button onClick={logout}>logout</button>
	) : (
		<button onClick={() => setPage('login')}>login</button>
	)

	return (
		<div>
			{message.display}
			<div>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('add')}>add book</button>
				{loginButton}
			</div>

			<Books show={page === 'books'} />

			<Authors show={page === 'authors'} setMessage={message.newMessage} />

			<NewBook
				show={page === 'add'}
				setMessage={message.newMessage}
				setPage={setPage}
			/>
			<LoginForm
				show={page === 'login'}
				setToken={setToken}
				setError={message.newMessage}
			/>
		</div>
	)
}

export default App
