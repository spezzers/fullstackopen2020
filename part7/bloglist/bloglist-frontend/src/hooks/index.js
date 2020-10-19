import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/loggedInUserReducer'

export const useField = type => {
	const [value, setValue] = useState('')

	const onChange = event => {
		event.type === 'change' ? setValue(event.target.value) : setValue('')
	}

	const clear = () => setValue('')

	return {
		type,
		value,
		onChange,
		clear
	}
}

export const useUser = () => {
	const current = useSelector(state => state.loggedInUser)
	const dispatch = useDispatch()
	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
		const user = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null
		if (user && user.username !== current.username) {
			dispatch(setUser(user))
		}
	}, [dispatch, current])
	const isLoggedIn = current.username !== ''

	return { current, isLoggedIn }
}
