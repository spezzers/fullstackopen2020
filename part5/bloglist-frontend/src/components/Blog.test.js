import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('5.13', () => {
	const blog = {
		title: 'This is just a test',
		author: 'Jester Bester',
		url: 'https://www.happyholidays.com'
	}

	test('renders content', () => {
		const component = render(<Blog blog={blog}></Blog>)
		expect(component.container).toHaveTextContent(
			`${blog.title} - ${blog.author}`
		)
	})

	test('details initially hidden', () => {
		const component = render(<Blog blog={blog}></Blog>)
		const toggle = component.container.querySelector('.toggle')
		expect(toggle).toHaveStyle('display: none')
	})
})
