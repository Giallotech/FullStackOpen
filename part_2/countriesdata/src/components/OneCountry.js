const OneCountry = ({ countries, weather }) => {
  const languages = Object.values(countries[0].languages)
  const showData = () => {
    if (!weather) { return null }
    else {
      const icon = weather.current.weather[0].icon
      return <div>
        <h3> Weather in {countries[0].capital}</h3>
        <div>temperature {weather.current.temp} Celsius</div>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon"></img>
        <div>wind {weather.current.wind_speed} m/s</div>
      </div>
    }
  }
  return <div>
    <h2>{countries[0].name.common}</h2>
    <div>capital {countries[0].capital}</div>
    <div>area {countries[0].area}</div>
    <p><strong>languages:</strong></p>
    <ul>
      {languages.map(item =>
        <li key={item}> {item}</li>
      )}
    </ul>
    <img src={countries[0].flags.png} alt="flag">
    </img>
    <div>
      {showData()}
    </div>
  </div>
}

export default OneCountry