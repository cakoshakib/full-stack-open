import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN_USER':{
    const user = action.data.user
    blogService.setToken(user.token)
    return user
  }
  case 'LOGOUT_USER': {
    return null
  }
  default:
    return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBlogUser', JSON.stringify(user)
    )
    dispatch({
      type: 'LOGIN_USER',
      data: { user }
    })
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN_USER',
      data: { user }
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export default reducer