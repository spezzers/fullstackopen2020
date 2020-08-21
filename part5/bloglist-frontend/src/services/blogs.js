import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const postBlog = (newBlog, config) => axios.post(baseUrl, newBlog, config).then(res => res.data)
  

export default { getAll, postBlog }