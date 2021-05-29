const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has 0 blogs, return 0', () => {
    const result = listHelper.totalLikes(testHelper.emptyBlog)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has 6 blogs of varying likes', () => {
    const result = listHelper.totalLikes(testHelper.sampleBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list has 0 blogs, equals {}', () => {
    const result = listHelper.favoriteBlog(testHelper.emptyBlog)
    expect(result).toEqual({})
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(testHelper.listWithOneBlog)
    expect(result).toEqual(testHelper.listWithOneBlog[0])
  })

  test('when list has 6 blogs of varying likes, equals most liked', () => {
    const result = listHelper.favoriteBlog(testHelper.sampleBlogs)
    expect(result).toEqual(testHelper.sampleBlogs[2])
  })
})

describe('most blogs', () => {
  test('when list has 0 blogs, equals {}', () => {
    const result = listHelper.mostBlogs(testHelper.emptyBlog)
    expect(result).toEqual({})
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostBlogs(testHelper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when list has 6 blogs of varying sizes', () => {
    const result = listHelper.mostBlogs(testHelper.sampleBlogs)
    expect(result).toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    )
  })
})

describe('most likes', () => {
  test('when list has 0 blogs, equals {}', () => {
    const result = listHelper.mostLikes(testHelper.emptyBlog)
    expect(result).toEqual({})
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostLikes(testHelper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has 6 blogs of varying sizes', () => {
    const result = listHelper.mostLikes(testHelper.sampleBlogs)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    )
  })
})
