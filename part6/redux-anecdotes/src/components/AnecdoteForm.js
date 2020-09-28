import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'

import { connect } from 'react-redux'
import {
	notification,
} from '../reducers/notificationReducer'

const AnecdoteFormComponent = (props) => {

	const handleAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		props.addAnecdote(content)
		props.notification(`You added '${content}'`, 5000)
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

const mapDispatchToProps = {notification, addAnecdote}
const mapStateToProps = () => {}

const AnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteFormComponent)

export default AnecdoteForm
