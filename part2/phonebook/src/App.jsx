import React, { useState, useEffect } from 'react'
import Form from './components/Form.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import contactService from './services/contacts.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    contactService.getAll().then(response => {
      setPersons(response)
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
      contactService
        .add({ name: newName, number: newNumber })
        .then(res => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
        })
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
