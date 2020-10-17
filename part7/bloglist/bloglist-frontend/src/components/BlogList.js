import React, { useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from '../reducers/notificationReducer'
import { getAllBlogs, updateBlog, removeBlog } from '../reducers/blogReducer'

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

	const remove = blog => {
		if (blog === undefined) {
			return loggedInUser
		}
		const check = window.confirm(
			`Are you sure you want to delete '${blog.title}' by '${blog.author}'?`
		)
		if (check) {
			const config = {
				headers: { Authorization: `bearer ${loggedInUser.token}` }
			}
			const removeThisBlog = blog
			const removeIt = async () => {
				try {
					await blogService.remove(blog.id, config)
					dispatch(
						notification(
							`Successfully removed '${removeThisBlog.title}' by '${removeThisBlog.author}'`
						)
					)
					dispatch(removeBlog(removeThisBlog.id))
				} catch (exception) {
					dispatch(notification(exception.message, 'error'))
				}
			}
			removeIt()
		}
	}
	const userFilteredBlogs =
		props.userFilter !== undefined
			? blogs.filter(blog => blog.user.id === props.userFilter.id)
			: blogs
	const sortedByLikes = userFilteredBlogs.sort((a, b) => b.likes - a.likes)

	const blogList = sortedByLikes.map(blog => {
		const showRemove = {
			display: remove().username !== blog.user.username ? 'none' : ''
		}
		const handleNewLike = async () => {
			const likeBlog = {
				...blog,
				likes: blog.likes + 1,
				user: blog.user.id
			}
			try {
				const response = await blogService.update(blog.id, likeBlog)
				const updated = {
					...blog,
					likes: response.data.likes
				}
				dispatch(updateBlog(updated))
			} catch (exception) {
				dispatch(notification(`Vote failed for '${likeBlog.title}' - ${exception.message}`))
			}
		}
		return (
			<Blog key={blog.id} blog={blog} handleLike={handleNewLike}>
				<div style={showRemove}>
					<button className='removeButton' onClick={() => remove(blog)}>
						remove
					</button>
				</div>
			</Blog>
		)
	})

	const includeForm = () => {
		if (props.userFilter) {
			const check = props.userFilter.username !== undefined && props.userFilter.username === loggedInUser.username
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
