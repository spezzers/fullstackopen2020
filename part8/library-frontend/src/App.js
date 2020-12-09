import React, { useState } from 'react'
import { useMessage, useAuthentication } from './hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { BOOK_ADDED, GET_BOOKS } from './queries'
import { useSubscription } from '@apollo/client'

const App = ({ client }) => {
	const [page, setPage] = useState('books')
	const message = useMessage()
	const auth = useAuthentication(message.newMessage)

	const updateCacheWith = addedBook => {
		const includedIn = (set, object) => set.map(b => b.id).includes(object.id)
		const dataInStore = client.readQuery({ query: GET_BOOKS })
		if (!includedIn(dataInStore.getBooks, addedBook)) {
			const allBooksInStore = client.readQuery({ query: GET_BOOKS })
			const genres = addedBook.genres
			const queries = genres.map(g => {
				return {
					query: GET_BOOKS,
					variables: { genre: g }
				}
			})
			queries.forEach(q => {
				const getDataInStore = client.readQuery(q)
				const dataInStore = getDataInStore ? getDataInStore.getBooks : null
				if (dataInStore) {
					client.writeQuery({
						query: q.query,
						variables: q.variables,
						data: {
							...getDataInStore,
							getBooks: [...dataInStore, addedBook]
						}
					})
				}
			})
			client.writeQuery({
				query: GET_BOOKS,
				variables: {},
				data: {
					...allBooksInStore,
					getBooks: [...allBooksInStore.getBooks, addedBook]
				}
			})
		}
	}

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
			message.newMessage(
				`Added: '${addedBook.title}' by ${addedBook.author.name}`
			)
			updateCacheWith(addedBook)
		}
	})

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
				<button style={showIfLoggedIn} onClick={() => setPage('recommended')}>
					recommended
				</button>
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
				me={auth.me}
			/>
			<Recommended show={page === 'recommended'} user={auth.me} />
			<LoginForm show={page === 'login'} auth={auth} />
		</div>
	)
}

export default App
