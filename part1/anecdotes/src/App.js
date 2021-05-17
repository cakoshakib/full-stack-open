import React, { useState } from 'react'

const Display = ({ title, text }) => (
  <div>
    <h1>{title}</h1>
    {text}
  </div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
   {text} 
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(6))
  const [maxVoted, setMax] = useState(0)
  
  const handleSelected = () => 
    setSelected(Math.floor((Math.random() * anecdotes.length-1))+1)


  const handleVotes = () => {
    const copy_points = [...points]
    copy_points[selected]++
    if(copy_points[selected] > copy_points[maxVoted]) 
      setMax(selected)
    return setPoints(copy_points)
  }
  

  return (
    <div>
      <Display title='Anecdote of the day' text={anecdotes[selected]}/>
      has {points[selected]} votes
      <br></br>
      <Button handleClick={handleSelected} text='next anecdote'/>
      <Button handleClick={handleVotes} text='vote'/>
      <Display title='Anecdotes with most votes' text={anecdotes[maxVoted]}/>
    </div>
    
  )
}


export default App;
