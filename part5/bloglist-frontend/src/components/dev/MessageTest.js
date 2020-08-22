import React from 'react'

const MessageTest = ({handleMessage}) => {
	return (
		<div style={{paddingBottom: '20px', borderBottom: 'solid #aaaaaa', marginBottom: '20px'}}>
			{' '}
			<div>Message Tests</div>
			<button onClick={() => handleMessage('error', 'error message test')}>
				error
			</button>
			<button onClick={() => handleMessage('warning', 'warning message test')}>
				warning
			</button>
			<button onClick={() => handleMessage('confirm', 'confirm message test')}>
				confirm
			</button>
			<button onClick={() => handleMessage('default', 'default message test')}>
				default
			</button>
		</div>
	)
}

export default MessageTest
