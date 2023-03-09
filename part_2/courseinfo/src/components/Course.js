import { Header, Content, Total } from '../App'

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sumExercises={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
  </div>
)

export default Course