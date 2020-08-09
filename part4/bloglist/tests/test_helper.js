const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const initialBlogList = [
	{
		_id: '5f113dc8cd737d08d839798e',
		title: 'blogs_testies',
		author: 'Full Stack Open part 0',
		url: 'https://fullstackopen.com/en/part0',
		likes: 1,
		user: '5f2aef99a560312908046798'
	},
	{
		_id: '5f113dc8cd737d08d839798f',
		title: 'Bloggus Testus',
		author: 'Full Stack Open part 1',
		url: 'https://fullstackopen.com/en/part1',
		likes: 17,
		user: '5f2aef99a560312908046797'
	},
	{
		_id: '5f113dc8cd737d08d8397990',
		title: 'Blogmon & Bobbin',
		author: 'Full Stack Open part 2',
		url: 'https://fullstackopen.com/en/part2',
		likes: 56,
		user: '5f2aef99a560312908046796'
	}
]

const initialUsers = [
	{
		_id: 'ffffffffffffffffffffffff',
		username: 'root',
		name: 'Superuser',
		password: 'supersecret',
		blogs: []
	},
	{
		_id: '5f2aef99a560312908046796',
		username: 'bobby90',
		name: 'Bob Dodd',
		password: 'totallyrealbob',
		blogs: ['5f113dc8cd737d08d8397990']
	},
	{
		_id: '5f2aef99a560312908046797',
		username: 'nomoretinsel',
		name: 'Silvia Giffords',
		password: 'hashtaghound',
		blogs: ['5f113dc8cd737d08d839798f']
	},
	{
		_id: '5f2aef99a560312908046798',
		username: 'shinypurplebee',
		name: 'Gideon Gallop',
		password: 'ilikepeas',
		blogs: ['5f113dc8cd737d08d839798e']
	}
]

const superUser = {
	...initialUsers[0],
	token: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6ImZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZiIsImlhdCI6MTU5Njk2NjQ0OX0.sFjrlTuuVQcuZyERaCAWODhYOm9xdGkfdpsOCH528DI'
}

const getUserToken = async (userid) => {
	const user = initialUsers.filter(user => user._id === userid)[0]
	const loginDeets = {
		username: user.username,
		password: user.password
	}
	const response = await api
		.post('/api/login')
		.send(loginDeets)
	return `bearer ${response.body.token}`

}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const addUser = async (user) => {
	const hash = await bcrypt.hash(user.password, 10)
	const newUser = new User({
		blogs: user.blogs || [],
		username: user.username,
		name: user.name,
		passwordHash: hash,
		_id: user._id
	})
	return newUser
}

module.exports = {
	initialBlogList,
	initialUsers,
	blogsInDb,
	usersInDb,
	addUser, 
	superUser,
	getUserToken
}
