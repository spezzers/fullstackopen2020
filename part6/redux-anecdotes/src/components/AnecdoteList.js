import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
	notification,
	removeNotification
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const previousTimer = useSelector(state => state.notification.id)
	const dispatch = useDispatch()

	const vote = id => {
		if (previousTimer) {
			window.clearTimeout(previousTimer)
			console.log(previousTimer)
		}
		const content = anecdotes.find(a => a.id === id).content
		dispatch(addVote(id))
		const timer = setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
		dispatch(notification(`You voted for '${content}'`, timer))
	}

	return (
		<div id='AnecdoteList'>
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map(anecdote => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>vote</button>
						</div>
					</div>
				))}
		</div>
	)
}

export default AnecdoteList
