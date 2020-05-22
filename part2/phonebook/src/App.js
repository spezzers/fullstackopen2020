import React, { useState } from 'react'


const Filter = (props) => {
  return (
    <div>
        filter: <input value={props.value} onChange={props.onChange}/>
    </div>
  )
}

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


const Form = (props) => {

  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.nameValue} onChange={props.nameInput}/>
        </div>
        <div>
          number: <input value={props.numberValue} onChange={props.numberInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}




const App = () => {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  const handleNameInput = event => setNewName(event.target.value)
  const handleNumberInput = event => setNewNumber(event.target.value)
  const handleFilterInput = event => setFilter(event.target.value)

  

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
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilterInput}/>
      <Form nameValue={newName} nameInput={handleNameInput} numberValue={newNumber} numberInput={handleNumberInput} onSubmit={addPerson} />
      <Persons peeps={persons} filter={filter}/>
    </div>
  )
}

export default App
