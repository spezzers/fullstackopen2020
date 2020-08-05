const mongoose = require('mongoose')
const User = require('../models/User')
const Blog = require('../models/Blog')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
api

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})
	const blogObjects = helper.initialBlogList.map(blog => new Blog(blog))
	const userObjects = helper.initialUsers.map(user => new User(user))
	const allObjects = blogObjects.concat(userObjects)
	const promiseArray = allObjects.map(prom => prom.save())
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
		test.skip('designate a user to newly added blogs', async () => {})
		test.skip('each blog item displays creators information', async () => {})
	})
})

afterAll(() => {
	mongoose.connection.close()
})
