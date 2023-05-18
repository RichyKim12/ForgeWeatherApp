import React, {useState, useEffect} from 'react';
import './App.css';
import Location from './Location.js';
import NYT from './NYT.js';
import Weather from './Weather.js';

import Popups from './components/Popups.js';
// https://api.openweathermap.org/data/2.5/onecall?lat=51.5073219&lon=-0.1276474&appid=49db136cb3c703cbc81ffb35eff4788e
// https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=MUeWz5yo1EwGlrbrEQpNBIazbvgtOvpK
function Home() {
  // API KEY
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
  const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY
  console.log('NYTAPIKEY:',NYT_API_KEY)


  const [locationData, setlocationData] = useState([]);
  const [weatherUrl, setWeatherUrl] = useState('https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=51.5073219&lon=-0.1276474&appid='+WEATHER_API_KEY);
  const [weatherData, setWeatherData] = useState([]);
  // Fetch Weather Data
  useEffect(() => {
    fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => setWeatherData(data))
    .catch((error) => console.log("Error: ", error))
  },[weatherUrl])
  const [locationUrl, setUrl] = useState('http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid='+WEATHER_API_KEY);
  const [NYTData, setNYTData] = useState([])
  const [cityOrZip, setCityOrZip] = useState('');
  const [buttonPopup, setButtonPopup] = useState(false);
  const [weatherImageUrl, setWeatherImageUrl] = useState('https://openweathermap.org/img/wn/13d@2x.png');
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  let s1 ="http://api.openweathermap.org/geo/1.0/direct?q=";
  let s2 = "&limit=500&appid="+WEATHER_API_KEY   

  const img1 = "https://openweathermap.org/img/wn/"
  let img2 = "@2x.png"



  
  
  
  
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

  function handleLocationChoice(index){
    let latChosenCity = locationData[index].lat;
    let lonChosenCity = locationData[index].lon;
    setButtonPopup(true)
    setWeatherUrl("https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat="+latChosenCity+"&lon="+lonChosenCity+"&appid="+WEATHER_API_KEY)
    setWeatherImageUrl(img1+weatherData.current.weather[0].icon+img2)
    setWeatherUrl("https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat="+latChosenCity+"&lon="+lonChosenCity+"&appid="+WEATHER_API_KEY)
    setHourlyWeatherData(weatherData.hourly.slice(24,27))
  }

  // Fetch location data
  useEffect(() => {
    fetch(locationUrl)
    .then((response) => response.json())
    .then((data) => setlocationData(data))
    .catch((error) => console.log("Error: ", error))
  },[locationUrl])

  // Fetch Article data  
  useEffect(() => {
    fetch("https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=" + NYT_API_KEY)
    .then((response) => response.json())
    .then((data) => setNYTData(data.results))
    .catch((error) => console.log("Error: ", error))
  },[NYT_API_KEY])
  
  

  useEffect(() => {

    console.log("WEATHER:", {weatherData})
    console.log("HOURLY", {hourlyWeatherData})
    
  },[weatherData,hourlyWeatherData])


  return (
    
      <div id = "home">
        <div className = "spacefill"></div>
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
        <div className = "spacefill"></div>
        <div id = "NYT">
          <h2 className='NYT'>Top News Stories</h2>
          <div className = "spacefill"></div>
          {NYTData.length === 0 ? (<p> No Articles </p>) :
            (
              <div className = "NYT">
                {NYTData.slice(0,5).map((item, index) =>
                    // External url redirect
                    // SRC: https://stackoverflow.com/questions/66905176/how-to-redirect-to-external-url-onclick-in-react
                    <button className= "NYTButton" onClick={() => { window.location.href = item.url; }} key={index}>
                      <NYT
                        key = {index}
                        title = {item.title}
                        author = {item.byline}
                        publishDate = {item.published_date}
                        category = {item.nytdsection}
                        url = {item.url}
                      />
                    </button>
                )}  
              </div>  
            )
            }
        </div>
        <div className = "spacefill"></div>
        <div className = "spacefill"></div>
        <h2 className = "searchResults"> Search Results</h2>
        {locationData.length === 0 ? (<p> No Weather data available for search</p>) :
        (
          <div className = "Search">
            {locationData.map((item, index) =>
              <div className = "searchResults" key = {index}> 
                <button className= "locationButton" onClick={() => {handleLocationChoice(index);}} key={index}>
                  <Location
                    key = {index}
                    zip = {item.zip}
                    name = {item.name}
                    lat = {item.lat}
                    lon = {item.lon}
                    country = {item.country}
                  />
                </button>
                <div className = "smallspacefill"></div>
                {/* https://www.youtube.com/watch?v=i8fAO_zyFAM&t=618s */}
                <Popups trigger={buttonPopup} setTrigger={setButtonPopup}>
                  <div className = "WeatherResult">
                    {weatherData.length === 0 ? (<p> </p>) :
                      (
                        <>                       
                          <h3 className = "CurrentWeather">
                            <div> Current Weather </div>
                            <img alt="new" src={weatherImageUrl}/>
                            <p>Current Temp: {weatherData.current.temp}</p>
                            <p>Description: {weatherData.current.weather[0].main}</p>
                          </h3>
                          <h4 className = "TomorrowHourlyWeather">
                            <div> Tomorrow's Hourly </div>
                             {hourlyWeatherData.length === 0 ? (<p></p>): (
                              <div className = "hourly">
                                  {hourlyWeatherData.map((item,index)=>
                                      <Weather
                                        key = {index}
                                        temp = {item.temp}
                                        description = {item.weather[0].description}
                                        icon = {item.weather[0].icon}
                                        time = {index}
                                      />

                                  )}
                              </div>
                             )}
                          </h4>    
                        </>
                      )
                    }
                  </div>
                </Popups>
              </div>
            )}  <div className = "spacefill"></div>
          </div>  
        )
        }
    </div>

    
  );
}

export default Home;
