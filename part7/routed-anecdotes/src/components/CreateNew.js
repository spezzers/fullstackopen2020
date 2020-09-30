import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = props => {

	const author = useField('text', 'author')
	const content = useField('text', 'content')
	const info = useField('text', 'info')
	const reset = useField([author, content, info])

	const history = useHistory()

	const handleSubmit = e => {
		e.preventDefault()
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})
		props.notify(`New anecdote added: '${content}'`, 10000)
		history.push('/anecdotes')
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button type='submit'>create</button>
				<button {...reset} >reset</button>
			</form>
		</div>
	)
}

export default CreateNew
