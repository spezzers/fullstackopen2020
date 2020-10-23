import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { colors } from '../styled'

const MessageContainer = styled.div`
	position: fixed;
	left: 0;
	width: 100%;
    min-height: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
	background-color: ${props => {
		switch (props.className) {
			case 'message':
				return colors.blue
			case 'error':
				return colors.error
			case 'warning':
				return colors.warning
			case 'confirm':
				return colors.confirm
			default:
				return 'initial'
		}
	}};
`

const Message = () => {
	const message = useSelector(state => state.message)

	return (
		<MessageContainer id='messageArea' className={message.type}>
			{message.type ? message.content : ''}
		</MessageContainer>
	)
}

export default Message
