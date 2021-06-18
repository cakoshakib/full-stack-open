import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CreateBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleAddBlog = async (event) => {
    event.preventDefault()
    await createBlog(newBlog)
    setNewBlog(
      {
        title: '',
        author: '',
        url: ''
      }
    )
  }

  const padding = {
    'paddingRight': 10
  }

  return (
    <Form onSubmit={handleAddBlog}>
      <Form.Group>
        <Form.Label style={padding}>title: </Form.Label>
        <input
          type='text'
          id='title'
          value={newBlog.title}
          name='Title'
          onChange={({ target }) => setNewBlog({
            title: target.value,
            author: newBlog.author,
            url: newBlog.url
          })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label style={padding}>author: </Form.Label>
        <input
          type='text'
          id='author'
          value={newBlog.author}
          name='Author'
          onChange={({ target }) => setNewBlog({
            title: newBlog.title,
            author: target.value,
            url: newBlog.url
          })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label style={padding}>url: </Form.Label>
        <input
          type='text'
          value={newBlog.url}
          id='url'
          name='URL'
          onChange={({ target }) => setNewBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: target.value
          })}
        />
      </Form.Group>
      <div style={{ 'paddingBottom': 10 }}>
        <Button variant="success" id='create-blog' type='submit'>
          create
        </Button>
      </div>
    </Form>

  )
}

export default CreateBlog