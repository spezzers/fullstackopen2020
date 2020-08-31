const mongoose = require('mongoose')
const uniquieValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: {
		type: String,
		unique: true
	},
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		// returnedObject.likes = returnedObject.likes || 0
		delete returnedObject._id
		delete returnedObject.__v
	}
})
blogSchema.plugin(uniquieValidator)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
