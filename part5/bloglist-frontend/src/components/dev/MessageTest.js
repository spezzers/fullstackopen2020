import React from 'react'

const MessageTest = ({handleMessage}) => {
	return (
		<div style={{paddingBottom: '20px', borderBottom: 'solid #aaaaaa', marginBottom: '20px'}}>
			{' '}
			<div>Message Tests</div>
			<button onClick={() => handleMessage('error message test', 'error')}>
				error
			</button>
			<button onClick={() => handleMessage('warning message test', 'warning')}>
				warning
			</button>
			<button onClick={() => handleMessage('confirm message test', 'confirm')}>
				confirm
			</button>
			<button onClick={() => handleMessage('default message test', 'default')}>
				default
			</button>
		</div>
	)
}

export default MessageTest
