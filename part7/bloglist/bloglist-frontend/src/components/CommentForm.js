import React from 'react'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

const CommentForm = () => {
	const blogId = useRouteMatch('/blogs/:id').params.id
	const dispatch = useDispatch()

	const comment = useField('text')

	const handleSubmit = event => {
		event.preventDefault()
		if (comment.value !== '') {
			dispatch(addComment(blogId, { content: comment.value }, [comment]))
		}
	}

	return (
		<form id='commentForm' onSubmit={handleSubmit}>
			<input
				type={comment.type}
				value={comment.value}
				onChange={comment.onChange}
				name='comment'
			/>
			<button type='submit'>add comment</button>
		</form>
	)
}

export default CommentForm
