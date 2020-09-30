import { useState, useEffect } from 'react'

export const useCountry = name => {
	const [country, setCountry] = useState(null)

	// useEffect()

	return country
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
