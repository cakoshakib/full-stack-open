const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body } = request
  const { user } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'title or url missing ' })
  }
  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  const returnBlog = await Blog
    .find(blog).populate('user', { username: 1, name: 1 })
  return response.status(201).json(returnBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  console.log(request.params.id)
  const blog = await Blog.findById(request.params.id)
  const { user } = request
  const userid = user.id

  if (blog.user.toString() === userid.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  return response.status(400).error({ error: 'user lacks permission' })
})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedNote)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(request.body.message)
  blog.save()
  response.json(blog.comments)
})

module.exports = blogsRouter
