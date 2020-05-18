import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => () => {
    setGood(good + 1)
  }
  const handleBad = () => () => {
    setBad(bad + 1)
  }
  const handleNeutral = () => () => {
    setNeutral(neutral + 1)
  }

  const all = good + bad + neutral
  const average = ((1 * good) - (1 * bad))/all || 0
  const positive = `${good / all || 0}%`

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={handleGood()}>Good</button>
      <button onClick={handleNeutral()}>Neutral</button>
      <button onClick={handleBad()}>Bad</button>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}</p>
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)