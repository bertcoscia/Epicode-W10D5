/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const url = "https://api.openweathermap.org/data/2.5/weather?";
const lat = "lat=";
const lon = "&lon=";
const auth = "&appid=d3e80a29c168f8a50b3eeb944618121a";

const Forecast = () => {
  const [coordinates, setCoordinates] = useState(null);
  const params = useParams();

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setCoordinates(params);
    if (coordinates) {
      fetchForecast();
    }
  }, [coordinates]);

  const fetchForecast = () => {
    fetch(`${url + lat + coordinates.lat + lon + coordinates.lon + auth}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Couldn't get data - fetchForecast @Forecast.jsx");
        }
      })
      .then(weather => {
        console.log("weather", weather);
        setWeather(weather);
      });
  };

  return (
    <div>
      <Link to={"/"}>Back to Home</Link>
      {weather ? (
        <Container>
          <h1>{weather.name}</h1>
          <h2>{Math.round(weather.main.temp - 273)}&deg;</h2>
          <small>H: {Math.round(weather.main.temp_max - 273)}&deg;</small>
          <small>L: {Math.round(weather.main.temp_min - 273)}&deg;</small>
          <p>{weather.weather[0].main}</p>
          <Row>
            <Col xs={12} md={6} className="card">
              Wind: {weather.wind.speed}m/s
            </Col>
            <Col xs={12} md={6} className="card d-flex flex-column">
              Temperature: {Math.round(weather.main.temp - 273)}&deg;
            </Col>
            <Col xs={12} md={6} className="card">
              Humidity: {weather.main.humidity}%
            </Col>
            <Col xs={12} md={6} className="card">
              Pressure: {weather.main.pressure}hPa
            </Col>
          </Row>
        </Container>
      ) : (
        <h1>No data available</h1>
      )}
    </div>
  );
};

export default Forecast;
