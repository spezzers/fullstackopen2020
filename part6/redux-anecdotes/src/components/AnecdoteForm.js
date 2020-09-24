import React from 'react'
import anecdoteService from '../services/anecdotes'
import { createAnecdote } from '../reducers/anecdoteReducer'

import { useSelector, useDispatch } from 'react-redux'
import {
	notification,
	removeNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	const previousTimer = useSelector(state => state.notification.id)

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		const newAnecdote = await anecdoteService.addNew(content)
		dispatch(createAnecdote(newAnecdote))

		if (previousTimer) {
			window.clearTimeout(previousTimer)
			console.log(previousTimer)
		}
		const timer = setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
		dispatch(notification(`You added '${content}'`, timer))
	}

	return (
		<div id='BlogForm'>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
