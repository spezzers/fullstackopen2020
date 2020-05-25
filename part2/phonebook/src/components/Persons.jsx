import React from 'react'


const Persons = ({ peeps, filter, remove }) => {

	const filteredPeeps = peeps.filter(person =>
		person.name.toUpperCase().includes(filter.toUpperCase())
	)
	const listPeeps = filteredPeeps.map(person => {
		return (
			<div key={person.id}>
				{`${person.name} ${person.number}`}
				<button id={person.id} onClick={remove}>
					Delete
				</button>
			</div>
		)
  })
  
	return (
		<>
			<h2>Numbers</h2>
			{listPeeps}
		</>
	)
}

export default Persons
