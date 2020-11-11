const mongoose = require('mongoose')
const app = require('../index')
const supertest = require('supertest')
const api = supertest(app)
const Author = require('../models/Author')
const Book = require('../models/Book')

describe('Initialize the database', () => {
	test('Remove Books', async () => {
		await Book.deleteMany({})
		const books = await Book.find({})
		expect(books.length).toBe(0)
	})
	test('Remove Authors', async () => {
		await Author.deleteMany({})
		const authors = await Author.find({})
		expect(authors.length).toBe(0)
	})
})


afterAll(() => {
	mongoose.connection.close()
})