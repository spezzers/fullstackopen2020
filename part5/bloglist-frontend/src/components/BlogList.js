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
	const blogList = blogs.map(blog => <Blog key={blog.id} blog={blog} />)

	return (
		<div>
			<BlogForm user={user} onSubmit={setBlogs} list={blogs} setMessage={setMessage}/>
			<h2>Blogs</h2>
			<table>
				<tbody>
					<tr>
						<th>Title</th>
						<th>Author</th>
					</tr>
					{blogList}
				</tbody>
			</table>
		</div>
	)
}

export default BlogList
