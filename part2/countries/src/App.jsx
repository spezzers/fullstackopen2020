import React from 'react'
import Search from './components/Search.jsx'
import Display from './components/Display.jsx'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const searchInput = (event) => {
    setSearch(event.target.value)
  }
  const show = event => setSearch(event.target.value)
  
  
  return (
    <div>
      <Search value={search} onChange={searchInput}/>
      <Display data={countries} search={search} onClick={show}/>
    </div>
  )
}

export default App;
