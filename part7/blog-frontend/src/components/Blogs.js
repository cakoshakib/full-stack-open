import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blog = ({ blog }) => {

  return (
    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
      <td>
        {blog.author}
      </td>
    </tr>
  )
}

const Blogs = () => {
  const allBlogs = useSelector(state => state.blogs)

  return (
    <Table striped>
      <tbody>
        {allBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </tbody>
    </Table>
  )
}

export default Blogs