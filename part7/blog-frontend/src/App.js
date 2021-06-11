import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogPage from './components/BlogPage'
import Users from './components/Users'
import User from './components/UserPage'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser, setUser } from './reducers/userReducer'
import userService from './services/users'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, newUsers] = useState([])
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    userService.getAll()
      .then(res => {
        newUsers(res)
        console.log('received user data')
      })
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(setNotification({
        message: 'wrong username or password',
        error: true
      }, 5))
    }
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(setNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        error: false
      }, 5))
    } catch (exception) {
      console.log('invalid add')

    }
  }

  const handleLogout = () => dispatch(logoutUser())

  const user = useSelector(state => state.user)

  if (user === null) {
    return (
      <div>
        <Notification />
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }
  const padding = {
    padding: 5
  }
  const navStyle = {
    padding: 5,
    background: '#cad3e0'
  }

  return (
    <Router>
      <div style={navStyle}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <span style={padding}>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Notification />
      <Switch>
        <Route path="/users/:id">
          <User users={users}/>
        </Route>
        <Route path="/users">
          <h2>Users</h2>
          <Users users={users}/>
        </Route>
        <Route path="/blogs/:id">
          <BlogPage blogs={blogs}/>
        </Route>
        <Route path="/">
          <h2>blogs</h2>
          <Togglable buttonLabel="create blog" ref={blogFormRef}>
            <h2>create new</h2>
            <CreateBlog createBlog={handleCreateBlog} />
          </Togglable>
          <Blogs
            user={user}
          />
        </Route>
      </Switch>
    </Router>
  )
}

export default App