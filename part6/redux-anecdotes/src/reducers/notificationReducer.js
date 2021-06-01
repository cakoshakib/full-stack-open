const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return action.noti
    default:
      return state
  }
}

export const changeNoti = newNoti => {
  return {
    type: 'SET_NOTI',
    noti: newNoti,
  }
}

export const removeNoti = () => {
  return {
    type: 'SET_NOTI',
    noti: ''
  }
}

export default notificationReducer