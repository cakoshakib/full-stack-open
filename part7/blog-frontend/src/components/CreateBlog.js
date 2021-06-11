import React, { useState } from 'react'

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

  return (
    <form onSubmit={handleAddBlog}>
      <div>
      title:
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
      </div>
      <div>
      author:
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
      </div>
      <div>
      url:
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
      </div>
      <button id='create-blog' type='submit'>create</button>
    </form>

  )
}

export default CreateBlog