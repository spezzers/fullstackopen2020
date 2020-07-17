require('dotenv').config()

let mongoUrl = process.env.MONGODB_URI
const PORT = process.env.PORT || 3003

if (process.env.NODE_ENV === 'test') {
	mongoUrl = process.env.TEST_MONGODB_URI
}

module.exports = {
	mongoUrl,
	PORT
}
