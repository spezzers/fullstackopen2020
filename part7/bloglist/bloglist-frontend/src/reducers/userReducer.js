// import loginService from '../services/login'

export const setUser = data => {
    return {type: 'SET_USER', data}
}

export const clearUser = () => {
    return {type: 'CLEAR_USER'}
}

const userReducer = (state = { username: '', name: '', token: '' }, action) => {
    switch ( action.type ) {
        case 'SET_USER':
            // console.log(action.data)
            const user = action.data
            return ({...user})
        case 'CLEAR_USER':
            console.log('User cleared')
            return { username: '', name: '', token: '' }
        default:
            return state
    }
}

export default userReducer