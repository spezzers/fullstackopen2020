const { ApolloServer, gql, UserInputError } = require('apollo-server')
const _ = require('lodash')
const { v1: uuid } = require('uuid')

let authors = [
	{
		name: 'Robert Martin',
		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
		born: 1952
	},
	{
		name: 'Martin Fowler',
		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
	}
]

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'revolution']
	}
]

const typeDefs = gql`
	type Person {
		name: String!
		born: String
		id: ID!
		bookCount: Int
	}
	type Book {
		title: String!
		author: String!
		id: ID!
		genres: [String]
		published: Int!
	}
	type Query {
		bookCount(author: String): Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Person!]!
	}
	type Mutation {
		addBook(
			title: String!
			author: String!
			genres: [String]
			published: Int!
		): Book,
		editAuthor(
			name: String
			setBornTo: Int
		): Person
	}
`

const resolvers = {
	Query: {
		bookCount: () => books.length,
		authorCount: () => authors.length,
		allBooks: (root, args) => {
			let bookList = books
			if (args.author) {
				bookList = bookList.filter(b => b.author === args.author)
			}
			if (args.genre) {
				bookList = bookList.filter(b => b.genres.includes(args.genre))
			}
			return bookList
		},
		allAuthors: () => authors
	},
	Person: {
		bookCount: root => books.filter(b => b.author === root.name).length
	},
	Mutation: {
		addBook: (root, args) => {
			if (books.find(b => b.title === args.title)) {
				throw new UserInputError('This title already exists', {
					invalidArgs: args.title
				})
			}
			const newBook = { ...args, id: uuid() }
			const knownAuthors = authors.map(a => a.name)
			if (!knownAuthors.includes(args.author)) {
				const newAuthor = {
					name: args.author
				}
				authors = [...authors, newAuthor]
			}
			books = [...books, newBook]
			return newBook
		},
		editAuthor: (root, args) => {
			const author = authors.find(a => a.name === args.name)
			if(!author) {
				return null
			}
			const updatedAuthor = {
				...author,
				born: args.setBornTo
			}
			return updatedAuthor
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})