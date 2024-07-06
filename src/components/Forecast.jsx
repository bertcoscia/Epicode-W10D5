/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import NextDays from "./NextDays";

const url = "https://api.openweathermap.org/data/2.5/weather?";
const lat = "lat=";
const lon = "&lon=";
const auth = "&appid=8237f0d7fd25ebaed878a08b3afbc798";

const Forecast = () => {
  const [coordinates, setCoordinates] = useState(null);
  const params = useParams();

  const [weather, setWeather] = useState(null);

  const [localHour, setLocalHour] = useState("");

  useEffect(() => {
    setCoordinates(params);
    if (coordinates) {
      fetchWeather();
    }
  }, [coordinates]);

  const fetchWeather = () => {
    fetch(`${url + lat + coordinates.lat + lon + coordinates.lon + auth}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Couldn't get data - fetchWeather @Forecast.jsx");
        }
      })
      .then(weather => {
        setWeather(weather);
        console.log(weather);
        // Estrarre il timestamp e il fuso orario
        const timestamp = weather.dt;
        const timezoneOffset = weather.timezone * 1000; // Convertire in millisecondi

        // Convertire il timestamp in un oggetto Date
        const dateUtc = new Date(timestamp * 1000);

        // Aggiungere il fuso orario per ottenere l'ora locale
        const dateLocal = new Date(dateUtc.getTime() + timezoneOffset);

        // Estrarre il giorno, il mese, l'anno, l'ora e i minuti
        const day = String(dateLocal.getUTCDate()).padStart(2, "0");
        const month = String(dateLocal.getUTCMonth() + 1).padStart(2, "0");
        const hours = String(dateLocal.getUTCHours()).padStart(2, "0");
        const minutes = String(dateLocal.getUTCMinutes()).padStart(2, "0");
        const dayName = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(dateLocal);

        // Creare la stringa formattata
        const currentTime = `${dayName} ${day}/${month} - ${hours}:${minutes}`;
        setLocalHour(currentTime);
      });
  };

  return (
    <div className="mt-5">
      <Link to={"/"} className="btn backBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
      </Link>
      {weather ? (
        <>
          <Container className="p-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <strong className="display-1">{weather.name}</strong>
              <small className="lead mb-3">{weather.sys.country}</small>
              {localHour !== "" && (
                <div className="d-inline-block bg-dark rounded-pill px-3" style={{ color: "#FFE142" }}>
                  {localHour}
                </div>
              )}
            </div>
            <div className="d-flex flex-column align-items-center">
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} />
              <p>{weather.weather[0].main}</p>
            </div>
            <div className="text-center">
              <h2>{Math.round(weather.main.temp - 273)}&deg;</h2>
              <p className="d-inline me-3">H: {Math.round(weather.main.temp_max - 273)}&deg;</p>
              <p className="d-inline">L: {Math.round(weather.main.temp_min - 273)}&deg;</p>
            </div>
            <div className="d-flex justify-content-around mt-5 bg-dark py-4 rounded forecast-card" style={{ color: "#FFE142" }}>
              <div className="d-flex flex-column align-items-center row-gap-3" style={{ width: "33.33%" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-wind" viewBox="0 0 16 16">
                  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                </svg>
                {weather.wind.speed}m/s
                <small className="">Wind</small>
              </div>
              <div className="d-flex flex-column align-items-center row-gap-3" style={{ width: "33.33%" }}>
                {" "}
                <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-thermometer-half" viewBox="0 0 16 16">
                  <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                  <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                </svg>
                {Math.round(weather.main.feels_like - 273)}&deg;
                <small>Feels like</small>
              </div>
              <div className="d-flex flex-column align-items-center row-gap-3" style={{ width: "33.33%" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-droplet-half" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                  />
                  <path fillRule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z" />
                </svg>
                {weather.main.humidity}%<small>Humidity</small>
              </div>
            </div>
          </Container>
          <NextDays coordinates={coordinates} />
        </>
      ) : (
        <h1>No data available</h1>
      )}
    </div>
  );
};

export default Forecast;
