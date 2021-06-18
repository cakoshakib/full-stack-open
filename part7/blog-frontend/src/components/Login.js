import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div>
      <h2 style={{ 'textAlign': 'center', 'paddingBottom': 30 }}>log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='username'
            value={username}
            id='username'
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='password'
            value={password}
            id='password'
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <div style={{ 'textAlign': 'center' }}>
          <Button id='login-button' type='submit'>login</Button>
        </div>
      </Form>
    </div>
  )
}

export default Login