import React from 'react'

const Header = (props) => <h1>{props.course}</h1>
  
const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Content = (props) => {
  const part = []
  for(var i = 0; i < 3; i++) 
    part.push(<Part part={props.parts[i]}/>);

  return (<div>{part}</div>)
}

const Total = ({total}) => (
  <p>
    Number of exercises {total[0].exercises+total[1].exercises+total[2].exercises} 
  </p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10 
      },
      {
        name: 'Using props to pass data',
        exercises: 7 
      },
      {
        name: 'State of a component',
        exercises: 14
      }  
    ]
  }
  return( 
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}

export default App;
