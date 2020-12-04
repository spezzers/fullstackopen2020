import { gql } from '@apollo/client'

// --------------------------------- Q U E R I E S

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			id
			author {
				name
			}
			published
			genres
		}
	}
`

export const GET_BOOKS = gql`
	query GetBooks($genre: String) {
		getBooks(genre: $genre) {
			title
			id
			author {
				name
			}
			published
			genres
		}
	}
`

export const ALL_AUTHORS = gql`
	query AllAuthors {
		allAuthors {
			name
			born
			id
			bookCount
		}
	}
`

export const ME = gql`
	query Me {
		me {
			username
			favouriteGenre
		}
	}
`

// ----------------------------- M U T A T I O N S

export const ADD_BOOK = gql`
	mutation addNewBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String]
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author {
				name
			}
			id
			published
			genres
		}
	}
`

export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $year: Int!) {
		editAuthor(name: $name, setBornTo: $year) {
			name
			born
			id
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`
