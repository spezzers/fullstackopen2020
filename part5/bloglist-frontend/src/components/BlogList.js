import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const BlogList = ({ user, setMessage }) => {
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		if (user !== null) {
			blogService.getAll().then(blogs => setBlogs(blogs))
		}
	}, [user])

	if (user === null) {
		return null
	}

	const handleUpdate = (data) => {
		const blogToUpdate = blogs.find(blog => blog.id === data.id)
		const updatedBlog = {
			...data,
			user: blogToUpdate.user
		}
		const updatedList = blogs.map((blog) => blog === blogToUpdate
			? updatedBlog
			: blog
		)
		console.log(updatedList, updatedBlog)
		setBlogs(() => updatedList)
	}

	const handleRemove = async (blog) => {
		const check = window.confirm('Are you sure you want to delete this?')
		if (check) {
			console.log('confirmed: delete this, please')
			setMessage(`'${blog.title}' has been removed`)
		}
	}

	const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes)
	
	const blogList = sortedByLikes.map(blog => (
		<Blog key={blog.id} blog={blog} update={handleUpdate} remove={handleRemove} />
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
