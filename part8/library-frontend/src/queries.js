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
    author
    id
    published
    genres
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title,
    author,
    published
  }
}
`