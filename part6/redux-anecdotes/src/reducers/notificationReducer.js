export const notification = (message, id) => {
	return {
        message,
        id,
        type: 'SET_NOTIFICATION',
	}
}
export const removeNotification = () => {
	return {
		message: '',
        type: 'SET_NOTIFICATION',
        id: null
	}
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
			return {
                message: action.message,
                id: action.id
            }

		default:
			return state
	}
}

export default notificationReducer
