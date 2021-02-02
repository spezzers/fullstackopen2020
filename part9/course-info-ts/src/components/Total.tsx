import React from 'react'

const Total: React.FC<{amount: number}> = ({amount}) => {
	return (
		<div>
			<p>
				Number of exercises{' '}
				{amount}
			</p>
		</div>
	)
}

export default Total
