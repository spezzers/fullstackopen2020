import React from 'react'
import { castVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { notification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const prevNoti = useSelector(state => state.notification.id)
	const filter = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const vote = id => {
		const anecdote = anecdotes.find(a => a.id === id)
		dispatch(castVote(anecdote))
		dispatch(
			notification(`You voted for '${anecdote.content}'`, 5000, prevNoti)
		)
	}

	return (
		<div id='AnecdoteList'>
			{anecdotes
				.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
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
