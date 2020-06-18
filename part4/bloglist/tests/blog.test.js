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
		likes: 140
	}

]
describe('Dummy Test', () => {
	test('dummy returns one', () => {
		const result = listHelper.dummy(listOfBlogs)
		expect(result).toBe(1)
	})
})

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
