import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'

import { useSelector, useDispatch } from 'react-redux'
import {
	notification,
	removeNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	const prevNoti = useSelector(state => state.notification.id)

	const handleAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(addAnecdote(content))

		// if (prevNoti) {
		// 	window.clearTimeout(prevNoti)
		// 	console.log(prevNoti)
		// }
		// const timer = setTimeout(() => {
		// 	dispatch(removeNotification())
		// }, 5000)
		dispatch(notification(`You added '${content}'`, 5000, prevNoti))
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
