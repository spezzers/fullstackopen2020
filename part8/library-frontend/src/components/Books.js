import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
	const [filter, setFilter] = useState('')

	const books = useQuery(ALL_BOOKS)

	const allBooks = books.data && books.data.allBooks ? books.data.allBooks : []

	const genres = allBooks
		? allBooks
				.flatMap(book => book.genres)
				.reduce((acc, cur) => {
					if (acc.includes(cur)) {
						return [...acc]
					}
					return acc.concat(cur)
				}, [])
		: []

	const booksToShow =
		filter === ''
			? allBooks
			: allBooks.filter(book => book.genres.includes(filter))

	// ------------------------ conditional rendering

	if (!props.show) {
		return null
	}

	if (books.loading) {
		return <div>Loading...</div>
	}

	// -------------------------------------------

	return (
		<div>
			<h2>books</h2>
			{filter !== '' ? (
				<p>
					in genre: <strong>{filter}</strong>
				</p>
			) : null}
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
					<button key={g} onClick={() => setFilter(g)}>
						{g}
					</button>
				))}
			</div>
		</div>
	)
}

export default Books
