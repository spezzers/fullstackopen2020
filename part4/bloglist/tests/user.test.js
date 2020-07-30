const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../models/User')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const saltRounds = 10

beforeEach(async () => {
	await User.deleteMany({})
	const passwordHash = await bcrypt.hash('mysterious', saltRounds)
	const user = new User({ username: 'root', name: 'Root User', passwordHash })
	await user.save()
})

describe('Get All Users', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const userObjects = helper.initialUsers.map(user => new User(user))
		const promiseArray = userObjects.map(user => user.save())
		await Promise.all(promiseArray)
	})
	test('response is JSON', async () => {
		await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
	test('response has correct number of users', async () => {
		const response = await api.get('/api/users')
		expect(response.body.length).toBe(helper.initialUsers.length)
	})
})

describe('4.15 - Create new user with HTTP Post', () => {
	const newUser = helper.initialUsers[0]
	test('successfully created a new user', async () => {
		const response = await api.post('/api/users').send(newUser)
		expect(response.body.name).toEqual(newUser.name)
		expect(response.body.username).toEqual(newUser.username)
	})
	test('plain text password is not saved to DB', async () => {
		const response = await api.post('/api/users').send(newUser)
		expect(response.body.password).not.toBeDefined()
	})
})


afterAll(() => {
	mongoose.connection.close()
})