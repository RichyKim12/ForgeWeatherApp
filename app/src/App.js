import React, {useState, useEffect} from 'react';
import Home from './Home';
import Location from './Location.js'
import './App.css';
import background from "./06.png";
// key: 49db136cb3c703cbc81ffb35eff4788e
// API Call: http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=49db136cb3c703cbc81ffb35eff4788e

function App() {
  


  return (
    <div className = "container" style={{ backgroundImage: `url(${background})` }}>
      <Home/> 
    </div>
  );
}

export default App;
