const logger = require('./utils/logger')
const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (request, response) => {
    response.send(`<h1>Bloglist</h1><a href='/api/blogs'>Blogs api</a>`)
})
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}/`)
})