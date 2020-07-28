const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogListRouter = require('./controllers/blogs')
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
app.use('/api/blogs', blogListRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

module.exports = app
