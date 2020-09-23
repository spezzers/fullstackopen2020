const  notificationReducer = (state = 'Hello World', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.message
        
        default:
            return state
    }
}

export default notificationReducer