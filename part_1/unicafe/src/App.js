import { useState } from 'react'

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.avg} />
      <StatisticLine text="positive" value={props.pos} percent="%" />
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>
        {props.value} {props.percent}
      </td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)
  const all = good + neutral + bad

  const goodclick = () => {
    setGood(good + 1)
    setAvg((good + 1 - bad) / (all + 1))
    setPos(((good + 1) * 100) / (all + 1))
  }
  const badclick = () => {
    setBad(bad + 1)
    setAvg((good - bad - 1) / (all + 1))
    setPos((good * 100) / (all + 1))
  }
  const neutralclick = () => {
    setNeutral(neutral + 1)
    setAvg((good - bad) / (all + 1))
    setPos((good * 100) / (all + 1))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={goodclick}
        text='good'
      />
      <Button
        onClick={neutralclick}
        text='neutral'
      />
      <Button
        onClick={badclick}
        text='bad'
      />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={avg}
        pos={pos}
      />
    </div>
  )
}

export default App


