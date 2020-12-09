import { gql } from '@apollo/client'
// ------------------------------   F R A G M E N T S
const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		id
		author {
			name
		}
		published
		genres
	}
`

// --------------------------------- Q U E R I E S

export const ALL_BOOKS = gql`
	query {
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const GET_BOOKS = gql`
	query GetBooks($genre: String) {
		getBooks(genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
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
			...BookDetails
		}
	}
	${BOOK_DETAILS}
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
// ---------------------------   S U B S C R I P T I O N S

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`
