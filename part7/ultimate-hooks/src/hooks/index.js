import React, { useState } from 'react'

export const useResource = baseUrl => {
	const [resources, setResources] = useState([])

	// ...

	const create = resource => {
		// ...
	}

	const service = {
		create
	}

	return [resources, service]
}

export const useField = type => {
	const [value, setValue] = useState('')

	const onChange = event => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}
