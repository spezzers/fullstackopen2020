import React from 'react'
import Country from './Country'

const Display = ({ data, search, onClick }) => {
  const filteredData = data.filter(country =>
    country.name.toUpperCase().includes(search.toUpperCase())
  )

  const searchResults = filteredData.map(country => (
    <div key={country.alpha3Code}>
      {`${country.name}`}
      <button value={country.name} onClick={onClick}>
        Show
      </button>
    </div>
  ))

  if (search.length === 0) {
    return <div>Start a search to display countries</div>
  } else if (filteredData.length > 10) {
    return <div>Too many matches, please be more specific</div>
  } else if (filteredData.length === 1) {
    const country = filteredData[0]
    return <Country country={country} />
  }
  return <div>{searchResults}</div>
}

export default Display
