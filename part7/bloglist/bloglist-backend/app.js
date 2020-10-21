const express = require('express')
require('express-async-errors')
const app = express()
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogListRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const cors = require('cors')
const config = require('./utils/config')

app.use(express.json())

logger.info('connecting to', config.mongoUrl)

mongoose
	.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch(error => {
		logger.error('error connection to MongoDB:', error.message)
	})

app.use(cors())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use('/api/blogs', blogListRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
	const testRouter = require('./controllers/testing')
	app.use('/api/testing', testRouter)
	console.log('Testing router enabled - `logger.info()` is disabled')
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
