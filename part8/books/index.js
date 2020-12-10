const config = require('./utils/config')
const mongoose = require('mongoose')
const { server } = require('./app')


if (process.env.NODE_ENV !== 'test') {
	console.log(`
====  NODE_ENV: ${process.env.NODE_ENV}  ====
connecting to ${config.MONGODB_URI}`)
}

mongoose.set('debug', true),
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

server.listen().then(({ url, subscriptionsUrl }) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(`Server ready at ${url}`)
		console.log(`Subscriptions ready at ${subscriptionsUrl}`)
	}
})
