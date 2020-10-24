import React from 'react'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../styled'

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
		<CommentFormContainer id='commentForm' onSubmit={handleSubmit}>
			<input
				type={comment.type}
				value={comment.value}
				onChange={comment.onChange}
				name='comment'
			/>
			<button type='submit'>add comment</button>
		</CommentFormContainer>
	)
}

const CommentFormContainer = styled.form`
	display: flex;
	width: 100%;
	flex-direction: row;
	flex-wrap: wrap;
	input {
		flex-grow: 10;
	}
	button {
		background-color: ${colors.blue};
		color: ${colors.offWhite};
	}
`

export default CommentForm
