import React from 'react'
import { useBookList } from '../hooks'

const Recommended = props => {
	const faveGenre = props.user ? props.user.favouriteGenre : null
	const recommended = useBookList('Recommended Books', faveGenre)

	if (!props.show) {
		return null
	}

	if (!props.user) {
		return (
			<div>
				<h2>{recommended.title}</h2>
				<p>Please log in to see recommendations</p>
			</div>
		)
	}
	if (props.user !== undefined && props.user.favouriteGenre) {
		return <>{recommended.jsx}</>
	}

}

export default Recommended
