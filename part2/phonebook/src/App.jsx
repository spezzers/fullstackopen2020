import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNameInput = event => setNewName(event.target.value)
  const handleNumberInput = event => setNewNumber(event.target.value)
  const handleFilterInput = event => setFilter(event.target.value)

  const addPerson = event => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`'${newName}' is already in the phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilterInput} />
      <Form
        nameValue={newName}
        nameInput={handleNameInput}
        numberValue={newNumber}
        numberInput={handleNumberInput}
        onSubmit={addPerson}
      />
      <Persons peeps={persons} filter={filter} />
    </div>
  )
}

export default App
