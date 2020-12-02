
import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content1 = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
      <Part part={course.parts[3]} />
    </div>
  )
}

const Content2 = ({ course }) => {
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const exe1 = courses[0].parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const sum1 = exe1.reduce(reducer)
  const exe2 = courses[1].parts.map(part => part.exercises)
  const sum2 = exe2.reduce(reducer)

  return(
    <div>
      <h1>Web development curriculum</h1>
      <Course course={courses} sum1 = {sum1} sum2 = {sum2}/>
    </div>)
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course[0]} />
      <Content1 course={props.course[0]} />
      <p><b>total of  {props.sum1} exercises</b></p>
      <Header course={props.course[1]} />
      <Content2 course={props.course[1]} />
      <p><b>total of  {props.sum2} exercises</b></p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))