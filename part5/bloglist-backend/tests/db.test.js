const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')
const helper = require('./test_helper')
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
describe('4.8: Get list of blogs', () => {
	test('get all blogs in json format', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
})
describe('4.9: Verify unique property identifier', () => {
	test('property name is \'id\'', async () => {
		await api.get('/api/blogs').expect(200)
		const blogs = await helper.blogsInDb()
		expect(blogs[0].id).toBeDefined()
	})
})
describe('4.10: HTTP POST', () => {
	test('post a valid blog', async () => {
		const newBlog = {
			title: 'A new Blog is added',
			author: 'Sir Blogsalot',
			url: 'www.blogmesideways.com',
			likes: 12
		}
		await api
			.post('/api/blogs')
			.set('Authorization', helper.superUser.token)
			.send(newBlog)
			.expect(201)

		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogList.length + 1)

		const contents = blogsAfter.map(x => x.title)

		expect(contents).toContain('A new Blog is added')
	})
})
describe('4.11: Verify if \'likes\' property is missing', () => {
	test('\'likes\' default to 0 if not defined', async () => {
		const newBlog = {
			title: 'New Blog - No Likes',
			author: 'Sir Blogsalittle',
			url: 'www.blogmesideways.com',
		}
		const response = await api
			.post('/api/blogs')
			.set('Authorization', helper.superUser.token)
			.send(newBlog)
			.expect(201)
		expect(response.body.likes).toEqual(0)
	})
})

describe('4.12: Verify title/url properties', () => {
	test('Missing properties returns status code \'400 Bad Request\'', async () => {
		const newBlog = {
			author: 'Captain Blogsnot',
			likes: 666,
			// title: 'how',
			// url: 'webblog.com'
		}
		await api
			.post('/api/blogs')
			.set('Authorization', helper.superUser.token)
			.send(newBlog)
			.expect(400)
	})
})
describe('4.13: Deleting stuff', () => {
	test('Delete a blog by id', async () => {
		const blogs = await helper.blogsInDb()
		const blogToDelete = blogs[0]
		const token = await helper.getUserToken(blogToDelete.user.toString())
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', token)
			.expect(204)
		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogList.length - 1)
	})
})
describe('4.14: Updating blog info', () => {
	test('updates successfully', async () => {
		await api.get('/api/blogs').expect(200)
		const blogs = await helper.blogsInDb()
		const blogToUpdate = blogs[0].id

		const newLikes = {likes: 999, url: 'bish-bash-bosh'}
		await api
			.put(`/api/blogs/${blogToUpdate}`)
			.send(newLikes)
			.expect(200)
		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter[0].likes).toEqual(newLikes.likes)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
