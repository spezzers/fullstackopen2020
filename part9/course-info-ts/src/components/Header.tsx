import React from 'react'

const Header: React.FC<{title: string}> = ({title}) => {
	// code here
	return(
		<div>
			<h1>{title}</h1>
		</div>
	)
}

export default Header