import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
mutation addNewBook(
  $title: String!,
  $author: String!,
  $published: Int!,
  $genres: [String]
){
  addBook(
    title: $title,
    author: $author,
    published: $published,
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

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    id
    author {
      name
    }
    published
  }
}
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        id
        bookCount
    }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor(
  $name: String!
  $year: Int!
) { 
  editAuthor(
    name: $name,
    setBornTo: $year
  ) {
    name
    born
    id
  }
}
`