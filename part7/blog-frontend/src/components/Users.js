import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => (
  <Table responsive striped>
    <tbody>
      <tr>
        <th>name</th>
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
  </Table>
)

export default Users