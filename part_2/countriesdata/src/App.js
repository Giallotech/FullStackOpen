import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Filter from './components/Filter'
import TooManyCountries from './components/TooManyCountries'
import FewCountries from './components/FewCountries'
import OneCountry from './components/OneCountry'
import axios from 'axios'

const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (newSearch) {
      countriesService
        .getAll()
        .then(countriesData => {
          const searchResults = countriesData.filter(item => item.name.common.toLowerCase().includes(newSearch.toLowerCase()))
          setCountries(searchResults)
        })
    }
  }, [newSearch])

  useEffect(() => {
    if (countries.length === 1) {
      const api_key = process.env.REACT_APP_API_KEY
      const latitude = countries[0].latlng[0]
      const longitude = countries[0].latlng[1]
      axios
        .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [countries])

  const showData = () => {
    if (newSearch) {
      if (countries.length > 10) { return <TooManyCountries /> }
      else if (countries.length > 1) { return <FewCountries countries={countries} handleClick={handleClick} /> }
      else if (countries.length === 1) { return <OneCountry countries={countries} weather={weather} /> }
    }
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleClick = (country) => {
    setNewSearch(country)
  }

  return (
    <div>
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      {showData()}
    </div>
  )
}

export default App