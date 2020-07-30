const logger = require('./logger')

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'Unkonwn Endpoint' })
}

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:', request.path)
	logger.info('Body:', request.body)
	logger.info('------')
	next(response)
}

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		response.status(400).send({ error: 'malformatted id' })
	}
	if (error.name === 'ValidationError') {
		response
			.status(400)
			.send({ error: 'user details do not meet minimum requirememnts' })
	}
	next(error)
}
module.exports = {
	errorHandler,
	unknownEndpoint,
	requestLogger
}
