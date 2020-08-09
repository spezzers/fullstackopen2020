const bloglistRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

bloglistRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

bloglistRouter.get('/:id', async (request, response) => {
	const id = request.params.id
	const blog = await Blog.findById(id)
	if (blog) {
		response.json(blog)
	} else {
		response
			.status(404)
			.send(`<h1>No blog entry found</h1><p>for id: ${id}</p>`)
	}
})

bloglistRouter.post('/', async (request, response) => {
	const body = request.body
	const token = request.token
	const decodedToken = token
		? jwt.verify(token, process.env.SECRET)
		: null
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)
	const blog = new Blog({
		...body,
		user: user,
		likes: body.likes || 0
	})
	if (blog.title !== undefined && blog.url !== undefined) {
		const savedBlog = await blog.save()
		response.status(201).json(savedBlog)
	} else {
		response.status(400).end()
	}
})

bloglistRouter.delete('/:id', async (request, response) => {
	const token = request.token
	const blogId = request.params.id
	const decodedToken = token
		? jwt.verify(token, process.env.SECRET)
		: null
	const user = await User.findById(decodedToken.id)
	console.log(`
user name: ${user.name}
blog id: ${blogId}`)
	const blog = await Blog.findById(blogId)
	if (!token || !decodedToken.id || blog.user.toString() !== user.id.toString()) {
		return response.status(401).json({error: 'token missing or invalid'})
	}
	
	await Blog.findByIdAndRemove(blogId)
	response.status(204).end()
})

bloglistRouter.put('/:id', async (request, response) => {
	const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
		new: true
	})
	response.json(result)
})

module.exports = bloglistRouter
