const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogListRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.mongoUrl)

mongoose
	.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch(error => {
		logger.error('error connection to MongoDB:', error.message)
	})

app.use(express.json())
app.use(cors())
app.use('/api/blogs', blogListRouter)

app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}/`)
})
