import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'

import { useDispatch } from 'react-redux'
import {
	notification,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const handleAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(addAnecdote(content))
		dispatch(notification(`You added '${content}'`, 5000))
	}

	return (
		<div id='BlogForm'>
			<h2>create new</h2>
			<form onSubmit={handleAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
