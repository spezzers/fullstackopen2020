import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
	title: 'This is just a test',
	author: 'Jester Bester',
	url: 'https://www.happyholidays.com',
	likes: 21,
	user: 'Peter'
}

describe('5.13', () => {
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
describe('5.14', () => {
	test.only('5.14 - URL and Likes are shown on button click', () => {

		const component = render(<Blog blog={blog}></Blog>)

		const button = component.container.querySelector('.toggleButton')
		const toggle = component.container.querySelector('.toggle')

		fireEvent.click(button)

		expect(toggle).not.toHaveStyle('display: none')
		expect(toggle.querySelector('.url'))
		expect(toggle.querySelector('.likes'))
	})
})
