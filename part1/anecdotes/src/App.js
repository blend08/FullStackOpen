import { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  // new Uint8Array/Uint16Array/Uint32Array values are zeroes by default
  // another solution would be Array(n).fill(0) 
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const maxVote = Math.max(...votes)
  const indexOfMaxVote = votes.indexOf(maxVote)
  
  const vote = (select) => () => {
    const copy = [...votes]
    copy[select] += 1
    setVotes(copy)
  }

  const getRandomInt = (max) => Math.floor(Math.random() * max)

  const setToSelected = (max) => () => setSelected(getRandomInt(max))
  
  return (
    <div>
      <Header title="Anecdote of the day" /> 
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={vote(selected)} text="vote" />
      <Button onClick={setToSelected(anecdotes.length)} text="next anecdote" />
      <Header title="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[indexOfMaxVote]} votes={votes[indexOfMaxVote]} />
    </div>
  )
}

export default App