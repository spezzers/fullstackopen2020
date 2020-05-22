import React from 'react'


const Persons = ({peeps, filter}) => {
    const filteredPeeps = peeps.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    const listPeeps = filteredPeeps.map(
      person => <div key={person.name}>{`${person.name} ${person.number}`}</div>
    )
    return (
      <>
        <h2>Numbers</h2>
        {listPeeps}
      </>
    )
  }

  export default Persons