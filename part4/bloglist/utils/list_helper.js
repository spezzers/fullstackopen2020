const _ = require('lodash')
// const logger = require('./logger')

const dummy = () => {
	// console.log('dummy:', blogs)
	return 1
}

const totalLikes = blogs => {
	const total = blogs.map(post => post.likes).reduce((sum, likes) => sum + likes)
	return total
}

const favouriteBlog = blogs => {
	const highestLikes = Math.max(...blogs.map(blog => blog.likes))
	const fave = blogs.filter(blog => blog.likes === highestLikes)[0]
	return fave
}

const mostBlogs = blogs => {
	const tally = _.chain(blogs)
		.countBy('author')
		.map((value, key) => {
			return (
				{
					author: key,
					blogCount: value
				}
			)
		})
		.value()
	const top = _.chain(tally)
		.maxBy('blogCount')
		.value()
	// logger.mostBlogs(tally, top)
	return (
		top
	)
}

const mostLikes = blogs => {
	const tally = _.map(blogs, (blog) =>{
		const result = {
			'author': blog.author,
			'likes': blog.likes
		}
		return result
	})
	console.log(tally)
	return 1
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
}
