import React from 'react'

const Header = (props) => <h3>{props.course}</h3>
  
const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Content = ({ parts }) => (
  <div>
    {parts.map((part,index) => <Part key={index} part={part}/>)}
  </div>
)

const Total = ({ exercises }) => (
  <b>
    total of {exercises.reduce((total,cur) => total+cur)} exercises
  </b>
)


const Course = ({ courses }) => (
  courses.map(course => (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total exercises={course.parts.map(part => part.exercises)}/>
    </div>
  ))
)

export default Course;
