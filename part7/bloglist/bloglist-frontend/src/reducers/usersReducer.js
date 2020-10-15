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

const usersReducer = ( state = [], action) => {
	// console.log(action.type, action.data)
	switch (action.type) {
		case 'GET_ALL_USERS':
			console.log(action.type, action.data)
			return action.data
		default:
			return state
	}
}



export default usersReducer