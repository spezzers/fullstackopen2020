import React, { useState } from 'react'

const Blog = ({ blog }) => {
	const [detailsVisible, setDetailsVisible] = useState(false)

	const showWhenVisible = { display: detailsVisible ? '' : 'none' }

	const toggleDetails = () =>
		detailsVisible ? setDetailsVisible(false) : setDetailsVisible(true)

	return (
		<div style={{ border: 'black solid 1px', margin: '5px', padding: '5px' }}>
			{blog.title} - {blog.author}
			<button onClick={toggleDetails}>
				{detailsVisible ? 'hide' : 'view'}
			</button>
			<div style={showWhenVisible}>
				<div>
					<a target='_blank' rel='noopener noreferrer' href={blog.url}>
						{blog.url}
					</a>
				</div>
				<div>
					likes: {blog.likes}{' '}
					<button onClick={() => console.log(`${blog.title} received a new like`)}>
						like
					</button>
				</div>
				<div>{blog.user.name}</div>
			</div>
		</div>
	)
}

export default Blog
