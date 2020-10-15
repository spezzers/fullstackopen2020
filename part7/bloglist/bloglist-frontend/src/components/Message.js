import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
	const message = useSelector(state => state.message)
	console.log(message)
	if (message.type) {
		return (
			<div id='messageArea' className={message.type}>
				{message.content}
			</div>
		)
	}
	return <div id='messageArea'></div>
}

export default Message
