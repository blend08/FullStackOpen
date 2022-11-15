import axios from "axios";
import { useState, useEffect } from "react";


const Weather = ({lat, lon}) => {
  const [weather, setWeather] = useState([])
  const params = {
    lat: lat,
    lon: lon,
    appid: process.env.REACT_APP_API_KEY,
    units: "metric"
  }

  useEffect(() => {axios.get('https://api.openweathermap.org/data/2.5/weather', {params})
                        .then(response => setWeather(response.data))},[])

  console.log(weather)
  return (
    <>
      {Object.keys(weather).length === 0 ? <div></div>
        :<>
          <div>temperature: {weather.main.temp} Celcius</div>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <div>wind: {weather.wind.speed} m/s</div>
        </>
      }
    </>
  )

}  

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  const api_key = "0e40599bd04dedcd36f48db337fcbaba"

  useEffect(() => {axios.get('https://restcountries.com/v3.1/all').then(response => setCountries(response.data))}, [])

  

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <div>find countries <input value={search} onChange={handleSearch}/></div>
      {filteredCountries.length === 1 ? 
          <div>
            {filteredCountries.map((country,id) =>
              <div key={id}>
                <h1>{country.name.common}</h1>
                <div>capital: {country.capital}</div>
                <div>area : {country.area}</div>
                <div>latlng: {country.capitalInfo.latlng[0]}</div>
                <h4>languages: </h4>
                <ul>
                  {Object.values(country.languages).map((language,id) => 
                    <li key={id}>{language}</li>
                  )}
                </ul>
                <img src={country.flags.png} />
                <h2>Weather in {country.name.common}</h2>
                <Weather lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
              </div>
            )}
          </div>
        : filteredCountries.length > 10 ? <div>Too many matches, specify another filter</div>
        : <div>
          {filteredCountries.map((country,id) => 
            <div key={id}>
              {country.name.common} <button value={country.name.common} onClick={handleSearch}>show</button>
            </div> 
          )}
        </div>
      }
      
    </div>
  );
}

export default App;

