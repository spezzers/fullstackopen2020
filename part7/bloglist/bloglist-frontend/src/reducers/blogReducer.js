const blogReducer = (state = [], action) => {
	console.log(action.type)
	switch (action.type) {
		case 'ADD_BLOG':
			console.log('need to add blog')
			break
		default:
			return state
	}
}


export default blogReducer
