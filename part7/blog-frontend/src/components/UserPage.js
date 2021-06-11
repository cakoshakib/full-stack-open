import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const user = users.find(user => user.id === useParams().id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog, idx) =>
          <li key={idx}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User