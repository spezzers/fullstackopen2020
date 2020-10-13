import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import { notification } from '../reducers/notificationReducer'

const BlogList = ({ user }) => {
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		if (user.username !== '') {
			blogService.getAll().then(blogs => setBlogs(blogs))
		}
	}, [user])

	if (user.username === '') {
		return null
	}

	const handleUpdate = data => {
		const blogToUpdate = blogs.find(blog => blog.id === data.id)
		const updatedBlog = {
			...data,
			user: blogToUpdate.user
		}
		const updatedList = blogs.map(blog =>
			blog === blogToUpdate ? updatedBlog : blog
		)
		setBlogs(() => updatedList)
	}

	const remove = blog => {
		if (blog === undefined) {
			return user
		}
		const check = window.confirm(
			`Are you sure you want to delete '${blog.title}' by '${blog.author}'?`
		)
		if (check) {
			const config = {
				headers: { Authorization: `bearer ${user.token}` }
			}
			const removedBlog = blog
			const removeIt = async () => {
				try {
					await blogService.remove(blog.id, config)
					notification(
						`Successfully removed '${removedBlog.title}' by '${removedBlog.author}'`
					)
					setBlogs(updatedList)
				} catch (exception) {
					notification(exception.message, 'error')
				}
			}
			const updatedList = blogs.filter(blog => blog !== removedBlog)
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
				handleUpdate(response.data)
			} catch (exception) {
				console.log(exception.message)
			}
		}
		return (
			<Blog key={blog.id} blog={blog} handleLike={handleNewLike}>
				<div style={showRemove}>
					<button className='removeButton' onClick={() => remove(blog)}>remove</button>
				</div>
			</Blog>
		)
	})

	return (
		<div>
			<h2>Blogs</h2>
			<BlogForm
				user={user}
				setBlogs={setBlogs}
				list={blogs}
				notification={notification}
			/>
			{blogList}
		</div>
	)
}

export default BlogList
