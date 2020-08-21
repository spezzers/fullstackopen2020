import React, { useState } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const BlogList = ({ user }) => {
	const [blogs, setBlogs] = useState([])
	if (user === null) {
		return null
	}

	blogService.getAll().then(blogs => setBlogs(blogs))
	const blogList = blogs.map(blog => <Blog key={blog.id} blog={blog} />)

	return (
		<div>
			<BlogForm user={user} onSubmit={setBlogs} list={blogs} />
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
