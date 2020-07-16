const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('gets all blogs', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('check id property', async () => {
	const response = await api
		.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})
afterAll(() => {
	mongoose.connection.close()
})
