import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.noti
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification === '')
    return ''
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) =>{
  return {
    noti: state.noti
  }
}

export default connect(
  mapStateToProps
)(Notification)
