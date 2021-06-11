const lodash = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)

  return total
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes))
  const topBlog = blogs.find((blog) => blog.likes === mostLikes)
  return topBlog || {}
}

const getByAuthor = (blogs) => lodash.groupBy(blogs, 'author')

const mostBlogs = (blogs) => {
  const blogsByAuthor = getByAuthor(blogs)
  const authorByBlogs = lodash.mapValues(blogsByAuthor, (blog) => blog.length)

  const maxBlogs = Math.max(...lodash.values(authorByBlogs))
  const topAuthor = lodash.keys(authorByBlogs).find((key) => authorByBlogs[key] === maxBlogs)

  return topAuthor ? (
    {
      author: topAuthor,
      blogs: maxBlogs,
    }
  ) : {}
}

const mostLikes = (blogs) => {
  const blogsByAuthor = getByAuthor(blogs)
  const authorByLikes = lodash.mapValues(blogsByAuthor, (blog) => lodash.sumBy(blog, 'likes'))

  const maxLikes = Math.max(...lodash.values(authorByLikes))
  const topAuthor = lodash.keys(authorByLikes).find((key) => authorByLikes[key] === maxLikes)

  return topAuthor ? (
    {
      author: topAuthor,
      likes: maxLikes,
    }
  ) : {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
