import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryData from './components/Country'

const Visible = ({ filteredCountries, newFilter } ) => {
  if (filteredCountries.length === 1) {
    return <CountryData country={filteredCountries[0]}/>
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) 
    return(
      filteredCountries.map(country => (
        <div>
          {country.name}
          <button onClick={() => newFilter(country.name)}>show</button> 
        </div>
      ))
    )
  else 
    return(<p>Too many matches, specify another filter</p>)
}


const App = () => {
  const [ filter, newFilter ] = useState('')
  const [ countryData, newData ] = useState([])
  
  useEffect(() =>{
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => 
        newData(response.data)
      )
  }, [])  
  
  const changeFilter = (event) => newFilter(event.target.value)

  const filteredCountries = countryData.filter(
    country => country.name.toLowerCase().includes(filter.toLowerCase())
  )
  
  return(
    <div>
      find countries <input value={filter} onChange={changeFilter}/>
      <Visible filteredCountries={filteredCountries} newFilter={newFilter}/>
    </div>
  )
}

export default App;