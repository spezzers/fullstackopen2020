export const setUser = data => {
	return { type: 'SET_USER', data }
}

export const clearUser = () => {
	return { type: 'CLEAR_USER' }
}

const userReducer = (state = { username: '', name: '', token: '' }, action) => {
	const user = action.data
	switch (action.type) {
		case 'SET_USER':
			return { ...user }
		case 'CLEAR_USER':
			return { username: '', name: '', token: '' }
		default:
			return state
	}
}

export default userReducer
