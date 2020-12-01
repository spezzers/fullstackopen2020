import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'



export const useMessage = () => {
	const [message, setMessage] = useState('')
	const [timer, setTimer] = useState()

	const newMessage = (message, duration) => {
		const time = duration || 5000
		clearTimeout(timer)
		const newTimer = setTimeout(() => {
			setMessage('')
			setTimer(undefined)
		}, time)
		setTimer(newTimer)
		setMessage(message)
	}

	const display = <div>{message}</div>

	return {
		display,
		newMessage
	}
}

export const useBookList = (title, initFilter) => {
	const [filter, setFilter] = useState(initFilter || '')

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

	// if (!props.show) {
	// 	return null
	// }


	// -------------------------------------------

	const component = books.loading
		? <div>Loading...</div>
		: (
		<div>
			<h2>{title}</h2>
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
		</div>
	)
	return {
		component,
		setFilter,
		genres
	}

}
