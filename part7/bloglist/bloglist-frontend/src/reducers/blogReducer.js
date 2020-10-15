import blogService from '../services/blogs'

export const getAllBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
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

export const updateBlog = data => {
	return {
		type: 'UPDATE_BLOG',
		data
	}
}

export const removeBlog = id => {
	return {
		type: 'REMOVE_BLOG',
		id
	}
}

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_BLOG':
			return [...state, action.data]
		case 'GET_ALL_BLOGS':
			return action.data
		case 'UPDATE_BLOG':
			return state.map(blog =>
				blog.id === action.data.id ? { ...blog, ...action.data } : blog
			)
		case 'REMOVE_BLOG':
			return state.filter(blog => blog.id !== action.id)
		default:
			return state
	}
}

export default blogReducer
