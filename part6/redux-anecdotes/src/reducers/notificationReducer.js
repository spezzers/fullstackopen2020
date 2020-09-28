let previous

export const notification = (message, duration) => {
	return async dispatch => {
		if (previous) {
			window.clearTimeout(previous)
		}
		let timer = setTimeout(() => {
			dispatch(removeNotification())
		}, duration)
		previous = timer
		dispatch({
			type: 'SET_NOTIFICATION',
			message,
		})
	}
}

export const removeNotification = () => {
	return async dispatch => {
        previous = undefined
		dispatch({
			message: '',
			type: 'SET_NOTIFICATION',
		})
	}
}

const notificationReducer = (state = '', action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.message
			

		default:
			return state
	}
}

export default notificationReducer
