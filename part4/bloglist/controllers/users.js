const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
	const body = request.body

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
		blogs: body.blogs || []
	})
	if (body.password.length < 3) {
		return response
			.status(400)
			.json({ error: 'password must be at least 3 characters' })
	}

	const savedUser = await user.save()

	response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', {likes: 0, user: 0})
	response.json(users)
})
module.exports = usersRouter
