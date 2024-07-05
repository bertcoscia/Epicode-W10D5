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
      });
  };

  return (
    <div className="mt-5">
      <Link to={"/"}>Back to Home</Link>
      {weather ? (
        <>
          <Container>
            <p className="text-center">
              <strong className="display-1">{weather.name}</strong>
              <span className="display-6 ms-3">{weather.sys.country}</span>
            </p>
            <div className="d-flex flex-column align-items-center">
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} />
              <p>{weather.weather[0].main}</p>
            </div>
            <div className="text-center">
              <h2>{Math.round(weather.main.temp - 273)}&deg;</h2>
              <small className="me-3">H: {Math.round(weather.main.temp_max - 273)}&deg;</small>
              <small>L: {Math.round(weather.main.temp_min - 273)}&deg;</small>
            </div>
            <Row className="my-3 gx-3 gy-3">
              <Col xs={12} md={6} className="card p-3 text-center">
                Wind: {weather.wind.speed}m/s
              </Col>
              <Col xs={12} md={6} className="card p-3 text-center">
                Temperature: {Math.round(weather.main.temp - 273)}&deg;
              </Col>
              <Col xs={12} md={6} className="card p-3 text-center">
                Humidity: {weather.main.humidity}%
              </Col>
              <Col xs={12} md={6} className="card p-3 text-center">
                Pressure: {weather.main.pressure}hPa
              </Col>
            </Row>
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
