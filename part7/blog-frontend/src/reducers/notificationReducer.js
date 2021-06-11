const emptyNoti = {
  message: '',
  error: false
}

const notificationReducer = (state = emptyNoti, action) => {
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
    console.log(id, delay)
    clearTimeout(id)
    id = setTimeout(() => {
      dispatch({
        type: 'SET_NOTI',
        noti: emptyNoti
      })
    }, (delay * 1000))
  }
}

export default notificationReducer