const mongoose = require('mongoose')
const app = require('../index')
const supertest = require('supertest')
const api = supertest(app)
const Author = require('../models/Author')
const Book = require('../models/Book')
const helper = require('./testHelper')
const User = require('../models/User')


beforeEach(async () => {
	await Book.deleteMany({})
	await Author.deleteMany({})
	await User.deleteMany({})
})

describe('Delete existing collection data', () => {
	
	test('Delete: Books', async () => {
		const books = await Book.find({})
		expect(books.length).toBe(0)
	})
	beforeEach
	test('Delete: Authors', async () => {
		const authors = await Author.find({})
		expect(authors.length).toBe(0)
	})
	test('Delete Users', async () => {
		const  users = await User.find({})
		expect(users.length).toBe(0)
	})
})
describe('Initialise test data', () => {
	beforeEach(async () => {
		// Authors
		const authorObjects = helper.initAuthors.map(a => new Author(a))
		const authorPromises = authorObjects.map(a => a.save())
		// Books
		const bookObjects = helper.initBooks.map(b => {
			// console.log(b.author)
			return new Book(b)
		})
		const bookPromises = bookObjects.map(b => {
			console.log(b)
			return b.save()
		})
		// All promises
		const allPromises = authorPromises.concat(bookPromises)
		await Promise.all(allPromises)
	})
	test('Add Books', async () => {
		const books = await Book.find({})
		expect(books.length).toBe(helper.initBooks.length)
	})
	test('Add Authors', async () => {
		const authors = await Author.find({})
		expect(authors.length).toBe(helper.initAuthors.length)
	})
})


afterAll(() => {
	mongoose.connection.close()
})