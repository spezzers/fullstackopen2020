import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  

	const detail = (detail, label, buttonLabel, onClick) => {
    const detailLabel = label ? `${label}: ` : null
    const button = (buttonLabel) ? <td><button onClick={onClick}>{buttonLabel}</button></td> : null
		return (
			<tr key={blog.id+detail}>
				<td  align='right' colSpan='2' style={{ paddingLeft: '30px' }}>
					{detailLabel}{detail}
				</td>
        {button}
			</tr>
		)
  }

  const like = detail(blog.likes, 'likes', 'like', () => console.log(`'${blog.title}' received a new like`))


	const details = [detail(blog.url), like, detail(blog.user.name)]
	const toggleDetails = () =>
		detailsVisible ? setDetailsVisible(false) : setDetailsVisible(true)

	const button = (
		<button onClick={toggleDetails}>{detailsVisible ? 'hide' : 'view'}</button>
	)
	return [
		<tr key={blog.id}>
			<td>{blog.title}</td>
			<td>{blog.author}</td>
			<td>{button}</td>
		</tr>,
		detailsVisible ? details : null
	]
}

export default Blog
