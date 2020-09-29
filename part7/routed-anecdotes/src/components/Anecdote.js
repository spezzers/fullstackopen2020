import React from 'react'

const Anecdote = ({anecdote}) => {
	return (
        <div>
            <h2>
            "{anecdote.content}" - {anecdote.author}
            </h2>
            <p>has {anecdote.votes} votes</p>
            <p>for more info visit <a target='_blank' rel="noopener noreferrer" href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

export default Anecdote
