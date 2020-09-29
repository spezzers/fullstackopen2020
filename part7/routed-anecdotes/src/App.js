import React, { useState } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Footer from './components/Footer'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Menu from './components/Menu'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: '1'
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: '2'
		}
	])

  const [notification, setNotification] = useState('')

  let previousTimer

  const handleNotification = (message, duration) => {
    const timer = setTimeout(() => {
      setNotification('')
    }, duration || 2000)
    setNotification(message)
    window.clearTimeout(previousTimer)
    previousTimer = timer
  }



	const addNew = anecdote => {
		anecdote.id = (Math.random() * 10000).toFixed(0)
		setAnecdotes(anecdotes.concat(anecdote))
	}

	// const anecdoteById = id => anecdotes.find(a => a.id === id)

	// const vote = id => {
	// 	const anecdote = anecdoteById(id)

	// 	const voted = {
	// 		...anecdote,
	// 		votes: anecdote.votes + 1
	// 	}

	// 	setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
	// }

  const match = useRouteMatch('/anecdotes/:id')
	const anecdote = match
		? anecdotes.find(a => a.id === match.params.id)
		: null

	return (
		<>
			<h1>Software anecdotes</h1>
			<Menu />
      <Notification message={notification}/>
			<Switch>
				<Route path='/anecdotes/:id'>
					<Anecdote anecdote={anecdote}></Anecdote>
				</Route>
				<Route path='/anecdotes'>
					<AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
				</Route>
				<Route path='/about'>
					<About />
				</Route>
				<Route path='/create'>
					<CreateNew addNew={addNew} notify={handleNotification}/>
				</Route>
			</Switch>
			<Footer />
		</>
	)
}

export default App
