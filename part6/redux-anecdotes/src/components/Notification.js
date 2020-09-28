import React from 'react'
import { connect } from 'react-redux'

const NotificationComponent = (props) => {
	const notification = props.notification
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		visibility: notification !== '' ? 'visible' : 'hidden'
	}
	return <div style={style}>{notification}</div>
}

const mapStateToProps = state => {
	return {
		notification: state.notification
	}
}

const Notification = connect(mapStateToProps)(NotificationComponent)

export default Notification
