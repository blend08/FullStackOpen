import { useState } from 'react'

const Person = ({name, number}) => <div>{name} {number}</div>

const Persons = ({persons}) => {
  return(
    persons.map(person => 
      <Person key={person.id} {...person}/>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setNewFilter] = useState('')
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newfilter.toLowerCase()))
 
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName))
      alert(`${newName} is already added to phonebook`)
    else
      setPersons(persons.concat(personObject))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={handleNameFilter}></input></div>
      <h2>Add a newr</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App