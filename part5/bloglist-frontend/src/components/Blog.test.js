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
	test('URL and Likes are shown on button click', () => {
		const component = render(<Blog blog={blog}></Blog>)
		const button = component.container.querySelector('.toggleButton')
		const toggle = component.container.querySelector('.toggle')

		fireEvent.click(button)

		expect(toggle).not.toHaveStyle('display: none')
		expect(toggle.querySelector('.url'))
		expect(toggle.querySelector('.likes'))
	})
})
describe('5.15', () => {
	test('two clicks on like button triggers event handler twice', () => {
		const mockFn = jest.fn()
		const component = render(<Blog handleLike={mockFn} blog={blog}></Blog>)
		const button = component.container.querySelector('.likeButton')

		fireEvent.click(button)
		fireEvent.click(button)

		expect(mockFn.mock.calls.length).toBe(2)
	})
})
