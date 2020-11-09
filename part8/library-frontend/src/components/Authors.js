import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>Loading...</div>
  }

  const updateAuthor = event => {
    event.preventDefault()
    console.log('updateAuthor...')
    editAuthor({ variables: { name: author, year: parseInt(born) } }).then(result => console.log(result.data))
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h3>Update Author</h3>
        <form onSubmit={updateAuthor}>
          <select value={author} onChange={({target}) => setAuthor(target.value)}>
            {authors.data.allAuthors.map(a => <option value={a.name}>{a.name}</option>)}
          </select>
          <input type='text' value={born} onChange={({ target }) => setBorn(target.value)}></input>
          <button type='submit'>update</button>
        </form>
      </div>

    </div>
  )
}

export default Authors
