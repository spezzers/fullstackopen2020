import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_BOOKS, LOGIN, ME } from './queries'
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

export const useBookList = (title, initFilter) => {
	const [filter, setFilter] = useState('')

	const books = useQuery(ALL_BOOKS)

	const allBooks = books.data && books.data.allBooks ? books.data.allBooks : []
	useEffect(() => {
		if (initFilter) {
			setFilter(initFilter)
		}
	}, [initFilter])

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

	const jsx = books.loading ? (
		<div>Loading...</div>
	) : (
		<div>
			<h2>{title}</h2>
			{filter === '' || initFilter ? null : (
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

	const [login, result] = useMutation(LOGIN, {
		onError: error => {
			setMessage(error.message)
		}
	})

	useEffect(() => {
		const storedToken = localStorage.getItem('bookLibrary-user-token')
		if (result.data) {
			const newToken = result.data.login.value
			setToken(newToken)
			localStorage.setItem('bookLibrary-user-token', newToken)
		}
		if (storedToken !== token) {
			setToken(storedToken)
		}
		refetch()
	}, [result.data, token, refetch])

	if (error) {
		return () => setMessage(error.message)
	}

	const submit = (username, password) => event => {
		event.preventDefault()
		return login({ variables: { username, password } })
	}

	const logout = async callback => {
		const cbFn = () => callback
		const confirm = window.confirm('Are you sure you want to log out?')
		if (confirm !== false) {
			localStorage.clear()
			client.resetStore()
			setToken(null)
			cbFn()
			// debugger
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
