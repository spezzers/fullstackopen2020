import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import {
	notification,
	removeNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	const previousTimer = useSelector(state => state.notification.id)

	const addAnecdote = event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))

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
