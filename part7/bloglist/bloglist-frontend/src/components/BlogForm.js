import React, { useState } from 'react'
import blogService from '../services/blogs'
import Toggle from './Toggle'
import { notification } from '../reducers/notificationReducer'



const BlogForm = (props) => {
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
	const
		user = props.user,
		list = props.list,
		setBlogs = props.setBlogs

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
				setBlogs(list.concat(response))
				notification(
					`Blog Added: '${response.title}' by '${response.author}'`,
					'confirm', 5000
				)
				setNewBlog(emptyForm)
			} catch (error) {
				console.log(error.message)
				notification('Failed to add blog to list', 'error')
			}
		} else {
			notification('Please fill in all fields', 'error')
		}
	}

	const onSubmit = props.onSubmit ? props.onSubmit(newBlog) : handleSubmit

	return (
		<Toggle
			id='blogForm'
			primaryLabel='Add a blog'
			style={{
				border: 'dashed #cccccc 1px',
				padding: '5px',
				margin: '0 5px 5px'
			}}
		>
			<form id='form' onSubmit={onSubmit}>
				<table>
					<tbody>
						<tr>
							<td>title</td>
							<td>
								<input
									type='text'
									value={newBlog.title}
									id='title'
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
									id='author'
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
									id='url'
									onChange={({ target }) =>
										setNewBlog({ ...newBlog, url: target.value })
									}
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<button type='submit' id='submitBlog' onSubmit={onSubmit}>
					Add blog
				</button>
			</form>
		</Toggle>
	)
}

export default BlogForm
