import blogService from '../services/blogs'
// import { useField } from '../hooks'

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

export const addComment = (blogId, content, formInputs) => {
	return async dispatch => {
		const response = await blogService.comment(blogId, content)
		if (response.status === 201) {
			formInputs.map(i => i.clear())
		}
		dispatch({
			type: 'ADD_COMMENT',
			blogId,
			comment: response.data
		})
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
		case 'ADD_COMMENT':
			return state.map(blog =>
				blog.id === action.blogId
					? { ...blog, comments: [...blog.comments, action.comment] }
					: blog
			)
		default:
			return state
	}
}

export default blogReducer
