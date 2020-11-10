import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const books = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>Loading...</div>
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Book Title</th>
            <th>
              Author
            </th>
            <th align='center'>
              Published
            </th>
          </tr>
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td align='center'>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books