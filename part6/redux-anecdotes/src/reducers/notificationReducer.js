const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return action.noti
    default:
      return state
  }
}

let id
export const setNotification = (newNoti, delay) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTI',
      noti: newNoti,
    })
    clearTimeout(id)
    id = setTimeout(() => {
      dispatch({
        type: 'SET_NOTI',
        noti: ''
      })
    }, (delay*1000))
  }
}

export default notificationReducer