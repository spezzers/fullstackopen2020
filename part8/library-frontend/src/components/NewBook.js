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
		//-------------------------------------------------------
		// This does the job but has unecessary network activity

		refetchQueries: genres.map(g => {
			return ({
				query: GET_BOOKS,
				variables: {genre: g}
			})
		}),

		// --------------------------    Alternative (not working)
		//
		// update: (store, response) => {
		// 	const allBookStore = store.readQuery({ query: GET_BOOKS })
		// 	const newBook = response.data.addBook
		// 	// console.log(newBook, allBookStore)
		// 	const updateQueries = genres.map(g => {
		// 		console.log(typeof g)
		// 		return ({
		// 			query: GET_BOOKS,
		// 			variables: {genre: g}
		// 		})
		// 	})
		// 	console.log('peach', updateQueries)
		// 	updateQueries.forEach(q => {
		// 		console.log(q)
		// 		const {existing} = store.readQuery(q) // Fails here for some reason
		// 		console.log(existing)
		// 			// store.writeQuery({
		// 			// 	query: GET_BOOKS,
		// 			// 	variables: q.variables,
		// 			// 	data: [...existing.getBooks, newBook]
		// 			// })

		// 			// store.writeQuery({
		// 			// 	query: GET_BOOKS,
		// 			// 	data: [...allBookStore.getBooks, newBook]
		// 			// })
		// 	}),

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
		try {
			await addBook({
				variables: { title, author, published: parseInt(published), genres }
			})
		} catch (error) {
			console.log(error.message)
			props.setMessage(error.message, 5000)
		}
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
