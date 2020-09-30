import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = props => {
	// const [content, setContent] = useState('')
	// const [author, setAuthor] = useState('')
	// const [info, setInfo] = useState('')

	const author = useField('text')
	const content = useField('text')
	const info = useField('url')

	const history = useHistory()

	const handleSubmit = e => {
		e.preventDefault()
		props.addNew({
			content: content.value,
			author: author.value,
			infor: info.value,
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
					<input name='content' {...content} />
				</div>
				<div>
					author
					<input name='author' {...author} />
				</div>
				<div>
					url for more info
					<input name='info' {...info} />
				</div>
				<button>create</button>
			</form>
		</div>
	)
}

export default CreateNew
