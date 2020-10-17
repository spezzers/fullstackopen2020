import React from 'react'
import { useRouteMatch, Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blog = props => {
	const match = useRouteMatch('/blogs/:id')
	const blogs = useSelector(state => state.blogs)

	const blog =
		match !== null
			? blogs.find(blog => blog.id === match.params.id)
			: props.blog
	if (!blog) {
		return <Redirect to='/blogs' />
	}

	if (!match) {
		return (
			<div
				id={blog.id}
				style={{
					border: 'black solid 1px',
					margin: '5px',
					padding: '5px'
				}}
				className='blogItem'
			>
				<Link to={`/blogs/${blog.id}`}>
					<span className='title'>{blog.title}</span> -{' '}
					<span className='author'>{blog.author}</span>
				</Link>
			</div>
		)
	}
	return (
		<div
			id={blog.id}
			style={{
				border: 'black solid 1px',
				margin: '5px',
				padding: '5px'
			}}
			className='blogItem'
		>
			<div className='url'>
				<a target='_blank' rel='noopener noreferrer' href={blog.url}>
					{blog.url}
				</a>
			</div>
			<div className='likes'>
				likes: <span className='likeCount'>{blog.likes}</span>{' '}
				<button className='likeButton' onClick={props.handleLike}>
					like
				</button>
			</div>
			<div className='name-of-user'>{blog.user.name}</div>
			{props.children}
		</div>
	)
}

export default Blog
