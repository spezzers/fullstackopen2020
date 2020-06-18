const listHelper = require('../utils/list_helper')
const listWithOneBlog = [
	{
		title: 'The One & Only',
		author: 'Chesney Hawkes',
		url: 'https://www.youtube.com/watch?v=ZvMsp7s78Do',
		likes: 1
	}
]
const listOfBlogs = [
	{
		title: 'The Proper Way to Blog',
		author: 'Lizzy Hamlet',
		url: 'http://blog.lizzyhamlet.com/proper-way-to-blog',
		likes: 60
	},
	{
		title: 'Danish pasteries are the new cupcakes',
		author: 'Trevor Stevens',
		url: 'http://blog.cookoffanddine.com/opinion/danish-pastries-are-the-new-cupcakes',
		likes: 140
	},
	{
		title: 'This blog sucks',
		author: 'Anon',
		url: 'http://anon.myspace.com/2020/june/18_1342',
		likes: 0
	}

]
const tieForFave = [
	{
		title: 'The Proper Way to Blog',
		author: 'Lizzy Hamlet',
		url: 'http://blog.lizzyhamlet.com/proper-way-to-blog',
		likes: 60
	},
	{
		title: 'May Cupcakes Eternally Reign',
		author: 'Nadia Bakewell',
		url: 'http://blog.sweetharvestmoon.com/fact/cupcakes-forever',
		likes: 140
	},
	{
		title: 'Danish pasteries are the new cupcakes',
		author: 'Trevor Stevens',
		url: 'http://blog.cookoffanddine.com/opinion/danish-pastries-are-the-new-cupcakes',
		likes: 140
	},
	{
		title: 'This blog sucks',
		author: 'Anon',
		url: 'http://anon.myspace.com/2020/june/18_1342',
		likes: 0
	}
]


describe('Total Likes', () => {
	test('Total likes for all blog posts', () => {
		const result = listHelper.totalLikes(listOfBlogs)
		expect(result).toBe(200)
	})
	test('Only one blog in the list', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(1)
	})
})
describe('Favourite Blog', () => {
	test('Blog with most likes', () => {
		const result = listHelper.favouriteBlog(listOfBlogs)
		expect(result).toEqual(listOfBlogs[1])
	})
	test('Scenario: Tie for favourite blog', () => {
		const result = listHelper.favouriteBlog(tieForFave)
		expect(result).toEqual(tieForFave[1])
	})
})
