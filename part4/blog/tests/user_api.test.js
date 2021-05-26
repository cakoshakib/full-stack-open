const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const testHelper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('woo', 10)
    const newUser = new User({
        username: 'impact',
        passwordHash,
        name: 'shakib'
    })
    await newUser.save()
})

describe('when there is a user initially', () => {
    test('short user fails', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'a',
            name: 'help me',
            password: 'debugging'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('short password fails', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'ahhhh',
            name: 'shakib',
            password: 'de'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('not unique username fails', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'impact',
            name: 'shakib',
            password: 'de'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('username not given fails', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            name: 'shakib',
            password: 'de'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password not given fails', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'zzzzzzz',
            name: 'shakib'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('valid user adds', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'test',
            name: 'shakib',
            password: 'bobby'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.lengt + 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
