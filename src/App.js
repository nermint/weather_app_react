import React, { useState } from "react";
import "./styles.css";

const api = {
  appKey: "d1812ec2c50c2b059ffdc86d2ca53ed0",
  url: "https://api.openweathermap.org/data/2.5/",
};

const datetime = (d) => {
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

  return ` ${day} ${date} ${month} ${year}`;
};

export default function App() {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.url}weather?q=${query}&appid=${api.appKey}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setWeather(data);
          setQuery('');
        });
    }
  };

  return (
    <div className={ (typeof weather.main!="undefined") ?  ( weather.main.temp > 16 ? 'App sunny' : 'App' )  :  'App' }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name} , {weather.sys.country}
              </div>
              <div className="date">{datetime(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp"> { Math.round(weather.main.temp/10) } °c</div>
        <div className="weather">  { weather.weather[0].main }</div>
            </div>
          </div>
        ) : ( "" )}
      </main>
    </div>
  );
}
