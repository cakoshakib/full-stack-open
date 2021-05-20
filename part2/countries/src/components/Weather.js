import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherInfo = ({ country, weatherData }) => {
  let image;
  try{
    image = weatherData.weather_icons.length===1 
    ? <img src={weatherData.weather_icons[0]}/> 
    : "" 
  } catch {
    return <div></div>
  }
  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      <b>temperature:</b> {weatherData.temperature} Celsius
      <br></br>
      {image}
      <br></br>
      <b>wind:</b> {weatherData.wind_speed} mph direction {weatherData.wind_dir}
    </div>
  )
}

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital.replace(/[, ]+/g, "%20").trim()}`
  const [ weatherData, newWeather ] = useState([])
  const [ okResponse, setOK ] = useState(false)
  console.log(url)

  useEffect(() =>{
    console.log('weather effect')
    axios
      .get(url)
      .then(response => {
        console.log(response)
        if(response.statusText === "OK") setOK(true)
        newWeather(response.data.current)})
  }, [])  
  
  if(okResponse) {
    return (
      <WeatherInfo country={country} weatherData={weatherData}/>
    )
  }
  return <div></div>
}

export default Weather;
