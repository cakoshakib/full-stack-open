/* eslint-disable indent */
import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE': {
      const id = action.data.id
      const  blogToChange = state.find(blog => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state
        .map(blog =>
          blog.id === id ? changedBlog : blog
        ).sort(
          (a, b) => (a.likes < b.likes ) ? 1 : -1
        )
    }
    case 'BLOG_DELETE': {
      const blog = action.data
      const blogIndex = state.findIndex(({ id }) => id === blog.id)
      return [...state.slice(0, blogIndex), ...state.slice(blogIndex + 1)]
    }
    case 'NEW_BLOG':
      return [...state, action.data[0]]
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: returnedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs.sort((blogA, blogB) => (blogA.likes < blogB.likes) ? 1 : -1)
    })
  }
}

export const blogLike = (blog) => {
  return async dispatch => {
    const newBlog = { ...blog, likes: blog.likes+1 }
    await blogService.update(blog.id, newBlog)
    dispatch({
      type: 'LIKE',
      data: { id: blog.id }
    })
  }
}
export const blogDelete = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'BLOG_DELETE',
      data: blog
    })

  }
}
export default reducer