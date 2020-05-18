import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Statistics = ({feedback}) => {

  const all = feedback.good + feedback.bad + feedback.neutral
  const average = ((1 * feedback.good) - (1 * feedback.bad))/all || 0
  const positive = `${feedback.good / all || 0}%`


  return(
    <>
      <h2>Statistics</h2>
      <p>Good: {feedback.good}</p>
      <p>Neutral: {feedback.neutral}</p>
      <p>Bad: {feedback.bad}</p>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}</p>
    </>
  )
}






const App = () => {

  const [ feedback, setFeedback ] = useState({
    good: 0,
    bad: 0,
    neutral: 0
  })

  const handleFeedback = (type) => {
    setFeedback( {...feedback, [type]: feedback[type] + 1})
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => handleFeedback("good")}>Good</button>
      <button onClick={() => handleFeedback("neutral")}>Neutral</button>
      <button onClick={() => handleFeedback("bad")}>Bad</button>
      <Statistics feedback={feedback}/>
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)