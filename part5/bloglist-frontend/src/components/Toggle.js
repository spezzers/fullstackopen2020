import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Toggle = props => {
	const [visible, setVisible] = useState(false)

	const secondaryLabel = props.secondaryLabel || 'Cancel'

	const handleToggle = props.toggleButton ? props.toggleButton : () => setVisible(!visible)

	const style = {
		...props.style,
		display: visible ? '' : 'none'
	}

	return (
		<>
			<button id={props.id ? `${props.id}-toggle` : null} onClick={handleToggle} className={props.className ? `${props.className}-toggle` : 'toggleButton'}>
				{visible ? secondaryLabel : props.primaryLabel}
			</button>
			<div id={props.id} className={props.className} style={style}>
				{props.children}
			</div>
		</>
	)
}

Toggle.propTypes = {
	primaryLabel: PropTypes.string.isRequired
}

export default Toggle
