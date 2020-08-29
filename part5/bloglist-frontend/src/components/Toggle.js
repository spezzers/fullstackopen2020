import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Toggle = props => {
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
			<div className={props.className} style={style}>{props.children}</div>
		</>
	)
}

Toggle.propTypes = {
	primaryLabel: PropTypes.string.isRequired
}

export default Toggle
