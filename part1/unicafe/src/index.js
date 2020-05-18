import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Statistic = ({text, value}) => <div>{text}: {value}</div>

const Statistics = ({feedback}) => {
  const all = feedback.good + feedback.bad + feedback.neutral
  const average = ((1 * feedback.good) - (1 * feedback.bad))/all || 0
  const positive = `${feedback.good / all || 0}%`

  if (all === 0) return <p>No feedback given</p>

  return(
    <>
      <h2>Statistics</h2>
      <Statistic text="Good" value={feedback.good}/>
      <Statistic text="Neutral" value={feedback.neutral}/>
      <Statistic text="Bad" value={feedback.bad}/>
      <Statistic text="All" value={all}/>
      <Statistic text="Average" value={average}/>
      <Statistic text="Positive" value={positive}/>
    </>
  )
}


const Button = ({onclick, type}) => {
  return (
    <button onClick={onclick(type)}>{type}</button>
  )
}


const App = () => {

  const [ feedback, setFeedback ] = useState({
    good: 0,
    bad: 0,
    neutral: 0
  })

  const handleFeedback = type => () => setFeedback({
    ...feedback, [type]: feedback[type] + 1
  })

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onclick={handleFeedback} type="good"/>
      <Button onclick={handleFeedback} type="neutral"/>
      <Button onclick={handleFeedback} type="bad"/>
      <Statistics feedback={feedback}/>
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)