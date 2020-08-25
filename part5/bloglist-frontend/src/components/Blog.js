import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, update, remove }) => {
	const [detailsVisible, setDetailsVisible] = useState(false)


	const showWhenVisible = { display: detailsVisible ? '' : 'none' }

	const toggleDetails = () =>
		detailsVisible ? setDetailsVisible(false) : setDetailsVisible(true)

	const handleNewLike = async () => {
		const likeBlog = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id
		}
		try {
			const response = await blogService.update(blog.id, likeBlog)
			update(response.data)
		} catch (exception) {
			console.log(exception.message)
		}
	}

	const showRemove = {display: remove().username !== blog.user.username ? 'none' : ''}

	return (
		<div style={{ border: 'black solid 1px', margin: '5px', padding: '5px' }}>
			{blog.title} - {blog.author}
			<button onClick={toggleDetails}>
				{detailsVisible ? 'hide' : 'view'}
			</button>
			<div style={showWhenVisible}>
				<div>
					<a target='_blank' rel='noopener noreferrer' href={blog.url}>
						{blog.url}
					</a>
				</div>
				<div>
					likes: {blog.likes} <button onClick={handleNewLike}>like</button>
				</div>
				<div>{blog.user.name}</div>
				<div style={showRemove}>
					<button onClick={() => remove(blog)}>remove</button>
				</div>
			</div>
		</div>
	)
}

export default Blog
