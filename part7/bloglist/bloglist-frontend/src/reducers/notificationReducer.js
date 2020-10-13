let previous

export const setMessage = data => {
	console.log('Action: SET_MESSAGE', 'data:', data)
	return {
		type: 'SET_MESSAGE',
		data
	}
}

export const clearNotification = () => {
	console.log('Action: "CLEAR_MESSAGE" Previous timer:', previous)
	return async dispatch => {
		previous = undefined
		dispatch({ type: 'CLEAR_MESSAGE' })
	}
}

export const notification = (content, type, duration) => {
	return async dispatch => {
		const timer = typeof duration === Number ? duration : 3500
		const messageType = ['error', 'warning', 'confirm'].includes(type)
			? type
			: 'message'
		console.log('Action => {', content, messageType, timer, '}')
		previous = setTimeout(() => dispatch(clearNotification()), timer)
		dispatch(setMessage({ type: messageType, content: content }))
	}
}

const notificationReducer = (
	state = { type: 'initial', content: 'initial message' },
	action
) => {
	console.log('Reducer:', action.type)
	switch (action.type) {
		case 'SET_MESSAGE':
			return { type: action.data.type, content: action.data.content }
		case 'CLEAR_MESSAGE':
			return { type: '', content: '' }
		default:
			return state
	}
}

export default notificationReducer
