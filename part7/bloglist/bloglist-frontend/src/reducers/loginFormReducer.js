// import loginService from '../services/login'

export const setUser = data => {
	return { type: 'SET_USER', data }
}

export const clearForm = () => {
	return { type: 'CLEAR_USER' }
}

export const login = data => {
	return { type: 'LOGIN', data }
}

const loginFormReducer = (state = { username: '', password: '' }, action) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...action.data }
		case 'CLEAR_FORM':
			return { username: '', password: '' }
		default:
			return state
	}
}

export default loginFormReducer
