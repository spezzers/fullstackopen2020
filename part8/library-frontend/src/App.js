import React, { useState } from 'react'
import { useMessage } from './hooks/useMessage'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
	const [page, setPage] = useState('authors')

	const message = useMessage()

	return (
		<div>
			{message.display}
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
			</div>

			<Authors show={page === 'authors'} setMessage={message.newMessage} />

			<Books show={page === 'books'} />

			<NewBook
				show={page === 'add'}
				setMessage={message.newMessage}
				setPage={setPage}
			/>
		</div>
	)
}

export default App
