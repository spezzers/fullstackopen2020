import React from 'react'

const AnecdoteList = ({ anecdotes, setAnecdotes }) => {
	const anecdoteById = id => anecdotes.find(a => a.id === id)

	const vote = id => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
	}
	return (
		<div>
			<h2>Anecdotes</h2>
			<ul>
				{anecdotes.map(anecdote => (
					<li key={anecdote.id}>{anecdote.content}</li>
				))}
			</ul>
		</div>
	)
}

export default AnecdoteList
