import React from 'react'
import { useRouteMatch, Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { notification } from '../reducers/notificationReducer'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const Blog = props => {
	const match = useRouteMatch('/blogs/:id')
	const blogs = useSelector(state => state.blogs)
	const loggedInUser = useSelector(state => state.loggedInUser)
	const dispatch = useDispatch()

	const blog =
		match !== null
			? blogs.find(blog => blog.id === match.params.id)
			: props.blog

	if (!blog) {
		return <Redirect to='/blogs' />
	}

	if (!match) {
		return (
			<Link to={`/blogs/${blog.id}`}>
				<div
					id={blog.id}
					style={{
						border: 'black solid 1px',
						margin: '5px',
						padding: '5px'
					}}
					className='blogItem'
				>
					<span className='title'>{blog.title}</span> -{' '}
					<span className='author'>{blog.author}</span>
				</div>
			</Link>
		)
	}

	const remove = blog => {
		if (blog === undefined) {
			return loggedInUser
		}
		const check = window.confirm(
			`Are you sure you want to delete '${blog.title}' by '${blog.author}'?`
		)
		if (check) {
			const config = {
				headers: { Authorization: `bearer ${loggedInUser.token}` }
			}
			const removeThisBlog = blog
			const removeIt = async () => {
				try {
					await blogService.remove(blog.id, config)
					dispatch(
						notification(
							`Successfully removed '${removeThisBlog.title}' by '${removeThisBlog.author}'`
						)
					)
					dispatch(removeBlog(removeThisBlog.id))
				} catch (exception) {
					dispatch(notification(exception.message, 'error'))
				}
			}
			removeIt()
		}
	}

	const handleNewLike = async () => {
		const likeBlog = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id
		}
		try {
			const response = await blogService.update(blog.id, likeBlog)
			const updated = {
				...blog,
				likes: response.data.likes
			}
			dispatch(updateBlog(updated))
		} catch (exception) {
			dispatch(
				notification(
					`Vote failed for '${likeBlog.title}' - ${exception.message}`
				)
			)
		}
	}

	const showRemove = {
		display: blog.user.username !== loggedInUser.username ? 'none' : ''
	}

	return (
		<div id={blog.id} className='blogItem'>
			<h2 className='title'>{blog.title}</h2>
			<h3 className='author'>{blog.author}</h3>
			<div className='url'>
				<a target='_blank' rel='noopener noreferrer' href={blog.url}>
					{blog.url}
				</a>
			</div>
			<div className='likes'>
				likes: <span className='likeCount'>{blog.likes}</span>{' '}
				<button className='likeButton' onClick={handleNewLike}>
					like
				</button>
			</div>
			<div className='name-of-user'>Added by <strong>{blog.user.name}</strong></div>
			<div style={showRemove}>
				<button className='removeButton' onClick={() => remove(blog)}>
					remove
				</button>
			</div>
		</div>
	)
}

export default Blog
