
export const notification = (message, duration, previousNotification) => {
    return async dispatch => {
        
        if (previousNotification) {
            window.clearTimeout(previousNotification)
        }
        let timer = setTimeout(() => {
            dispatch(removeNotification())
        }, duration)
        dispatch({
            type: 'SET_NOTIFICATION',
            message,
            id: timer
        })
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
