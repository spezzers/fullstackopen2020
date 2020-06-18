const totalLikes = blogs => {
	const total = blogs.map(post => post.likes).reduce((sum, likes) => sum + likes)
	return total
}

const favouriteBlog = blogs => {
	const highestLikes = Math.max(...blogs.map(blog => blog.likes))
	const fave = blogs.filter(blog => blog.likes === highestLikes)[0]
	return fave
}

module.exports = {
	totalLikes,
	favouriteBlog
}
