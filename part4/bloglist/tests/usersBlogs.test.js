const mongoose = require('mongoose')
const User = require('../models/User')
// const Blog = require('../models/Blog')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
api

beforeEach(async () => {
	await User.deleteMany({})
	const userObjects = helper.initialUsers.map(user => new User(user))
	const promiseArray = userObjects.map(user => user.save())
	await Promise.all(promiseArray)
})

describe('4.17 - Blogs and their users', () => {
	describe('Users', () => {
		test('User items display a list of blogs added by that user', async () => {
			const users = await helper.usersInDb()
			const validUsers = users.filter(user => Array.isArray(user.blogs))
			expect(validUsers.length).toBe(helper.initialUsers.length)
		})
	})
	describe('Blogs', () => {
		test.skip('designate a user to newly added blogs', async () => {
			const test = 'not written'
			expect(test).toBe('written')
		})
		test.skip('each blog item displays creators information', async () => {
			const test = 'not written'
			expect(test).toBe('written')
		})
	})
})

afterAll(() => {
	mongoose.connection.close()
})
