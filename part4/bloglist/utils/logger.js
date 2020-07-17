const info = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params)
	}
}

const mostBlogs = (tally, top) => {
	console.log(
		`Number of blogs by Author: \n${JSON.stringify(tally, null, 4)},
Author with most blogs: ${JSON.stringify(top, null, 4)}`
	)
}

module.exports = {
	info,
	mostBlogs
}
