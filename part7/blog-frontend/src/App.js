import React, { useState, useEffect, useRef } from 'react'

// Components
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogPage from './components/BlogPage'
import Users from './components/Users'
import User from './components/UserPage'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser, setUser } from './reducers/userReducer'

// Services
import userService from './services/users'


// Router
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

// Styles
import { Navbar, Nav, Button, Form } from 'react-bootstrap'


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

  const smallMiddleContainer = {
    'margin': 'auto',
    'width': '30%',
  }

  if (user === null) {
    return (
      <div className='bg-light d-flex align-items-center min-vh-100'>
        <div className="jumbotron container" style={smallMiddleContainer}>
          <Notification />
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            className="h-100"
          />
        </div>
      </div>
    )
  }

  const padding = {
    'padding-right': 10
  }


  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link  to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
          </Nav>
          <div className="navbar-text" style={padding}>
            {user.name} logged in
          </div>
          <Form classname="d-flex">
            <Button variant="outline-primary" onClick={handleLogout}>
              logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

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
          <h2>Blogs</h2>
          <Blogs
            user={user}
          />
          <Togglable buttonLabel="create blog" ref={blogFormRef}>
            <h2>create new</h2>
            <CreateBlog createBlog={handleCreateBlog} />
          </Togglable>
        </Route>
      </Switch>
    </div>
  )
}

export default App