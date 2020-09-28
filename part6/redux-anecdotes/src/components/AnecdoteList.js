import React from 'react'
import { castVote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { notification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
	const anecdotes = props.anecdotes
	const filter = props.filter

	const vote = id => {
		const anecdote = anecdotes.find(a => a.id === id)
		props.castVote(anecdote)
		props.notification(`You voted for '${anecdote.content}'`, 5000)
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

const mapStateToProps = state => {
	console.log(state)
	return {
		anecdotes: state.anecdotes,
		filter: state.filter
	}
}

const mapDispatchToProps = {notification, castVote}

const AnecdoteList = connect(
	mapStateToProps,
	mapDispatchToProps
	)(Anecdotes)

export default AnecdoteList
