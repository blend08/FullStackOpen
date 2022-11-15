import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Header from './components/Header'
import personService from './services/persons'

const App = () => {
  //{ name: 'Arto Hellas', number: '040-123456', id: 1 },
  //{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setNewFilter] = useState('')
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newfilter.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
 
  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName))
    {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          })
      }
    }
    else
      {
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
  }

  const removeName = (id, name) => {
    if (window.confirm(`Delete ${name}`))
    {
      personService
      .remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
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
      <Persons persons={filteredPersons} removeName={removeName}/>
    </div>
  )
}

export default App