const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return action.noti
    default:
      return state
  }
}

export const setNotification = (newNoti, delay) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTI',
      noti: newNoti,
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTI',
        noti: ''
      })
    }, (delay*1000))
  }
}

export default notificationReducer