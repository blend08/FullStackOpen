import axios from "axios";
import { useState, useEffect } from "react";

const Countries = ({countries, showData}) => {
  return(
    <>
      {countries.map((country, id) => 
        <div key={id}>
          {showData ? <h1>{country.name.common}</h1> : <div>{country.name.common}</div>}
          {showData && 
            <>
              <div>capital: {country.capital}</div>
              <div>area: {country.area}</div>
              <h4>languages: </h4>
              <ul>
                {Object.values(country.languages).map((language,index) =>
                  <li key={index}>{language}</li>
                )}
              </ul>
              <img src={country.flags.png} />              
            </>
          }
        </div>  
      )}
    </>
  )
}

const Content = ({countries}) => { 
  if (countries.length === 1) {
    return(
      <>
        <Countries countries={countries} showData={true} />
      </>
    )
  }

  else if(countries.length > 10) return <div>Too many matches, specify another filter</div>

  else return <Countries countries={countries} />

}

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
      <Content countries={filteredCountries} />
    </div>
  );
}

export default App;
