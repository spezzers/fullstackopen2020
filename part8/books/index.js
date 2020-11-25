const config = require('./utils/config')
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const { typeDefs, resolvers } = require('./app')

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

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.listen().then(({ url }) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(`Server ready at ${url}`)
	}
})
