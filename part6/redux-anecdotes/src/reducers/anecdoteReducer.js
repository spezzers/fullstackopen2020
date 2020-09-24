const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

export const createAnecdote = content => {
	return {
		content,
		type: 'ADD_ANECDOTE'
	}
}

export const castVote = id => {
	return {
		id,
		type: 'CAST_VOTE'
	}
}

export const importAnecdote = data => {
	return {
		type: 'IMPORT_ANECDOTE',
		data
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
			const newAnecdote = asObject(action.content)
			return [...state, newAnecdote]

		case 'IMPORT_ANECDOTE':
			return [...state, action.data]

		default:
			return state
	}
}

export default anecdoteReducer
