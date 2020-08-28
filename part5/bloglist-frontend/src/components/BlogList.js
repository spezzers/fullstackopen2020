import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const BlogList = ({ user, setMessage }) => {
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
		const check = window.confirm(`Are you sure you want to delete '${blog.title}' by '${blog.author}'?`)
		if (check) {
			const config = {
				headers: { Authorization: `bearer ${user.token}` }
			}
			const removedBlog = blog
			const removeIt = async () => {
				try {
					await blogService.remove(blog.id, config)
					setMessage(
						`Successfully removed '${removedBlog.title}' by '${removedBlog.author}'`
					)
					setBlogs(updatedList)
				} catch (exception) {
					setMessage(exception.message, 'error')
				}
			}
			const updatedList = blogs.filter(blog => blog !== removedBlog)
			removeIt()
		}
	}

	const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes)

	const blogList = sortedByLikes.map(blog => (
		<Blog key={blog.id} blog={blog} update={handleUpdate} remove={remove} />
	))

	return (
		<div>
			<h2>Blogs</h2>
			<BlogForm
				user={user}
				onSubmit={setBlogs}
				list={blogs}
				setMessage={setMessage}
			/>
			{blogList}
		</div>
	)
}

export default BlogList
