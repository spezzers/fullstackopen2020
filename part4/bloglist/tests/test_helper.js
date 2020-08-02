const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogList = [
	{
		id: '5f113dc8cd737d08d839798e',
		title: 'blogs_test',
		author: 'Full Stack Open part 4',
		url:
			'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
		likes: 1
	},
	{
		id: '5f113dc8cd737d08d839798f',
		title: 'Bloggus Testus',
		author: 'Full Stack Open part 4',
		url:
			'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
		likes: 17
	},
	{
		id: '5f113dc8cd737d08d8397990',
		title: 'Blogmon & Bobbin',
		author: 'Full Stack Open part 4',
		url:
			'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
		likes: 56
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
