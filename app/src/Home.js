import React, {useState, useEffect} from 'react';
import { TextField } from '@material-ui/core';
import './App.css';
import Weather from './Weather.js';
// key: 49db136cb3c703cbc81ffb35eff4788e
// API Call: http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=49db136cb3c703cbc81ffb35eff4788e


function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [url, setUrl] = useState('http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=49db136cb3c703cbc81ffb35eff4788e');
  // const [refresh, setRefresh] = useState(false)
  const [cityOrZip, setCityOrZip] = useState('');  
  let s1 ="http://api.openweathermap.org/geo/1.0/direct?q=";
  let s2 = "&limit=5&appid=49db136cb3c703cbc81ffb35eff4788e"   


  const handleSearch = (event) => {
    setCityOrZip(event.target.value)
  }

  const handleEnteredSearch = (event) => {
    if (event.key === "Enter"){
        // Prevent page refresh
        // SRC: https://stackoverflow.com/questions/50193227/basic-react-form-submit-refreshes-entire-page
        setUrl(s1+cityOrZip+s2)
        event.preventDefault(); 
    }
  }

  const handleLocationChoice = (event) => {
    console.log()
  }

  useEffect(() => {
    // fetch(url)
    fetch(url)
    .then((response) => response.json())
    .then((data) => setWeatherData(data))
    .catch((error) => console.log("Error: ", error))
  },[url])
  
  useEffect(() => {
    console.log({weatherData})
    console.log(url)
  },[weatherData,url])


  return (
    <div>
      
      <div className = "Search">
      <form >
        <label> Search by city of zip </label>
        <input
          type = "text"
          required
          value = {cityOrZip}
          onChange={handleSearch}
          onKeyDown = {handleEnteredSearch}
        />
      </form>
      
    </div>

      {weatherData.length === 0 ? (<p> No Weather data available for search</p>) :
      (
        <div>
          {weatherData.map((item, index) => 
          <Weather
            key = {index}
            zip = {item.zip}
            name = {item.name}
            lat = {item.lat}
            lon = {item.lon}
            country = {item.country}
          />
          )}
        </div>  
      )
      }
    </div>
  );
}

export default Home;
