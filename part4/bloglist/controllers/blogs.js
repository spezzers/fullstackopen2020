const bloglistRouter = require('express').Router()
const Blog = require('../models/Blog')

bloglistRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

bloglistRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog.save().then(result => {
		response.status(201).json(result)
	})
})

module.exports = bloglistRouter
