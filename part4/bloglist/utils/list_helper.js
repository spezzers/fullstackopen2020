const _ = require('lodash')
// const logger = require('./logger')

const dummy = () => {
	// console.log('dummy:', blogs)
	return 1
}

const totalLikes = blogs => {
	const total = blogs
		.map(post => post.likes)
		.reduce((sum, likes) => sum + likes)
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
			return {
				author: key,
				blogCount: value
			}
		})
		.value()
	const top = _.chain(tally).maxBy('blogCount').value()
	// logger.mostBlogs(tally, top)
	return top
}

const mostLikes = blogs => {
	const tally = _.chain(blogs)
		.map(blog => {
			const result = [
				blog.author,
				blog.likes
			]
			return result
		})
		//  [
		// 		[ 'Michael Chan', 7 ],
		// 		[ 'Edsger W. Dijkstra', 5 ],
		// 		[ 'Edsger W. Dijkstra', 12 ],
		// 		[ 'Robert C. Martin', 10 ],
		// 		[ 'Robert C. Martin', 0 ],
		// 		[ 'Robert C. Martin', 2 ]
		//  ]

		.reduce((blogs, blog) => {
			blogs[blog[0]] = blogs[blog[0]] || 0
			blogs[blog[0]] += blog[1]
			return blogs
		}, {})
		.map((value, key) => {
			const blogger = {
				author: key,
				likes: value
			}
			return blogger
		})
		.maxBy('likes')
		.value()
	return tally
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
}
