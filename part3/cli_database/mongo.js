const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-9okg0.mongodb.net/persons?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person)
		})
		mongoose.connection.close()
	})
} else if (process.argv.length === 5) {
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4]
	})
	person.save().then(result => {
		console.log(`${result.name} saved to phonebook`)
		mongoose.connection.close()
	})
} else {
	console.log(`Error passing arguments`)
	console.log(`To add contact: node mongo.js <password> <name> <number>`)
	console.log(`To get all contacts: node mongo.js <password>`)
	process.exit(1)
}
