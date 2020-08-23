import React, { useState } from 'react'
import blogService from '../services/blogs'
import CreateNewBlog from './CreateNewBlog'

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
					'confirm',
					`Blog Added: '${response.title}' by '${response.author}'`
				)
				setNewBlog(emptyForm)
			} catch (error) {
				setMessage('error', 'Failed to add blog to list')
			}
		}
		else { setMessage('warning', 'Please fill in all fields') }
	}
	return (
		<div>
			<CreateNewBlog>
				<h3>Add a blog...</h3>
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
						Submit
					</button>
				</form>
			</CreateNewBlog>
		</div>
	)
}

export default BlogForm
