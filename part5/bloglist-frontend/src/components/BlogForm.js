import React, { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Toggle from './Toggle'

const BlogForm = ({ user, list, onSubmit, setMessage }) => {
	const [newBlog, setNewBlog] = useState({
		title: '',
		author: '',
		url: ''
	})

	const emptyForm = {
		title: '',
		author: '',
		url: ''
	}

	const blogFormRef = useRef()

	const handleSubmit = async event => {
		event.preventDefault()
		if ((newBlog.title && newBlog.author && newBlog.url) !== '') {
			const token = `bearer ${user.token}`
			const config = {
				headers: {
					Authorization: token
				}
			}
			try {
				const response = await blogService.postBlog(newBlog, config)
				onSubmit(list.concat(response))
				setMessage(
					`Blog Added: '${response.title}' by '${response.author}'`,
					'confirm'
				)
				setNewBlog(emptyForm)
			} catch (error) {
				setMessage( 'Failed to add blog to list', 'error')
			}
		}
		else { setMessage('Please fill in all fields', 'error') }
	}

	return (
			<Toggle primaryLabel='Add a blog' ref={blogFormRef} style={{border: 'dashed #cccccc 1px', padding: '5px', margin: '0 5px 5px'}}>
				<form onSubmit={handleSubmit}>
					<table>
						<tbody>
							<tr>
								<td>title</td>
								<td>
									<input
										type='text'
										value={newBlog.title}
										name='title'
										onChange={({ target }) =>
											setNewBlog({ ...newBlog, title: target.value })
										}
									/>
								</td>
							</tr>
							<tr>
								<td>author</td>
								<td>
									<input
										type='text'
										value={newBlog.author}
										name='author'
										onChange={({ target }) =>
											setNewBlog({ ...newBlog, author: target.value })
										}
									/>
								</td>
							</tr>
							<tr>
								<td>url</td>
								<td>
									<input
										type='text'
										value={newBlog.url}
										name='url'
										onChange={({ target }) =>
											setNewBlog({ ...newBlog, url: target.value })
										}
									/>
								</td>
							</tr>
						</tbody>
					</table>
					<button type='submit' onSubmit={handleSubmit}>
						Add blog
					</button>
				</form>
			</Toggle>
	)
}

export default BlogForm
