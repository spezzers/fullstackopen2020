const config = require('./utils/config')
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Author = require('./models/Author')
const Book = require('./models/Book')

if (process.env.NODE_ENV !== 'test') {
	console.log('connecting to', config.MONGODB_URI)
}

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => {
		if (process.env.NODE_ENV !== 'test') {
			console.log('connected to MongoDB')
		}
	})
	.catch(error => {
		console.log('error connecting to MongoDB:', error.message)
	})

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
	type Author {
		name: String!
		born: String
		id: ID!
		bookCount: Int
	}
	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}
	type Query {
		bookCount(author: String): Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}
	type Mutation {
		addBook(
			title: String!
			author: String!
			genres: [String]
			published: Int!
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
	}
`

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		// allBooks: async () => await Book.find({}).populate('author'),
		allBooks: async (root, args) => {
			let bookList = await Book.find({}).populate('author')
			// if (args.author) {
			// 	bookList = bookList.filter(b => b.author === args.author)
			// }
			// if (args.genre) {
			// 	bookList = bookList.filter(b => b.genres.includes(args.genre))
			// }
			return bookList
		},
		allAuthors: async () => await Author.find({})
	},
	Author: {
		bookCount: async root => {
			const result = await Book.find({ author: root.id })
			return result.length
		}
	},
	Mutation: {
		addBook: async (root, args) => {
			console.log(args)
			if (books.find(b => b.title === args.title)) {
				throw new UserInputError('This title already exists', {
					invalidArgs: args.title
				})
			}
			const existingAuthor = await Author.findOne({ name: args.author })

			const newAuthor = new Author({
				name: args.author,
				id: uuid()
			})
			let newBookAuthor

			existingAuthor
				? newBookAuthor = existingAuthor
				: newBookAuthor = await newAuthor.save()

			const newBook = new Book({
				...args,
				id: uuid(),
				author: newBookAuthor
			})

			try {
				const result = await newBook.save()
				return result.data
			} catch (error) {
				throw new UserInputError(error.message)
			}
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({name: args.name})
			if (!author) {
				return null
			}
			if (args.setBornTo.toString().length < 4) {
				throw new UserInputError('birth year should be 4 digits long')
			}
			const updatedAuthor = {
				...author._doc,
				born: args.setBornTo
			}
			try {
				return await Author.findByIdAndUpdate(author.id, updatedAuthor, {new: true})
			} catch (error) {
				throw new UserInputError(error.message)
			}
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.listen().then(({ url }) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(`Server ready at ${url}`)
	}
})
