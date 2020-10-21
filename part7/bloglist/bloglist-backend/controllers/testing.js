const router = require('express').Router()
const User = require('../models/User')
const Blog = require('../models/Blog')
const logger = require('../utils/logger')

router.post('/reset', async (request, response) => {
	await Blog.deleteMany({})
	await User.deleteMany({})
	
	response.status(204).end()
	logger.info('Database has been reset')
})

module.exports = router