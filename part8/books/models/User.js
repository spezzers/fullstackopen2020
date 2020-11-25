const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: 3
	},
	favouriteGenre: {
		type: String,
		required: true
	},
	passwordHash: {
		type: String,
		required: true
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User