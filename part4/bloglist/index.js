const logger = require('./utils/logger')
const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')
const blogListRouter = require('./controllers/blogs')

logger.info('connecting to', config.mongoUrl)



mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connection to MongoDB:', error.message)
})

app.use('/api/blogs', blogListRouter)


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}/`)
})