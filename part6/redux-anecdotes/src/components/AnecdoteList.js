import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { changeNoti, removeNoti } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote.id))
    dispatch(changeNoti(`you voted from '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNoti())
    }, 5000)
  }

  const filteredAnecdotes = anecdotes.filter(
    anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList