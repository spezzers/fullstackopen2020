const Blog = require('../models/Blog')

const initialBlogList = [
	{
		title: 'blogs_test',
		author: 'Full Stack Open part 4',
		url:
			'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
		likes: 1
	},
	{
		title: 'Bloggus Testus',
		author: 'Full Stack Open part 4',
		url:
			'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
		likes: 17
	},
	{
		title: 'Blogmon & Bobbin',
		author: 'Full Stack Open part 4',
		url:
			'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
		likes: 56
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogList,
	blogsInDb
}
