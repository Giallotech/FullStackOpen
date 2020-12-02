import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'


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

ReactDOM.render(<App />, document.getElementById('root'))