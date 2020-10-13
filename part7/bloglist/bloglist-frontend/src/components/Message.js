import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notification } from '../reducers/notificationReducer'

const Message = () => {
	const dispatch = useDispatch()
	const message = useSelector(state => state.message)
	console.log(message)
	if (message.type) {
		return (
			<div id='messageArea' className={message.type}>
				{message.content}
				<button onClick={() => dispatch(notification('hello', 5000, 'confirm'))}>Test Message</button>
			</div>
		)
	}
	return <div id='messageArea'></div>
}

export default Message
