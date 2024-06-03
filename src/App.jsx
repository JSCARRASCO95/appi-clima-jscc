
import { useEffect, useSyncExternalStore } from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
const key = "edf3a83d35450f3f1d5bd90c3204cb8c";

function App() {

  const [weather, setWeather] = useState ();
  const [coords, setCoords] = useState();
  const [temp, setTemp]= useState();
  const [isLoading, setIsLoading] = useState(true);

  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
  
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  },[]);


  useEffect (() => {
    if (coords) {
    
    const {lat,lon} = coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    axios.get(url)
    .then(res => {
      const kel = res.data.main.temp;
      const cel = (kel - 273.15).toFixed(2);
      const fah = (cel * 9/5 + 32).toFixed(2);
      setTemp({cel: cel, fah:fah})
      setWeather(res.data);
    }) 
    .catch(err => console.log(err))
    .finally(() => {
      setTimeout (() => {
        setIsLoading (false);
      }, 500);
    });
    }
   },[coords]);

  return (
<div className="app">
  {
    isLoading? 
      <figure className='app__img'>
        <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700" alt="is loading" />
      </figure>
      :
      <WeatherCard
  weather={weather}
  temp={temp}
/>  
  }
</div>
  )
}

export default App;
