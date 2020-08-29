import React from 'react'

const Blog = ({ blog }) => {

	return (
		<>
			{blog.title} - {blog.author}
		</>
	)
}

export default Blog
