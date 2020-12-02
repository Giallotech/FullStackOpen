import React from 'react'

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
  
  const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
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

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  export default Course