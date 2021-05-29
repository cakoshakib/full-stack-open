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
  return response.status(201).json(result)
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

module.exports = blogsRouter
