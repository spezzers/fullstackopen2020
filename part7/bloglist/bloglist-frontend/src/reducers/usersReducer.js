import usersService from '../services/users'

export const getAllUsers = () => {
	return async dispatch => {
		const users = await usersService.getAll()
		dispatch({
			type: 'GET_ALL_USERS',
			data: users
		})
	}
}

export const getUserInfo = id => {
	return async dispatch => {
		const info = await usersService.getUserInfo(id)
		dispatch({
			type: 'USER_INFO',
			data: info
		})
	}
}

const usersReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_ALL_USERS':
			return action.data
		case 'USER_INFO':
			console.log(action.data)
			if (action.data !== null) {
				return action.data
			}
			return 1

		default:
			return state
	}
}

export default usersReducer
