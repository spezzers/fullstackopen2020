require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
const PORT = 3003

module.exports = {
    mongoUrl,
    PORT
}