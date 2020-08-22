import React from 'react'

const Message = ({message}) => {
    if (message.type) {
        return (
            <div id='messageArea' className={message.type}>{message.content}</div>
        )
    }
    return (
        <div id='messageArea'></div>
    )
}

export default Message