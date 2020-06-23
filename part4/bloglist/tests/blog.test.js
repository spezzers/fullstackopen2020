const listHelper = require('../utils/list_helper')

const blogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url:
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url:
			'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url:
			'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
]
const listWithOneBlog = [
	{
		_id: '5a422bc61b54a676234d17a9',
		title: 'The One & Only',
		author: 'Chesney Hawkes',
		url: 'https://www.youtube.com/watch?v=ZvMsp7s78Do',
		likes: 1,
		__v: 0
	}
]
const listOfBlogs = [
	{
		_id: '5a422bc61b54a676234d17a5',
		title: 'The Proper Way to Blog',
		author: 'Lizzy Hamlet',
		url: 'http://blog.lizzyhamlet.com/proper-way-to-blog',
		likes: 60,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17d3',
		title: 'Danish pasteries are the new cupcakes',
		author: 'Trevor Stevens',
		url:
			'http://blog.cookoffanddine.com/opinion/danish-pastries-are-the-new-cupcakes',
		likes: 140,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17b1',
		title: 'This blog sucks',
		author: 'Anon',
		url: 'http://anon.myspace.com/2020/june/18_1342',
		likes: 0,
		__v: 0
	}
]
const tieForFave = [
	{
		_id: '5a422bc61b54a676234d16c6',
		title: 'The Proper Way to Blog',
		author: 'Lizzy Hamlet',
		url: 'http://blog.lizzyhamlet.com/proper-way-to-blog',
		likes: 60,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d12cd',
		title: 'May Cupcakes Eternally Reign',
		author: 'Nadia Bakewell',
		url: 'http://blog.sweetharvestmoon.com/fact/cupcakes-forever',
		likes: 140,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d1ff2',
		title: 'Danish pasteries are the new cupcakes',
		author: 'Trevor Stevens',
		url:
			'http://blog.cookoffanddine.com/opinion/danish-pastries-are-the-new-cupcakes',
		likes: 140,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d1a1f',
		title: 'This blog sucks',
		author: 'Anon',
		url: 'http://anon.myspace.com/2020/june/18_1342',
		likes: 0,
		__v: 0
	}
]

describe('4.3 Dummy test', () => {
	test('dummy returns one', () => {
		const blogs = []

		const result = listHelper.dummy(blogs)
		expect(result).toBe(1)
	})
})

describe('4.4. - Total Likes', () => {
	test('Total likes for all blog posts', () => {
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(36)
	})
	test('Only one blog in the list', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(1)
	})
})
describe('4.5 - Favourite Blog', () => {
	test('Blog with most likes', () => {
		const result = listHelper.favouriteBlog(listOfBlogs)
		expect(result).toEqual(listOfBlogs[1])
	})
	test('Scenario: Tie for favourite blog', () => {
		const result = listHelper.favouriteBlog(tieForFave)
		expect(result).toEqual(tieForFave[1])
	})
})
describe('4.6 - Author with the most blogs', () => {
	test('blogs the most', () => {
		const result = listHelper.mostBlogs(blogs)
		const expected = { author: 'Robert C. Martin', blogCount: 3 }
		expect(result).toStrictEqual(expected)
	})
})
describe('4.7 - Author with the most likes', () => {
	test('The most popular author', () => {
		const result = listHelper.mostLikes(blogs)
		expect(result).toStrictEqual(1)
	})
})
