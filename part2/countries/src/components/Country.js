import React from 'react'
import Weather from './Weather'

const CountryData = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>languages</h3>
    {country.languages.map(ln => <li>{ln.name}</li>)}
    <img src={country.flag} width="128" height="128"/>
    <Weather country={country}/>
  </div>
)

export default CountryData;