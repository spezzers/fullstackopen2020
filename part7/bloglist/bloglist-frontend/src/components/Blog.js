import React from 'react'
import Toggle from './Toggle'

const Blog = props => {
	const blog = props.blog
	return (
		<div
			id={props.blog.id}
			style={{
				border: 'black solid 1px',
				margin: '5px',
				padding: '5px'
			}}
			className='blogItem'

		>
			<span className='title' >{blog.title}</span> - <span className='author'>{blog.author}</span>
			<Toggle className='blogDetails' primaryLabel='view' secondaryLabel='hide' toggleButton={props.toggleButton}>
				<div className='url'>
					<a target='_blank' rel='noopener noreferrer' href={blog.url}>
						{blog.url}
					</a>
				</div>
				<div className='likes'>
					likes: <span className='likeCount'>{blog.likes}</span> <button className='likeButton' onClick={props.handleLike}>like</button>
				</div>
				<div className='name-of-user'>{blog.user.name}</div>
				{props.children}
			</Toggle>
		</div>
	)
}

export default Blog
