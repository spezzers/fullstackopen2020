const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')
const helper = require('./test_helper')
const api = supertest(app)

describe('Initialise Database', () => {
	test('Users', async () => {
		await User.deleteMany({})
		const userObjects = helper.initialUsers.map(user => helper.addUser(user))
		const hashPromise = await Promise.all(userObjects)
		const userPromises = hashPromise.map(user => user.save())
		await Promise.all(userPromises)

		await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
	test('Blogs', async () => {
		await Blog.deleteMany({})
		const blogObjects = helper.initialBlogList.map(blog => new Blog(blog))
		const blogPromises = blogObjects.map(blog => blog.save())
		await Promise.all(blogPromises)

		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
