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
				<button onClick={() => books.setFilter('')}>all genres</button>
				{books.genres.map(g => (
					<button key={g} onClick={() => books.setFilter(g)}>
						{g}
					</button>
				))}
			</div>
		</div>
	)
}

export default Books
