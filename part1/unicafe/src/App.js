import { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const StatisticsLine = ({text , value}) => <div> {text} {value} </div>

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = props.good + props.neutral + props.bad
  const average = ((props.good*1)+(props.neutral*0)+(props.bad*-1))/all
  const positive = (props.good/all)*100

  if (all === 0) return <div>No feedback given</div> 

  return(
    <>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={all}/>
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive + '%'} />
    </>
  )

}

const Button = ({handleClick, text}) => {
  return (
   <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App