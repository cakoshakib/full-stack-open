import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonsForm'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ noti, newNoti ] = useState({message:null, error:false})
  
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(personData => {
        console.log(personData)
        setPersons(personData)
      })
  }, [])

  console.log(persons)
  
  const resetMessage = () => {
    setTimeout(() => {
      newNoti({message:null, error:false})
    }, 5000)
  }
  
  const updateNumber = () => {
    const currentPerson = persons.find(p => p.name === newName)
    const updatedObject = {...currentPerson, number: newNumber}
    
    personService
      .updateNumber(currentPerson.id, updatedObject)
      .then (returnedNote =>
        setPersons(persons.map(p => p.name === newName ? returnedNote : p))
      )
    
    newNoti({
      message:`${currentPerson.name}'s number changed to ${newNumber}`,
      error:false
    })
    resetMessage()
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        updateNumber()
      return
    }
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService 
      .create(personObject)
      .then(personData => {
        setPersons(persons.concat(personData))
        setNewName('')
        setNewNumber('')
        newNoti({message:`Added ${newName}`, error:false})
        resetMessage()
      })
  }
  
  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .catch(error => {
          newNoti({
            message:`Information of ${person.name} has already been removed from server`, 
            error:true
          })
          console.log(error)
          resetMessage()
        })
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }
  
  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  
  const numsToShow = newFilter !== '' 
    ? (persons.filter(person => person.name.toLowerCase().includes(newFilter)))
    : persons
  
  return (
    <div>
      <Notification message={noti.message} error={noti.error}/>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter}/>

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName} 
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons names={numsToShow} handleDelete={deletePerson}/>
    </div>
  )

}

export default App;
