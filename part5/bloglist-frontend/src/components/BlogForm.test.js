import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('5.16*', () => {
	test('Event handler props match correct form details', () => {
		const mockSubmit = jest.fn()
		const user = { token: 'meep' }
		const component = render(<BlogForm user={user} onSubmit={mockSubmit} />)
		const form = component.container.querySelector('#form')
		const author = component.container.querySelector('#author')
		const title = component.container.querySelector('#title')
		const url = component.container.querySelector('#url')
		const testBlog = {
			title: 'Meat me in the middle',
			author: 'Beefy Bob',
			url: 'http://www.killacow.com/blog/meatmeinthemiddle'
		}

		fireEvent.change(title, {
			target: { value: testBlog.title }
		})
		fireEvent.change(author, {
			target: { value: testBlog.author }
		})
		fireEvent.change(url, {
			target: { value: testBlog.url }
		})
		fireEvent.submit(form)
		const finalCall = mockSubmit.mock.calls[mockSubmit.mock.calls.length - 1][0]
		// console.log(mockSubmit.mock.calls, finalCall, testBlog)
		expect(finalCall.title).toBe(testBlog.title)
		expect(finalCall.author).toBe(testBlog.author)
		expect(finalCall.url).toBe(testBlog.url)
	})
})
