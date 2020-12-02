import React, { useState } from 'react'
import { useMessage, useAuthentication } from './hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
	const [page, setPage] = useState('books')

	const message = useMessage()

	const auth = useAuthentication(message.newMessage)
	const logout = () => auth.logout(() => setPage('login'))

	const loginButton = auth.token ? (
		<button onClick={logout}>logout</button>
	) : (
		<button onClick={() => setPage('login')}>login</button>
	)

	const showIfLoggedIn = { display: auth.token ? null : 'none' }

	return (
		<div>
			{message.display}
			<div>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('authors')}>authors</button>
				<button style={showIfLoggedIn} onClick={() => setPage('add')}>
					add book
				</button>
				<button onClick={() => setPage('recommended')}>recommended</button>
				{loginButton}
			</div>

			<Books show={page === 'books'} />

			<Authors
				show={page === 'authors'}
				setMessage={message.newMessage}
				showIfLoggedIn={showIfLoggedIn}
			/>

			<NewBook
				show={page === 'add'}
				setMessage={message.newMessage}
				setPage={setPage}
			/>
			<Recommended show={page === 'recommended'} user={auth.me} />
			<LoginForm
				show={page === 'login'}
				auth={auth}
			/>
		</div>
	)
}

export default App
