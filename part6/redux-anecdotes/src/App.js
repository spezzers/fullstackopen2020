import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { importAnecdote } from './reducers/anecdoteReducer'

const App = () => {
	const dispatch = useDispatch()
	
	useEffect(() => {
		anecdoteService.getAll().then(anecs => {
			anecs.map(a => dispatch(importAnecdote(a)))
		})
	}, [dispatch])

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App
