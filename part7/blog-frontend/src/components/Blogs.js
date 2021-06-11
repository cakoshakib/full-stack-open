import React from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
      </div>
    </div>
  )
}

const Blogs = () => {
  const allBlogs = useSelector(state => state.blogs)

  return (
    <div>
      {allBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default Blogs