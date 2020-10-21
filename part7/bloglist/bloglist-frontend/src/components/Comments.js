import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

const Comments = props => {
	const match = useRouteMatch('/blogs/:id')
	const blog = useSelector(state => state.blogs).find(
		blog => blog.id === match.params.id
	)
	const list = props.list || blog.comments
	console.log(list.length, list)
	return (
		<div>
			<h4>Comments</h4>

			{list.length === 0 ? 'No comments yet...' : null}
			<ul>
				{list.map(comment => (
					<li key={comment.id}>{comment.content}</li>
				))}
			</ul>
		</div>
	)
}

export default Comments