import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { GET_BOOKS, LOGIN, ME } from './queries'
import { useApolloClient } from '@apollo/client'

/////////////////////////////////////////////   M E S S A G E

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

////////////////////////////////////////////////  B O O K   L I S T

export const useBookList = (title, strictFilter) => {
	const [filter, setFilter] = useState('')

	const variables = filter ? { genre: filter } : null

	const [getBooks, { loading, error, data }] = useLazyQuery(GET_BOOKS, {
		variables,
		onError: error => console.log(error.message)
	})

	useEffect(() => {
		if (!loading) {
			if (strictFilter === undefined) {
				if (filter === '') {
					return setFilter(null)
				}
				return getBooks()
			} else if (strictFilter !== null) {
				if (!filter) {
					return setFilter(strictFilter)
				}
				getBooks()
			}
		}
	}, [filter, strictFilter, data]) // eslint-disable-line

	if (error) {
		return (
			<div>
				<h2>Error</h2>
				<p>{error.message}</p>
			</div>
		)
	}

	const books = data && data.getBooks ? data.getBooks : []

	const genres =
		books.length > 0
			? books
					.flatMap(book => book.genres)
					.reduce((acc, cur) => {
						if (acc.includes(cur)) {
							return [...acc]
						}
						return acc.concat(cur)
					}, [])
			: []

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
					{books.map(a => (
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

/////////////////////////////////////   A U T H E N T I C A T I O N

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

////////////////////////////////////////////////////////////////
