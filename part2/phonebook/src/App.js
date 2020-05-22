import React, { useState } from 'react'
import './App.css';


const Persons = ({peeps}) => {
  const listPeeps = peeps.map(
    person => <p key={person.name}>{person.name}</p>
  )
  return <>{listPeeps}</>
}


const App = () => {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')


  const handleInput = event => setNewName(event.target.value)
  
  const addPerson = event => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    console.log(`${names} includes ${newName}? ${names.includes(newName)}`)
    if(names.includes(newName)) {
      alert(`'${newName}' is already in the phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName}))
      setNewName('')}
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInput}/>
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
