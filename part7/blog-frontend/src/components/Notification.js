import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const noti = useSelector(state => state.noti)
  const message = noti.message
  const error = noti.error

  if(message === '') {
    return ''
  }

  const notiStyle = {
    color: error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className='noti' style={notiStyle}>
      {message}
    </div>
  )
}

export default Notification