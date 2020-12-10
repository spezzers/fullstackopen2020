import React from 'react'
import { useBookList } from '../hooks'

const Books = props => {

	const books = useBookList('Books')
	
	if (!props.show) {
		return null
	}

	return (
		<div>
			{books.jsx}
			<div>
				<button onClick={() => books.setFilter(null)}>all genres</button>
				{books.genres ? books.genres.map(g => (
					<button key={g} onClick={() => books.setFilter(g)}>
						{g}
					</button>
				)) : null}
			</div>
		</div>
	)
}

export default Books
