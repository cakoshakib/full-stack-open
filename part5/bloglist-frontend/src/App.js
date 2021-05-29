import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [noti, setNoti] = useState({
    message: null,
    error: false
  })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort((blogA, blogB) => (blogA.likes < blogB.likes) ? 1 : -1)
      )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const clearNoti = () => {
    setTimeout(() => {
      setNoti({ message:null, error:false })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNoti({
        message: 'wrong username or password',
        error: true
      })
      clearNoti()
    }
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNoti({
        message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        error: false
      })
      clearNoti()
    } catch (exception) {
      console.log('invalid add')

    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addLike = async (blog) => {
    const newBlog = {
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const blogIndex = blogs.findIndex(({ id }) => id === blog.id)
    const blogCopy = [...blogs]

    const toAdd = await blogService.update(blog.id, newBlog)

    blogCopy[blogIndex] = toAdd
    blogCopy.sort((blogA, blogB) => (blogA.likes < blogB.likes) ? 1 : -1)
    setBlogs(blogCopy)
  }

  const deleteBlog = async (blog) => {
    const confirmation = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    console.log(blog.id)
    if (confirmation) {
      await blogService.remove(blog.id)
      const blogCopy = [...blogs]
      const blogIndex = blogs.findIndex(({ id }) => id === blog.id)
      blogCopy.splice(blogIndex, 1)
      setBlogs(blogCopy)
    }
  }

  if(user === null) {
    return (
      <div>
        <Notification message={noti.message} error={noti.error}/>
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={noti.message} error={noti.error}/>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <h2>create new</h2>
        <CreateBlog createBlog={createBlog}/>
      </Togglable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog
          addLike={addLike}
          key={blog.id}
          blog={blog}
          deleteBlog={deleteBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default App