import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const noti = useSelector(state => state.noti)
  const message = noti.message
  const error = noti.error

  if(message === '') {
    return ''
  }
  return (
    <Alert variant={error ? 'danger' : 'success'} className='noti'>
      {message}
    </Alert>
  )
}

export default Notification