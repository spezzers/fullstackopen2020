import React from 'react'
import { useBookList } from '../hooks'

const Recommended = props => {
	const books = useBookList('Recommended Books')

	if (!props.show) {
		return null
	}

	if (!props.user) {
		return (
			<div>
				<h2>{books.title}</h2>
				<p>Please log in to see recommendations</p>
			</div>
		)
	}

	return <>{books.jsx}</>
}

export default Recommended
