import { useEffect, useState } from 'react'
import axios from 'axios'


export const useResource = baseUrl => {
	const [resources, setResources] = useState([])

	useEffect(() => {
        axios
            .get(baseUrl)
            .then(response => {
                setResources(response.data)
            })
    },[baseUrl])

	const create = resource => {
        axios
            .post(baseUrl, resource)
            .then(response => {
                setResources([...resources, response.data])
            })
	}

	const service = {
		create
	}

	return [resources, service]
}

export const useField = type => {
	const [value, setValue] = useState('')

	const onChange = event => {
        event.type === 'change'
            ? setValue(event.target.value)
            : setValue('')
	}

	return {
		type,
		value,
		onChange
	}
}
