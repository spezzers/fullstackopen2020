import React, { useState, useImperativeHandle } from 'react'
// import PropTypes from 'prop-types'

const Toggle = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const secondaryLabel = props.secondaryLabel || 'Cancel'

    const toggleVisible = () => setVisible(!visible)
    const style = {
        ...props.style,
        display: visible ? '' : 'none'
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisible
        }
    })

	return (
        <>
        <button onClick={toggleVisible}>
            {visible ? secondaryLabel : props.primaryLabel}
        </button>
		<div style={style}>
			{props.children}
		</div>
        </>
    )
})

export default Toggle
