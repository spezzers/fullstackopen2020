import React from 'react'
import blogService from '../services/blogs'
import Toggle from './Toggle'

const Blog = ({ blog, update, remove }) => {

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
			<Toggle primaryLabel='view' secondaryLabel='hide'>
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
			</Toggle>
		</div>
	)
}

export default Blog
