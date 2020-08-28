import React, { useState } from 'react'
// import PropTypes from 'prop-types'

const Toggle = (props, ref) => {
	const [visible, setVisible] = useState(false)

	const secondaryLabel = props.secondaryLabel || 'Cancel'

	const toggleVisible = () => setVisible(!visible)
	const style = {
		...props.style,
		display: visible ? '' : 'none'
	}

	return (
		<>
			<button onClick={toggleVisible}>
				{visible ? secondaryLabel : props.primaryLabel}
			</button>
			<div style={style}>{props.children}</div>
		</>
	)
}

export default Toggle
