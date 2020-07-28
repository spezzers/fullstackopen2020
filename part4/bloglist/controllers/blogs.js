const bloglistRouter = require('express').Router()
const Blog = require('../models/Blog')

bloglistRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

bloglistRouter.get('/:id', (request, response, next) => {
	const id = request.params.id
	Blog.findById(id)
		.then(blog => {
			if (blog) {
				response.json(blog)
			} 
			else {response.status(404).send(`<h1>No blog entry found</h1><p>for id: ${id}</p>`)}
		})
		.catch(error => next(error))
})

bloglistRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	if (blog.title !== undefined && blog.url !== undefined) {
		blog.save().then(result => {
			response.status(201).json(result)
		})
	} else {
		response.status(400).end()
	}
})

bloglistRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

bloglistRouter.put('/:id', async (request, response) => {
	const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
		new: true
	})
	response.json(result)
})

module.exports = bloglistRouter
