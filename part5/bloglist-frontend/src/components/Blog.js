import React from 'react'
import Toggle from './Toggle'

const Blog = props => {
	const blog = props.blog

	return (
		<div
			style={{
				border: 'black solid 1px',
				margin: '5px',
				padding: '5px'
			}}
		>
			{blog.title} - {blog.author}
			<Toggle className='toggle' primaryLabel='view' secondaryLabel='hide'>
				{props.children}
			</Toggle>
		</div>
	)
}

export default Blog
