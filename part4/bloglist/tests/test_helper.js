const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogList = [
	{
		id: '5f113dc8cd737d08d839798e',
		title: 'blogs_test',
		author: 'Full Stack Open part 0',
		url:
			'https://fullstackopen.com/en/part0',
		likes: 1,
		user: {}
	},
	{
		id: '5f113dc8cd737d08d839798f',
		title: 'Bloggus Testus',
		author: 'Full Stack Open part 1',
		url:
			'https://fullstackopen.com/en/part1',
		likes: 17,
		user: {}
	},
	{
		id: '5f113dc8cd737d08d8397990',
		title: 'Blogmon & Bobbin',
		author: 'Full Stack Open part 2',
		url:
			'https://fullstackopen.com/en/part2',
		likes: 56,
		user: {}
	}
]

const initialUsers = [
	{
		username: 'root',
		name: 'Superuser',
		password: 'supersecret',
		blogs: []
	},
	{
		username: 'bobby90',
		name: 'Bob Dodd',
		password: 'totallyrealbob',
		blogs: []
	},
	{
		username: 'nomoretinsel',
		name: 'Silvia Giffords',
		password: 'hashtaghound',
		blogs: []
	},
	{
		username: 'shinypurplebee',
		name: 'Gideon Gallop',
		password: 'ilikepeas',
		blogs: []
	}
]

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogList,
	initialUsers,
	blogsInDb,
	usersInDb
}
