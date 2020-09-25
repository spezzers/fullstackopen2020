import anecdoteService from '../services/anecdotes'

export const addAnecdote = data => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.addNew(data)
		dispatch({
			type: 'ADD_ANECDOTE',
			data: newAnecdote
		})
	}
}

export const castVote = anecdote => {
	return async dispatch => {
		const data = await anecdoteService.addNewVote(anecdote)
		dispatch({
			type: 'CAST_VOTE',
			data
		})
		
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
			const id = action.data.id
			const newState = state.map(a =>
				a.id === id ? { ...a, votes: action.data.votes } : a
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
