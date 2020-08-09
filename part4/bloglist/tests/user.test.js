const mongoose = require('mongoose')
const User = require('../models/User')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})
	const userObjects = helper.initialUsers.map(user => helper.addUser(user))
	const hashPromise = await Promise.all(userObjects)
	const userPromises = hashPromise.map(user => user.save())
	await Promise.all(userPromises)
})

describe('Get All Users', () => {
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
	const newUser = {
		username: 'newgirrl',
		name: 'Jeffney Dae',
		password: 'iamnewhere'
	}
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

describe('4.16* - New user validation', () => {
	describe('invalid username', () => {
		const invalidUser = {
			username: 'da',
			name: 'Daddy Dave',
			password: '54321'
		}
		test('is not added to db', async () => {
			await api.post('/api/users').send(invalidUser)
			const db = await api.get('/api/users')
			expect(db.body.length).toEqual(helper.initialUsers.length)
		})
		test('returns error with code 400', async () => {
			const response = await api
				.post('/api/users')
				.send(invalidUser)
				.expect(400)
			expect(response.error.text).toBeDefined()
		})
	})
	describe('invalid password', () => {
		const invalidUser = {
			username: 'daddieo',
			name: 'Daddy Dave',
			password: '5'
		}
		test('is not added to db', async () => {
			await api.post('/api/users').send(invalidUser)
			const db = await api.get('/api/users')
			expect(db.body.length).toEqual(helper.initialUsers.length)
		})
		test('returns error with code 400', async () => {
			const response = await api
				.post('/api/users')
				.send(invalidUser)
				.expect(400)
			expect(response.body.error).toBe('password must be at least 3 characters')
		})
	})
})

afterAll(() => {
	mongoose.connection.close()
})
