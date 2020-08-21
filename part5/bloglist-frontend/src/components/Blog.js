import React from 'react'

const Blog = ({ blog }) => (
  <tr>
    <td>{blog.title}</td>
    <td>{blog.author}</td>
  </tr>
)



export default Blog
