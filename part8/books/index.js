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

const typeDefs = gql`
	type User {
		username: String!
		favouriteGenre: String!
		id: ID!
	}
	type Token {
		value: String!
	}
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
		me: User
	}
	type Mutation {
		addBook(
			title: String!
			author: String!
			genres: [String]
			published: Int!
		): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favouriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`

const resolvers = {
	Query: {
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			let bookList = await Book.find({}).populate('author')
			// const authors = await Author.find({})
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
			console.log(
				JSON.stringify(
					{
						Mutation: {
							addBook: args
						}
					},
					null,
					2
				)
			)
			const books = await Book.find({})
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
				? (newBookAuthor = existingAuthor)
				: (newBookAuthor = await newAuthor.save())

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
			const author = await Author.findOne({ name: args.name })
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
				return await Author.findByIdAndUpdate(author.id, updatedAuthor, {
					new: true
				})
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
