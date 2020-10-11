import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const postBlog = (newBlog, config) =>
	axios.post(baseUrl, newBlog, config).then(res => res.data)

const update = (id, body) => axios.put(`${baseUrl}/${id}`, body)

const remove = (id, token) => axios.delete(`${baseUrl}/${id}`, token)

export default { getAll, postBlog, update, remove }
