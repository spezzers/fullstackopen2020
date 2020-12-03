import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { GET_BOOKS, LOGIN, ME } from './queries'
import { useApolloClient } from '@apollo/client'

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

export const useBookList = (title, strictFilter) => {
	const [filter, setFilter] = useState(null)
	const [books, setBooks] = useState([])
	const handleFilter = strictFilter !== undefined ? { genre: strictFilter } : {genre: filter}

	const [getBooks, { loading, called, error, data, refetch }] = useLazyQuery(
		GET_BOOKS,
		{
			variables: handleFilter,
			onError: error => console.log(error.message),
			onCompleted: response => setBooks(response.getBooks)
		}
	)

	console.log(title, strictFilter, handleFilter)
	useEffect(() => {
		if (!called) {
			getBooks()
			console.log('first query call:', title)
		}
		if (!loading && called) {
			refetch(handleFilter)
			console.log(`refetch({variables: {genre: ${handleFilter.genre}}})`, title, books)
		}
	}, [filter, books])
	
	if (error) {
		return (
			<div>
				<h2>Error</h2>
				<p>{error.message}</p>
			</div>
		)
	}

	const allBooks = data && data.getBooks ? data.getBooks : []

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

	// const booksToShow =
	// 	filter === ''
	// 		? allBooks
	// 		: allBooks.filter(book => book.genres.includes(filter))

	const jsx = loading ? (
		<div>Loading...</div>
	) : (
		<div>
			<h2>{title}</h2>
			{filter === null || strictFilter ? null : (
				<p>
					in genre: <strong>{filter}</strong>
				</p>
			)}
			<table>
				<tbody>
					<tr>
						<th>Book Title</th>
						<th>Author</th>
						<th align='center'>Published</th>
					</tr>
					{allBooks.map(a => (
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
		jsx,
		setFilter,
		genres,
		title
	}
}

export const useAuthentication = setMessage => {
	const [token, setToken] = useState(null)
	const client = useApolloClient()
	const { loading, error, data, refetch } = useQuery(ME) //eslint-disable-line
	const me = data ? data.me : null

	const [login] = useMutation(LOGIN, {
		onError: error => {
			setMessage(error.message)
		},
		update: (store, response) => {
			const newToken = response.data.login.value
			localStorage.setItem('bookLibrary-user-token', newToken)
			setToken(newToken)
			refetch()
		}
	})

	useEffect(() => {
		const storedToken = localStorage.getItem('bookLibrary-user-token')
		if (storedToken !== token) {
			setToken(storedToken)
			refetch()
		}
	}, [token, refetch, me])

	if (error) {
		return () => setMessage(error.message)
	}

	const submit = (username, password) =>
		login({ variables: { username, password } })

	const logout = callback => {
		const cbFn = () => callback
		const confirm = window.confirm('Are you sure you want to log out?')
		if (confirm !== false) {
			localStorage.clear()
			client.resetStore()
			setToken(null)
			cbFn()
		}
	}

	return {
		token,
		setToken,
		me,
		logout,
		submit
	}
}
