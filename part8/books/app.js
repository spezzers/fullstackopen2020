const config = require('./utils/config')
const bcrypt = require('bcrypt')
const { v1: uuid } = require('uuid')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const {
	ApolloServer,
	gql,
	UserInputError,
	AuthenticationError,
	PubSub
} = require('apollo-server')

const pubsub = new PubSub()
const JWT_SECRET = config.JWT_SECRET

///////////////////////////////////////////   TYPE DEFINITIONS
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
		getBooks(genre: String): [Book]!
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
	type Subscription {
		bookAdded: Book!
	}
`
///////////////////////////////////////////////////   RESOLVERS
const resolvers = {
	Query: { //---------------------------------------------- Query
		bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			let bookList = await Book.find({}).populate('author')
			return bookList
		},
		getBooks: async (root, args) => {
			const filter = args.genre ? {genres: args.genre} : {}
			const bookList = await Book.find(filter).populate('author')
			return bookList
		},
		allAuthors: async () => await Author.find({}),
		me: async (root, args, context) => {
			if(context.currentUser) {
				return context.currentUser
			}
		}
	},
	Author: { //------------------------------------------- Author
		bookCount: async root => {
			const result = await Book.find({ author: root.id })
			return result.length
		}
	},

	Mutation: { //-------------------------------------- Mutations
		addBook: async (root, args, context) => {
			if (!context.currentUser) {
				throw new AuthenticationError('permission denied')
			}
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
				pubsub.publish('BOOK_ADDED', {bookAdded: result })
				return result
			} catch (error) {
				throw new UserInputError(error.message)
			}
		},
		editAuthor: async (root, args, context) => {
			if (!context.currentUser) {
				throw new AuthenticationError('permission denied')
			}
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
		},
		createUser: async (root, args) => {
			const hash = await bcrypt.hash('wordpass', 10)
			const newUser = new User({
				...args,
				passwordHash: hash
			})
			try {
				const savedUser = await newUser.save()
				console.log('SAVED:', savedUser.username)
				return savedUser
			} catch (error) {
				console.log(error.message)
				return error
			}
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })
			const passwordCorrect =
				user === null
					? false
					: await bcrypt.compare(args.password, user.passwordHash)

			if (!(user && passwordCorrect)) {
				throw new UserInputError('wrong credentials')
			}
			const userForToken = {
				username: user.username,
				id: user._id
			}
			try {
				const token = { value: jwt.sign(userForToken, JWT_SECRET) }
				console.log(`'${args.username}' has logged in`)
				return token
			} catch (error) {
				console.log(error.message)
				return error
			}
		}
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.toLowerCase().startsWith('bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
			const currentUser = await User.findById(decodedToken.id)
			return { currentUser }
		}
	}
})

module.exports = {
	server
}
