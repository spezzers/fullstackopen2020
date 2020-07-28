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
	// This still needs work
	logger.info('An error occured', error.message)
	next()
}
module.exports = {
	errorHandler,
	unknownEndpoint,
	requestLogger
}
