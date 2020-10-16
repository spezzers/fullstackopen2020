import React, { useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from '../reducers/notificationReducer'
import { getAllBlogs, updateBlog, removeBlog } from '../reducers/blogReducer'

const BlogList = () => {

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

	const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

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
				dispatch(updateBlog(response.data))
			} catch (exception) {
				console.log(exception.message)
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

	return (
		<div>
			<h2>Blogs</h2>
			<BlogForm user={loggedInUser} list={blogs} notification={notification} />
			{blogList}
		</div>
	)
}

export default BlogList
