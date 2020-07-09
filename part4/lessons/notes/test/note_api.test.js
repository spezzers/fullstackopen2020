const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

const initialNotes = [
	{
		content: 'HTML is easy',
		important: false,
	},
	{
		content: 'Browser can execute only Javascript',
		important: true,
	},
]

beforeEach(async () => {
	await Note.deleteMany({})

	let noteObject = new Note(initialNotes[0])
	await noteObject.save()

	noteObject = new Note(initialNotes[1])
	await noteObject.save()
})

test('notes are returned as json', async () => {
	await api
		.get('/api/notes')
		.expect(200)
		// the following uses a Regular Expression
		// to match 'application/json'
		.expect('Content-Type', /application\/json/)
})

test('all dem notes returned, yo!', async () => {
	const response = await api.get('/api/notes')

	expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note from the returned notes', async () => {
	const response = await api.get('/api/notes')

	const contents = response.body.map(r => r.content)

	expect(contents).toContain('HTML is easy')

})

afterAll(() => {
	mongoose.connection.close()
})