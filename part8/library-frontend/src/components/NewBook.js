import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, GET_BOOKS } from '../queries'

const NewBook = props => {
	const [title, setTitle] = useState('')
	const [author, setAuhtor] = useState('')
	const [published, setPublished] = useState('')
	const [genre, setGenre] = useState('')
	const [genres, setGenres] = useState([])

	const [addBook] = useMutation(ADD_BOOK, {
		onError: error => {
			props.setMessage(error.message)
			console.log(error.message)
		},
		update: (store, response) => {
			const newData = response.data.addBook
			const allBooksInStore = store.readQuery({ query: GET_BOOKS })
			const queries = genres.map(g => {
				return {
					query: GET_BOOKS,
					variables: { genre: g }
				}
			})
			queries.forEach(q => {
				const getDataInStore = store.readQuery(q)
				const dataInStore = getDataInStore ? getDataInStore.getBooks : null
				if (dataInStore) {
					store.writeQuery({
						query: q.query,
						variables: q.variables,
						data: {
							...getDataInStore,
							getBooks: [...dataInStore, newData]
						}
					})
				}
			})
			store.writeQuery({
				query: GET_BOOKS,
				variables: {},
				data: {
					...allBooksInStore,
					getBooks: [...allBooksInStore.getBooks, newData]
				}
			})
		},

		onCompleted: () => {
			setTitle('')
			setPublished('')
			setAuhtor('')
			setGenres([])
			setGenre('')
			props.setPage('books')
		}
	})

	if (!props.show) {
		return null
	}

	const submit = async event => {
		event.preventDefault()

		await addBook({
			variables: { title, author, published: parseInt(published), genres }
		})
	}

	const addGenre = () => {
		if (genre !== '') {
			setGenres(genres.concat(genre))
			setGenre('')
		}
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuhtor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type='number'
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type='button'>
						add genre
					</button>
				</div>
				<div>genres: {genres.join(' ')}</div>
				<button type='submit'>create book</button>
			</form>
		</div>
	)
}

export default NewBook
