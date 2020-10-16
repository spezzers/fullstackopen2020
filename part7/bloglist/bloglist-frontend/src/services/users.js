import axios from 'axios'

const usersBaseUrl = 'http://localhost:3003/api/users/'

const getAll = async () => {
	const response = await axios.get(usersBaseUrl)
	return response.data.map(user => ({ ...user }))
}
const getUserInfo = async id => {
	const response = await axios.get(`${usersBaseUrl}${id}`)
	return response.data
}

export default { getAll, getUserInfo }
