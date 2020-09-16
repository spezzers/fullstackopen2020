const mongoose = require('mongoose')
const User = require('../models/User')
const Blog = require('../models/Blog')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})
	const blogObjects = helper.initialBlogList.map(blog => new Blog(blog))
	const blogPromises = blogObjects.map(blog => blog.save())
	const userObjects = helper.initialUsers.map(user => helper.addUser(user))
	const hashPromise = await Promise.all(userObjects)
	const userPromises = hashPromise.map(user => user.save())
	const allPromises = userPromises.concat(blogPromises)
	await Promise.all(allPromises)
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
		test('designate a user to newly added blogs', async () => {
			const newBlog = {
				title: 'A new Blog is added',
				author: 'Sir Blogsalot',
				url: 'www.blogmesideways.com'
			}
			const token = await helper.getUserToken('ffffffffffffffffffffffff')
			const response = await api
				.post('/api/blogs')
				.set('Authorization', token)
				.send(newBlog)
			expect(response.body.user.id).toBe('ffffffffffffffffffffffff')
		})
		test('each blog item displays creators information', async () => {
			const response = await api.get('/api/blogs')
			const usersDeets = response.body
				.map(b => b.user)
				.filter(user => user.username && user.name && user.id)
			expect(usersDeets.length).toBe(helper.initialBlogList.length)
		})
	})
})
describe('4.22* - Check for authentication token', () => {
	test('Fails with status *401 Unauthorized* if no token is provided on blog post', async () => {
		const newBlog = {
			title: 'A new Blog is added',
			author: 'Sir Blogsalot',
			url: 'www.blogmesideways.com'
		}
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
