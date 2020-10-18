import React, { useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../reducers/blogReducer'

const BlogList = props => {
	const blogs = useSelector(state => state.blogs)
	const loggedInUser = useSelector(state => state.loggedInUser)
	const dispatch = useDispatch()

	useEffect(() => {
		if (loggedInUser.username !== '') {
			dispatch(getAllBlogs())
		}
	}, [dispatch, loggedInUser])

	if (loggedInUser.username === '') {
		return null
	}

	const userFilteredBlogs =
		props.userFilter !== undefined
			? blogs.filter(blog => blog.user.id === props.userFilter.id)
			: blogs
	const sortedByLikes = userFilteredBlogs.sort((a, b) => b.likes - a.likes)

	const blogList = sortedByLikes.map(blog => {
		return (
			<Blog key={blog.id} blog={blog}></Blog>
		)
	})

	const includeForm = () => {
		if (props.userFilter) {
			const check =
				props.userFilter.username !== undefined &&
				props.userFilter.username === loggedInUser.username
			return check
		}
		return true
	}

	return (
		<div>
			<h2>Blogs</h2>
			{includeForm() ? <BlogForm /> : null}
			{blogList}
		</div>
	)
}

export default BlogList
