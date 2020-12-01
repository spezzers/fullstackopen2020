import React, { useState, useEffect } from 'react'
import { useMessage } from './hooks'
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
		if (savedToken) {
			console.log('token set')
			setToken(savedToken)
		}
	}, [])

	const logout = () => {
		const confirm = window.confirm('Are you sure you want to log out?')
		if (confirm) {
			setToken(null)
			localStorage.clear()
			client.resetStore()
			setPage('login')
		}
		
	}

	const loginButton = token ? (
		<button onClick={logout}>logout</button>
	) : (
		<button onClick={() => setPage('login')}>login</button>
	)

	const showIfLoggedIn = {display: token ? null : 'none'}

	return (
		<div>
			{message.display}
			<div>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('authors')}>authors</button>
				<button style={showIfLoggedIn} onClick={() => setPage('add')}>add book</button>
				{loginButton}
			</div>

			<Books show={page === 'books'} />

			<Authors show={page === 'authors'} setMessage={message.newMessage} showIfLoggedIn={showIfLoggedIn}/>

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
