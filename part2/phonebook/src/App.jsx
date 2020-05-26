import React, { useState, useEffect } from 'react'
import Form from './components/Form.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import contactService from './services/contacts.js'
import Notification from './components/Notification'
import './index.css'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [message, setMessage] = useState({type: '', content:''})

	useEffect(() => {
		contactService.getAll().then(initial => {
			setPersons(initial)
		})
	}, [])

	const handleNameInput = event => setNewName(event.target.value)
	const handleNumberInput = event => setNewNumber(event.target.value)
	const handleFilterInput = event => setFilter(event.target.value)
	const clearForm = () => {
		setNewName('')
		setNewNumber('')
	}

	const addPerson = event => {
		event.preventDefault()
		const duplicate = persons.filter(
			person => person.name.toUpperCase() === newName.toUpperCase()
		)
		const chosenOne = duplicate[0]

		if (duplicate.length > 0) {
			if (window.confirm(`'${newName}' is already in the phonebook, update number?`)) {
				const updatedContact = { ...chosenOne, number: newNumber }
				contactService.update(chosenOne.id, updatedContact).then(res => {
					setPersons(persons.map(p => (p.id !== chosenOne.id ? p : res)))
					showMessage('success', `Updated ${res.name}`)
					clearForm()
				})
			}
		} else {
			contactService.add({ name: newName, number: newNumber }).then(res => {
				setPersons(persons.concat(res))
				showMessage('success', `Added ${res.name}`)
				clearForm()
			})
		}
	}

	const removePerson = event => {
		const id = parseInt(event.target.id)
		const deleteMe = persons.filter(p => p.id === id)[0]

		if (window.confirm(`Do you really want to delete ${deleteMe.name}`)) {
			contactService
				.remove(id)
				.then(() => {
					setPersons(persons.filter(p => p.id !== id))
					showMessage('notify', `Deleted ${deleteMe.name}`)
				})
		}
	}

	const showMessage = (type, message, duration) => {
		const showTime = duration || 4000
		setMessage({type: type, content: message})
		setTimeout(() => setMessage({type:'', content: ''}), showTime)
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification type={message.type} content={message.content}/>
			<Filter value={filter} onChange={handleFilterInput} />
			<Form
				nameValue={newName}
				nameInput={handleNameInput}
				numberValue={newNumber}
				numberInput={handleNumberInput}
				onSubmit={addPerson}
			/>
			<Persons peeps={persons} filter={filter} remove={removePerson} />
		</div>
	)
}

export default App
