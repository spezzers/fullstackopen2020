import React, { useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../reducers/blogReducer'
import { colors } from '../styled'
import styled from 'styled-components'

const BlogListContainer = styled.div`
	padding: 0 3%;
	h2 {
		padding-bottom: 12px;
		border-bottom: 1px solid ${colors.offWhite};
	}
	button {
		background-color: ${colors.blue};
		padding: 5px 9px;
		border-radius: 4px;
		margin: 0 0 15px;
		color: ${colors.offWhite};
		font-weight: 100;
	}
	#blogForm {
		border: dashed #cccccc;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		text-align: center;
		border-width: 0 0 1px 1px;
		padding: 0 5px;
		margin: 0 5px 15px 1.9em;
		#submitBlog {
			margin: 8px auto 15px;
			align-self: flex-end;
			justify-self: flex-end;
		}
		table {
			margin: 0 auto;
			position: relative;
			left: -1.5rem;
			text-align: left;
		}
	}
`

const BlogList = props => {
	const blogs = useSelector(state => state.blogs)
	const loggedInUser = useSelector(state => state.loggedInUser)
	const dispatch = useDispatch()

	useEffect(() => {
		if (loggedInUser.username !== '') {
			dispatch(getAllBlogs())
		}
	}, [dispatch, loggedInUser])

	if (loggedInUser.username === '') {
		return null
	}

	const userFilteredBlogs =
		props.userFilter !== undefined
			? blogs.filter(blog => blog.user.id === props.userFilter.id)
			: blogs
	const sortedByLikes = userFilteredBlogs.sort((a, b) => b.likes - a.likes)

	const blogList = sortedByLikes.map(blog => {
		return <Blog key={blog.id} blog={blog}></Blog>
	})

	const includeForm = () => {
		if (props.userFilter) {
			const check =
				props.userFilter.username !== undefined &&
				props.userFilter.username === loggedInUser.username
			return check
		}
		return true
	}

	return (
		<BlogListContainer>
			<h2>Blogs</h2>
			{includeForm() ? <BlogForm /> : null}
			{blogList}
		</BlogListContainer>
	)
}

export default BlogList
