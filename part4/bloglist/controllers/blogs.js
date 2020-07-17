const bloglistRouter = require('express').Router()
const Blog = require('../models/Blog')

bloglistRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

bloglistRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)
	console.log(blog.author, blog.title)
	if(blog.title !== undefined && blog.url !== undefined) {
		blog.save().then(result => {
			response.status(201).json(result)
		})
	}
	else {response.status(400).end()}
})

bloglistRouter
	.delete('/:id', async (request, response) => {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	})

module.exports = bloglistRouter
