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

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	authorization && authorization.toLowerCase().startsWith('bearer ')
		? request.token = authorization.substring(7)
		: request.token = null
	next()
}

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		response.status(400).send({ error: 'malformatted id' })
	}
	if (error.name === 'ValidationError') {
		response.status(400).send(error.message)
	}
	if (error.name === 'TypeError' && request.method === 'DELETE') {
		response.status(404).send({error: 'Nothing to delete, the item does not exist'})
	}
	next(error)
}
module.exports = {
	errorHandler,
	unknownEndpoint,
	requestLogger, tokenExtractor
}
