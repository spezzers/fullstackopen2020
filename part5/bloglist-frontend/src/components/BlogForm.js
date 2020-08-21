import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, list, onSubmit }) => {
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
		const token = `bearer ${user.token}`
		const config = {
			headers: {
				Authorization: token
			}
		}
		event.preventDefault()
		const response = await blogService.postBlog(newBlog, config)
		try {
			onSubmit(list.concat(response))
			setNewBlog(emptyForm)
		} catch (exception) {
			console.log(response.message)
		}
	}
	return (
		<div>
			<h3>Create new</h3>
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
		</div>
	)
}

export default BlogForm
