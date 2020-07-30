const bcrypt = require('bcryptjs')
const User = require('../models/User')
const test_helper = require('./test_helper')

describe('Initial test setup', () => {
	test('1 + 2 = 3', async () => {
		const simpleSum = 1 + 2
		expect(simpleSum).toEqual(3)
	})
})

describe('4.15 - Create new user with HTTP Post', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const passwordHash = await bcrypt.hash('mysterious', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})
	test('successfully created a new user', async () => {
		const usersAtStart = await test_helper.initialUsers
		console.log(usersAtStart)
	})
})
