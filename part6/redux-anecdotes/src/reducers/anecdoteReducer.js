import anecdoteService from '../services/anecdotes'

export const addAnecdote = data => {
	return {
		data,
		type: 'ADD_ANECDOTE'
	}
}

export const castVote = id => {
	return {
		id,
		type: 'CAST_VOTE'
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes
		})
	}
}

const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case 'CAST_VOTE':
			const id = action.id
			const newState = state.map(a =>
				a.id === id ? { ...a, votes: a.votes + 1 } : a
			)
			return newState

		case 'ADD_ANECDOTE':
			return [...state, action.data]

		case 'INIT_ANECDOTES':
			return action.data

		default:
			return state
	}
}

export default anecdoteReducer
