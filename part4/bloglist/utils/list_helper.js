const dummy = (blogs) => {
	return 1
}

const totalLikes = blogs => {
	const total = blogs.map(post => post.likes).reduce((sum, likes) => sum + likes)
	return total
}

module.exports = {
	dummy,
	totalLikes
}
