import React, { useState } from 'react'


const Persons = ({peeps}) => {
  const listPeeps = peeps.map(
    person => <p key={person.name}>{`${person.name} ${person.number}`}</p>
  )
  return <>{listPeeps}</>
}


const App = () => {

  const [ persons, setPersons ] = useState([
    {
      name: 'Arto Hellas',
      number: '0715369422'
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const handleNameInput = event => setNewName(event.target.value)
  const handleNumberInput = event => setNewNumber(event.target.value)

  const addPerson = event => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
      alert(`'${newName}' is already in the phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }
  

  return (
    <div>
      <div>debug: <br/>{newName} {newNumber}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons peeps={persons}/>
    </div>
  )
}

export default App
