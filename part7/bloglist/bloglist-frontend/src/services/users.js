import axios from 'axios'

const usersBaseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
	const response = await axios.get(usersBaseUrl)
	console.log(response.data)
	const usersInfo = response.data.map(user => (
		{
			name: user.name,
			blogCount: user.blogs.length
		}
	))
	console.log(usersInfo)
	return usersInfo
}

export default { getAll }