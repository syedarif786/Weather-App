import React, { useState } from "react";
import './App.css'

const api = {
  key: "b082bb7b779eea22cf7d1ce4ceb15b10",
  base: "https://api.openweathermap.org/data/2.5/weather?q=",
};

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

function App() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Welcome to Weather App");
  const [temp, setTemp] = useState("");
  const[isWarm,setIsWarm]=useState(false);
  const[climate,setClimate] = useState("");

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}${query}&appid=${api.key}&units=metric`)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          console.log(result.weather[0].main);

          setLocation(`${result.name}, ${result.sys.country}`);
          setTemp(`${Math.floor (result.main.temp)}°C`);
          setClimate(result.weather[0].main)
          setIsWarm(result.main.temp > 16);
        });
    }
  };

  return (
    <div className={isWarm? 'app warm':'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={search}
          />
        </div>
        <div className="weather-report">
          <div className="location-box">
            <div className="location">{location}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{temp}</div>
            <div className="climate">{climate}</div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
