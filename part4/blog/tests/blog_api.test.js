const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('./test_helper')

const api = supertest(app)

const blogs = testHelper.sampleBlogs

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('woo', 10)
    const newUser = new User({
        username: 'impact',
        passwordHash,
        name: 'shakib'
    })
    await newUser.save()

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('when there is initially blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blogs length is correct', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(blogs.length)
    })

    test('blogs have id tag', async () => {
        const response = await api.get('/api/blogs')

        const ids = response.body.map(r => r.id)
        expect(ids).toBeDefined()
    })

    describe('when adding a blog', () => {
        test('valid is added correctly', async () => {
            const newBlog = {
                title: 'A new blog',
                author: 'Shakib Rahman',
                url: 'shakib.dev',
                likes: 100
            }

            const token = await testHelper.getToken()
            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await testHelper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(blogs.length + 1)

            const urls = blogsAtEnd.map(blog => blog.url)
            expect(urls).toContain('shakib.dev')
        })

        test('likes default to 0 if not given', async () => {
            const newBlog = {
                title: 'A new blog',
                author: 'Shakib Rahman',
                url: 'shakib.dev',
            }

            const token = await testHelper.getToken()
            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)

            const validNote = await testHelper.blogsInDb()
            expect(validNote[blogs.length].likes).toEqual(0)
        })

        test('missing title and url is invalid', async () => {
            const newBlog = {
                author: 'Shakib Rahman'
            }

            const token = await testHelper.getToken()
            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(400)

            const blogsAtEnd = await testHelper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(blogs.length)
        })

        test('unauthorized add', async () => {
            const newBlog = {
                title: 'A new blog',
                author: 'Shakib Rahman',
                url: 'shakib.dev',
                likes: 100,
            }
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)

            const blogsAtEnd = await testHelper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(blogs.length)
        })
    })

    describe('when deleting a blog', () => {
        test('suceeds with status code 204 if id is valid', async () => {
            const user = await User.findOne({})
            const blogToDelete = {
                title: 'Type wars',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
                likes: 2,
                user: user._id
            }

            const blogObject = Blog(blogToDelete)
            await blogObject.save()

            const token = await testHelper.getToken()
            await api
                .delete(`/api/blogs/${blogObject.id}`)
                .set('Authorization', `bearer ${token}`)
                .expect(204)

            const blogsAtEnd = await testHelper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(blogs.length)
        })
    })

    describe('when updating a blog', () => {
        test('succeeds with valid edit', async () => {
            const blogsAtStart = await testHelper.blogsInDb()
            const blogToEdit = blogsAtStart[0]
            blogToEdit.likes = 1

            await api
                .put(`/api/blogs/${blogToEdit.id}`)
                .send(blogToEdit)

            const blogsAtEnd = await testHelper.blogsInDb()
            const editedBlog = blogsAtEnd.find(blog => blog.title === blogToEdit.title)
            expect(editedBlog.likes).toEqual(1)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})
