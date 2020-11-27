const Author = require('../models/Author')
const Book = require('../models/Book')

const initAuthors = [
	{
		name: 'Robert Martin',
		_id: '5fbe3a875ba9df51c0e5c4db',
		born: 1952
	},
	{
		name: 'Martin Fowler',
		_id: '5fbe3a875ba9df51c0e5c4dc',
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		_id: '5fbe3ba74c0434849e302349',
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		_id: '5fbe3bbbbea099a433f5d552'
	},
	{
		name: 'Sandi Metz', // birthyear not known
		_id: '5fbe3bc2a1a695ade712766d'
	}
]

const initBooks = [
	{
		title: 'Clean Code',
		published: 2008,
		author: '5fbe3a875ba9df51c0e5c4db',
		_id: '5fbe3b5dac072968621c5d66',
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: '5fbe3a875ba9df51c0e5c4db',
		_id: '5fbe3b6b9d947887890bc41b',
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: '5fbe3a875ba9df51c0e5c4dc',
		_id: '5fbe3b75c4b5e30cf07cba42',
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: '5fbe3bbbbea099a433f5d552',
		_id: '5fbe3b7b9511228f5797c360',
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: '5fbe3bc2a1a695ade712766d',
		_id: '5fbe3b81ed7c9a70d0c7e92f',
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: '5fbe3ba74c0434849e302349',
		_id: '5fbe3b8e33ad035f2af7279c',
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: '5fbe3ba74c0434849e302349',
		_id: '5fbe3b9368586badfbc89696',
		genres: ['classic', 'revolution']
	}
]

const initUsers = [
	{
		username: 'RootUser',
		password: 'wordpass',
		favouriteGenre: 'code'
	}
]

module.exports = {
	initBooks,
	initAuthors,
	initUsers
}