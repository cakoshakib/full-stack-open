import React from "react";
import { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);



  let options = authors.map(author => (
    {
      value: author.name,
      label: author.name
    })
  )

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
    }
  });

  const submit = (e) => {
    e.preventDefault()

    console.log("add book...");

    const intYear = parseInt(year)
    editAuthor({ variables: { name: selectedOption.value, year: intYear } });

    setYear('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      <br></br>
      <form onSubmit={submit}>
        <div>
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">edit author</button>
      </form>
    </div>
  )


}

export default AuthorForm