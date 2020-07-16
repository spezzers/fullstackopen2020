const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	// console.log('Blogs Cleared')
	const blogObjects = helper.initialBlogList.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => {
		// console.log(blog.title, 'Blog saved')
		blog.save()
	})
	// console.log(promiseArray)
	await Promise.all(promiseArray)
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
			.send(newBlog)
			.expect(201)

		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogList.length + 1)

		const contents = blogsAfter.map(x => x.title)

		expect(contents).toContain('A new Blog is added')
	})
})

afterAll(() => {
	mongoose.connection.close()
})
