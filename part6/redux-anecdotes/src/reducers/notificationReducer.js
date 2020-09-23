export const notification = (message, id) => {
	return {
        message,
        id,
        type: 'SET',
	}
}
export const removeNotification = () => {
	return {
		message: '',
        type: 'SET',
        id: null
	}
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET':
			return {
                message: action.message,
                id: action.id
            }

		default:
			return state
	}
}

export default notificationReducer
