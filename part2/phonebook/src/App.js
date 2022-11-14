import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Header from './components/Header'

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
      <Header title="Phonebook" />
      <Filter value={newfilter} onChange={handleNameFilter} />
      <Header title="Add a new" />
      <PersonForm nameValue={newName} nameOnChange={handleNameChange}
                  numberValue={newNumber} numberOnChange={handleNumberChange}
                  onSubmit={addName}
      />
      <Header title="Numbers" />
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App