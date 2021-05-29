import React, { useEffect, useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [owner, setOwner] = useState(false)


  useEffect(() => {
    if (blog.user.username === user.username) {
      setOwner(true)
    }
  }, [])

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenOwn = { display : owner ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="moreInfo">
        <div>
          {blog.title} - {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => addLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button style={showWhenOwn} onClick={() => deleteBlog(blog)}>delete</button>
      </div>
    </div>
  )
}

export default Blog