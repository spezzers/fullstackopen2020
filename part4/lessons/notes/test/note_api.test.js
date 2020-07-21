const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
	await Note.deleteMany({})
	// console.log('DB cleared')
	const noteObjects = helper.initialNotes.map(note => new Note(note))
	const promisArray = noteObjects.map(note => note.save())
	await Promise.all(promisArray)
	// console.log('done')
})

test('notes are returned as json', async () => {
	await api
		.get('/api/notes')
		.expect(200)
		// the following uses a Regular Expression
		// to match 'application/json'
		.expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
	const response = await api.get('/api/notes')

	expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
	const response = await api.get('/api/notes')

	const contents = response.body.map(r => r.content)

	expect(contents).toContain('Browser can execute only Javascript')
})

test('a valid note can be added', async () => {
	const newNote = {
		content: 'asinc/await simplifies making async calls',
		important: true
	}
	await api
		.post('/api/notes')
		.send(newNote)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const notesAtEnd = await helper.notesInDb()
	expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
	const contents = notesAtEnd.map(n => n.content)

	expect(contents).toContain('asinc/await simplifies making async calls')
})

test('note without content is not added', async () => {
	const newNote = {
		important: true
	}

	await api.post('/api/notes').send(newNote).expect(400)

	const notesAtEnd = await helper.notesInDb()

	expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
	const notesAtStart = await helper.notesInDb()
	const noteToView = notesAtStart[0]
	const resultNote = await api
		.get(`/api/notes/${noteToView.id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)
	expect(resultNote.body).toEqual(noteToView)
})

test('a note can be deleted', async () => {
	const notesAtStart = await helper.notesInDb()
	const noteToDelete = notesAtStart[0]

	await api.delete(`/api/notes/${noteToDelete.id}`)

	const notesAtEnd = await helper.notesInDb()

	expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
	const contents = notesAtEnd.map(r => r.content)
	expect(contents).not.toContain(noteToDelete.content)
})

describe.only('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
