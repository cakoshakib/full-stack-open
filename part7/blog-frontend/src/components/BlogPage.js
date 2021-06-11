import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { blogLike, blogDelete } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'

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

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          onChange={({ target }) => onCommentChange(target)}
          value={comment}
        />
        <button id='create-blog' type='submit'>add comment</button>
      </form>
      <ul>
        {comments.map((comment, idx) =>
          <li key={idx}>{comment}</li>
        )}
      </ul>
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

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes}
          <button onClick={() => addLike(blog)}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        <button onClick={() => deleteBlog(blog)}>
          <Link to='/'>delete</Link>
        </button>
      </div>
      <Comments blog={blog}/>
    </div>
  )
}

export default BlogPage