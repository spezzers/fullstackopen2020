import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  const lang = country.languages.map(language => {
    return <li key={language.iso639_2}>{language.name}</li>
  })
  return (
    <>
      <div>
        <h1>{country.name}</h1>
        <div>capital: {country.capital}</div>
        <div>population: {country.population}</div>
        <h3>Languages</h3>
        <ul>{lang}</ul>
        <img src={country.flag} alt='flag' width='200px' />
      </div>
      <Weather location={country.capital} />
    </>
  )
}

export default Country
