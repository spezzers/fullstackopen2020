import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
	const [filter, setFilter] = useState('')
	const books = useQuery(ALL_BOOKS)

	if (!props.show) {
		return null
	}

	if (books.loading) {
		return <div>Loading...</div>
	}

	let genres
	let booksToShow

	if (books.data) {
		booksToShow =
			filter === ''
				? books.data.allBooks
        : books.data.allBooks.filter(book => book.genres.includes(filter))
        
		const genreArray = books.data.allBooks.flatMap(book => book.genres)
		genres = genreArray.reduce((acc, cur) => {
			if (acc.includes(cur)) {
				return [...acc]
			}
			return acc.concat(cur)
		}, [])
	}

	return (
		<div>
			<h2>books</h2>
      {filter !== '' ? <p>in genre: <strong>{filter}</strong></p> : null}
			<table>
				<tbody>
					<tr>
						<th>Book Title</th>
						<th>Author</th>
						<th align='center'>Published</th>
					</tr>
					{booksToShow.map(a => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td align='center'>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
      <button onClick={() => setFilter('')}>all genres</button>
				{genres.map(g => (
					<button onClick={() => setFilter(g)}>{g}</button>
				))}
			</div>
		</div>
	)
}

export default Books
