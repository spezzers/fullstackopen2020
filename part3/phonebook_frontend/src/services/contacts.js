import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const add = newContact => axios.post(baseUrl, newContact).then(res => res.data)

const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = (id, updatedContact) => {
	return axios.put(`${baseUrl}/${id}`, updatedContact).then(res => res.data)
}

export default { getAll, add, remove, update }
