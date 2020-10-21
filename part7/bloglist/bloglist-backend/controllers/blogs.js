const bloglistRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const Comment = require('../models/Comment')
const jwt = require('jsonwebtoken')

// ---------------------  GET ALL BLOGS ---------------------------
bloglistRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })
		.populate('comments', {content: 1, date: 1})
	response.json(blogs)
})

// ---------------------  GET SPECIFIC BLOG  ----------------------
bloglistRouter.get('/:id', async (request, response) => {
	const id = request.params.id
	const blog = await Blog
		.findById(id)
		.populate('user', { username: 1, name: 1 })
		.populate('comments', {content: 1, date: 1})
	if (blog) {
		response.json(blog)
	} else {
		response
			.status(404)
			.send(`<h1>No blog entry found</h1><p>for id: ${id}</p>`)
	}
})

// -----------------  GET SPECIFIC BLOG KEY VALUES  ------------------
bloglistRouter.get('/:id/:key', async (request, response) => {
	const id = request.params.id
	const key = request.params.key
	const blog = await Blog.findById(id)
	if (blog) {
		response.json(blog[key])
	} else {
		response.status(404).send({ error: 'unknown endpoint' })
	}
})

// -------------------  POST COMMENT ON BLOG  --------------------
bloglistRouter.post('/:id/comments', async (request, response) => {
	const id = request.params.id
	const body = request.body
	const blog = await Blog.findById(id)
	if (blog) {
		const comment = new Comment({
			...body,
			blog: blog.id,
			date: Date.now()
		})
		const savedComment = await comment.save()
		blog.comments = blog.comments.concat(savedComment._id)
		blog.save()
		response.status(201).json(savedComment)
	} else {
		response.status(404).send('failed to post comment')
	}
})

// ---------------------- POST NEW BLOG ------------------------
bloglistRouter.post('/', async (request, response) => {
	const body = request.body
	const token = request.headers.authorization.slice(7)
	const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)
	const blog = new Blog({
		...body,
		user: user,
		likes: body.likes || 0
	})
	if (user !== null) {
		if (blog.title !== undefined && blog.url !== undefined) {
			const savedBlog = await blog.save()
			user.blogs = user.blogs.concat(savedBlog._id)
			await user.save()
			response.status(201).json(savedBlog)
		} else {
			response.status(400).end()
		}
	} else {
		response.status(401).end()
	}
})

// ---------------------- DELETE A BLOG ----------------------------
bloglistRouter.delete('/:id', async (request, response) => {
	const token = request.token
	const blogId = request.params.id
	const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null
	const user = await User.findById(decodedToken.id)
	const blog = await Blog.findById(blogId)
	if (
		!token ||
		!decodedToken.id ||
		blog.user.toString() !== user.id.toString()
	) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	await Blog.findByIdAndRemove(blogId)
	response.status(204).end()
})

// ---------------------- MODIFY A BLOG ---------------------------
bloglistRouter.put('/:id', async (request, response) => {
	const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
		new: true
	})
	response.json(result)
})

module.exports = bloglistRouter
