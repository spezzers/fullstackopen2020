import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const App = () => {

  const [ state, setState] = useState({
    selected: 0,
    votes: Array(anecdotes.length).fill(0)
  })
  
  const newAnecdote = () => setState({
    ...state,
    selected: Math.floor(Math.random()*(anecdotes.length - 1))
  })
  
  const voteArray = state.votes

  const vote = () => {
    voteArray[state.selected] += 1
    setState({
      ...state,
      votes: voteArray
    })
  }

  const mostVotes = voteArray.indexOf(Math.max(...voteArray))

  return (
    <>
      <div>
        <p>"<em>{anecdotes[state.selected]}</em>"</p>
        <p>Has {state.votes[state.selected]} votes</p>
      </div>
      <div>
        <button onClick={vote}>Vote</button>
        <button onClick={newAnecdote}>Next anecdote</button>
      </div>
      <div>
        <h3>Anecdote with the most votes</h3>
        <p>"{anecdotes[mostVotes]}"</p>
        <p>Has {state.votes[mostVotes]} votes</p>
      </div>
    </>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)