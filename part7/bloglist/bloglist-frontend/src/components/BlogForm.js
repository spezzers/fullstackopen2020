import React from 'react'
import blogService from '../services/blogs'
import Toggle from './Toggle'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogForm = props => {
	const loggedInUser = useSelector(state => state.loggedInUser)
	const dispatch = useDispatch()
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')

	const newBlog = {
		title: title.value,
		author: author.value,
		url: url.value
	}

	const handleSubmit = async event => {
		event.preventDefault()
		if ((title.value && author.value && url.value) !== '') {
			const token = `bearer ${loggedInUser.token}`
			const config = {
				headers: {
					Authorization: token
				}
			}
			try {
				const response = await blogService.postBlog(newBlog, config)
				dispatch(addBlog(response))
				dispatch(
					notification(
						`Blog Added: '${response.title}' by '${response.author}'`,
						'confirm',
						5000
					)
				)
				title.clear()
				author.clear()
				url.clear()
			} catch (error) {
				dispatch(notification('Failed to add blog to list', 'error'))
			}
		} else {
			dispatch(notification('Please fill in all fields', 'error'))
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
									onChange={title.onChange}
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
									onChange={author.onChange}
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
									onChange={url.onChange}
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
