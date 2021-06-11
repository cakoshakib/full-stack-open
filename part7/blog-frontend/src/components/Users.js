import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => (
  <table>
    <tbody>
      <tr>
        <th></th>
        <th>blogs created</th>
      </tr>
      {users.map((usr, idx) =>
        <tr key={idx}>
          <td key={usr.username}>
            <Link to={`/users/${usr.id}`}>{usr.name}</Link>
          </td>
          <td key={usr.id}>{usr.blogs.length}</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default Users