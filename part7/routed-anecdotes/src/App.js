import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Footer from './components/Footer'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Menu from './components/Menu'

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

	// const [notification, setNotification] = useState('')

	const addNew = anecdote => {
		anecdote.id = (Math.random() * 10000).toFixed(0)
		setAnecdotes(anecdotes.concat(anecdote))
	}

	return (
		<>
			<h1>Software anecdotes</h1>
			<Router>
				<Menu />
				<Switch>
					<Route path='/anecdotes'>
						<AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} />
					</Route>
					<Route path='/about'>
						<About />
					</Route>
					<Route path='/create'>
						<CreateNew addNew={addNew} />
					</Route>
				</Switch>
			</Router>
			<Footer />
		</>
	)
}

export default App
