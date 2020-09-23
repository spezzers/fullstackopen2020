import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: notification === '' ? 'hidden' : 'visible'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification