import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { blogLike, blogDelete } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const Comments = ({ blog }) => {
  if (!blog.comments)
    return null

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(blog.comments)

  const handleAddComment = async (event) => {
    event.preventDefault()
    await blogService.addComment(blog.id, comment)
    setComments(comments.concat(comment))
    setComment('')
  }

  const onCommentChange = (target) => {
    setComment(target.value)
  }

  const padding = {
    padding: 10
  }

  return (
    <div>
      <h1>comments</h1>
      <ul>
        {comments.map((comment, idx) =>
          <li key={idx}>{comment}</li>
        )}
      </ul>
      <Form onSubmit={handleAddComment}>
        <input
          onChange={({ target }) => onCommentChange(target)}
          value={comment}
        />
        <span style={padding}>
          <Button className="btn btm-primary mb-2" size="sm" id='create-blog' type='submit'>add comment</Button>
        </span>
      </Form>
    </div>
  )
}

const BlogPage = ({ blogs }) => {
  const blog = blogs.find(blog => blog.id === useParams().id)
  if (!blog) {
    return null
  }
  const dispatch = useDispatch()

  const addLike = (blog) => {
    dispatch(blogLike(blog))
  }

  const deleteBlog = async (blog) => {
    const confirmation = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirmation) {
      dispatch(blogDelete(blog))
    }
  }
  const padding = {
    padding: 10
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>{blog.title}</h1>
          <div>
            <div>URL: <a href={blog.url}>{blog.url}</a></div>
            <div>
              Likes: {blog.likes}
              <span style={padding}>
                <Button className="btn btm-primary btn-sm mb-2" size="sm" onClick={() => addLike(blog)}>like</Button>
              </span>
            </div>
            <div>Added by {blog.user.name}</div>
            <Link to='/'>
              <Button variant='danger' size='sm' onClick={() => deleteBlog(blog)}>
                delete
              </Button>
            </Link>
          </div>
        </Col>
        <Col>
          <Comments blog={blog}/>
        </Col>
      </Row>
    </Container>
  )
}

export default BlogPage