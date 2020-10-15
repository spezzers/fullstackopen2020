const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_BLOG':
			console.log('need to add blog')
			break
		default:
			return state
	}
}


export default blogReducer
