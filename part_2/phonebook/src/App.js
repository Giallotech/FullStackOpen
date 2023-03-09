import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const duplicateName = persons.find((item) => item.name === newName)
    const changedNumber = { ...duplicateName, number: newNumber }

    if (duplicateName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(changedNumber.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedNumber.id ? person : returnedPerson))
            setNewName("")
            setNewNumber("")
            setNotification({
              text: `The number of ${newName} has been replaced`,
              value: 'success',
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification({
              text: `Information of ${newName} has already been removed from server`,
              value: 'error',
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setNotification({
            text: `Added ${newName}`,
            value: 'success',
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const searchResults = persons.filter(item => item.name.toLowerCase().includes(newSearch.toLowerCase()))
  console.log(searchResults)
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <Filter newSearch={newSearch} handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons
        searchResults={searchResults}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App