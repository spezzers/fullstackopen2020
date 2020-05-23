import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ location }) => {
  const [info, setInfo] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const req = `http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`

  useEffect(() => {
    axios.get(req).then(res => {
      return setInfo(res.data)
    })
  }, [location, req])

  if (info.location === undefined) {
    return <div>getting weather...</div>
  }

  return (
    <div>
      <h3>Current weather in {info.location.name}</h3>
      <div>
        <strong>Temperature:</strong> {info.current.temperature}°C
      </div>
      <img
        src={info.current.weather_icons[0]}
        alt={info.current.weather_descriptions[0]}
      />
      <div>
        {info.current.weather_descriptions[0]} with windspeeds of{' '}
        {info.current.wind_speed}kph (direction: {info.current.wind_dir})
      </div>
    </div>
  )
}

export default Weather
