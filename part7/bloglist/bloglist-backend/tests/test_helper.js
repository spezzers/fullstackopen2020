const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const initialBlogList = [
	{
		_id: '5f113dc8cd737d08d839798e',
		title: 'A Blog Above Them All',
		author: 'Ego Willis',
		url: 'https://gogo.ego.com/blog/supreme-bloggin',
		likes: 0,
		user: '1f2aef99a560312908046756'
	},
	{
		_id: '5f113dc8cd737d08d839798f',
		title: 'The Day I Found My Cellphone',
		author: 'Gary "GadgetMon" Johnsson',
		url: 'http://www.gadgetmon.com/cellphone-love',
		likes: 17,
		user: '1f2aef99a560312908046756'
	},
	{
		_id: '1a113dc8cd737d08d81279ac',
		title: 'These Crabs Don\'t Bite',
		author: 'Fishmonger Freddy',
		url: 'https://fish.mongerFreddy.com/blog/crabs/these-crabs-dont-bite',
		likes: 3,
		user: '2f2aef99a560312908046717'
	},
	{
		_id: '99113dc8cd737d08d839ac3f',
		title: 'Crocodile Salad - The Only Meal You Need',
		author: 'Dr Laura Bowbender',
		url: 'https://blog.eatmorecrocs.com/blog/blog/blog/blog',
		likes: 0,
		user: '3f2acf99a567312f080487a7'
	},
	{
		_id: '71113dc8cd737d08d8397ae3',
		title: 'Dip, Dye and Fry',
		author: 'Daniel Brofather',
		url: 'https://www.danthetan.com/blog/dip-dye-fry',
		likes: 2,
		user: '3f2acf99a567312f080487a7'
	},
	{
		_id: '72113dc8cd737d08d83979fd',
		title: 'Hard Times, Soft Rhymes',
		author: 'Zara Sahara',
		url: 'https://blog.zahara.com/poetry/hard-times',
		likes: 7,
		user: '2f2aef99a560312908046717'
	},
	{
		_id: '29113dc8cd737d08d8397977',
		title: 'Freckles and Stars',
		author: 'Tina Chapples',
		url: 'http://blog.celebstyling.com/freckles-and-stars',
		likes: 17,
		user: '4f2aef99a560312908046738'
	},
	{
		_id: '5f113dc8cd737d08d8397990',
		title: 'How To Slay Like A Boss',
		author: 'Janet Shropshire-Dale, OBE',
		url: 'https://blog.businessbossness.com/slay-like-a-boss',
		likes: 22,
		user: '1f2aef99a560312908046756'
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
		_id: '1f2aef99a560312908046756',
		username: 'bobby90',
		name: 'Bob Dodd',
		password: 'totallybob',
		blogs: ['5f113dc8cd737d08d839798e', '5f113dc8cd737d08d839798f', '5f113dc8cd737d08d8397990']
	},
	{
		_id: '2f2aef99a560312908046717',
		username: 'nomoretinsel',
		name: 'Silvia Giffords',
		password: 'hashtaghound',
		blogs: ['1a113dc8cd737d08d81279ac', '72113dc8cd737d08d83979fd']
	},
	{
		_id: '3f2acf99a567312f080487a7',
		username: 'tommy',
		name: 'Tom Reynolds',
		password: 'password',
		blogs: ['99113dc8cd737d08d839ac3f', '71113dc8cd737d08d8397ae3']
	},
	{
		_id: '4f2aef99a560312908046738',
		username: 'shinypurplebee',
		name: 'Gideon Gallop',
		password: 'ilikepeas',
		blogs: ['29113dc8cd737d08d8397977']
	}
]

const superUser = {
	...initialUsers.find(user => user.username === 'root')[0],
	token: process.env.SUPERUSER_TOKEN
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
