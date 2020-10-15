import blogService from '../services/blogs'


export const getAllBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		console.log(blogs)
		dispatch({
			type: 'GET_ALL_BLOGS',
			data: blogs
		})
	}
}

export const addBlog = data => {
	return {
		type: 'ADD_BLOG',
		data
	}
}

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_BLOG':
			return [ ...state, action.data]
		case 'GET_ALL_BLOGS':
			return action.data
		default:
			return state
	}
}

export default blogReducer
