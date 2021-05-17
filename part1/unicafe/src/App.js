import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={ handleClick }>
    {text}
  </button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td><td>{value[0]}{value[1]}</td>
  </tr>
)

const Statistics = (props) => {
  const [good, neutral, bad] = props.reviews
  const total = good+neutral+bad
  if(good === 0 && bad === 0 && neutral === 0) 
    return(<p>No feedback given</p>)

  return (
    <table>
      <Statistic text='good' value={[good]}/>
      <Statistic text='neutral' value={[neutral]}/>
      <Statistic text='bad' value={[bad]}/>
      <Statistic text='all' value={[total]}/>
      <Statistic text='average' value={[(good-bad)/total]}/>
      <Statistic text='positive' value={[(good)/total * 100,'%']}/>
    </table>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={'good'}/>
      <Button handleClick={handleNeutral} text={'neutral'}/>
      <Button handleClick={handleBad} text={'bad'}/>
    
      <h1>statistics</h1>
      <Statistics reviews={[good, neutral, bad]}/>
    </div>
  )
}

export default App;
