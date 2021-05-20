import React from 'react'

const DeleteButton = ({ person, handleDelete }) => (
  <button onClick={() => handleDelete(person)}>delete</button>
)
const Persons = ({ names, handleDelete }) => 
  names.map(person => 
    <div>
      {person.name} {person.number}
      <DeleteButton person={person} handleDelete={handleDelete}/>
    </div>
  )

export default Persons
