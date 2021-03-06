import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const getBlogs = id => axios.get(`${baseUrl}/${id}`).then(response => response.data)

const postBlog = (newBlog, config) =>
	axios.post(baseUrl, newBlog, config).then(res => res.data)

const update = (id, body) => axios.put(`${baseUrl}/${id}`, body)

const remove = (id, token) => axios.delete(`${baseUrl}/${id}`, token)

const comment = (blogId, content) => axios.post(`${baseUrl}/${blogId}/comments`, content)

export default { getBlogs, getAll, postBlog, update, remove, comment }
