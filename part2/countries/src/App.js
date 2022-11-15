import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

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
                <h4>languages: </h4>
                <ul>
                  {Object.values(country.languages).map((language,id) => 
                    <li key={id}>{language}</li>
                  )}
                </ul>
                <img src={country.flags.png} />
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

