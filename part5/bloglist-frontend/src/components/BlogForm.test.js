import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
	render,
	fireEvent,
	// prettyDOM
} from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

describe('5.16*', () => {
	test('Event handler props match correct form details', () => {
		const mockSubmit = jest.fn()
		const user = {token: 'meep'}
		const component = render(<BlogForm user={user} onSubmit={mockSubmit}/>)
		const button = component.container.querySelector('#submitBlog')
		const author = component.container.querySelector('#author')
		const title = component.container.querySelector('#title')
		const url = component.container.querySelector('#url')
		fireEvent.change(title, {
			target: { value: 'Meat me in the middle' }
		})
		fireEvent.change(author, {
			target: { value: 'Beefy Bob' }
		})
		fireEvent.change(url, {
			target: { value: 'http://www.killacow.com/blog/meatmeinthemiddle' }
		})
		fireEvent.click(button)
		// component.debug()
		console.log(mockSubmit.mock)
	})
})
