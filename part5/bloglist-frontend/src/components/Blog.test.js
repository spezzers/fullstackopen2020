import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		title: 'This is just a test',
		author: 'Jester Bester',
		url: 'https://www.happyholidays.com'
	}

	const component = render(
		<Blog blog={blog}></Blog>
	)

	expect(component.container)
})
