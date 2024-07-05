import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const url = "https://api.openweathermap.org/data/2.5/forecast?";
const lat = "lat=";
const lon = "&lon=";
const auth = "&appid=8237f0d7fd25ebaed878a08b3afbc798";

const NextDays = props => {
  const [forecast, setForecast] = useState(null);
  const coordinates = props.coordinates;

  const getDate = dt => {
    const day = new Date(dt);
    return day.toLocaleDateString();
  };

  const fetchForecast = () => {
    fetch(`${url + lat + coordinates.lat + lon + coordinates.lon + auth}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Couldn't get data - fetchForecast @NextDays.jsx");
        }
      })
      .then(result => {
        const forecast = result.list;
        setForecast(forecast);
        console.log(forecast.slice(0, 5));
        console.log(forecast[0].dt_txt);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <Container className="my-3">
      <h1>Forecast for the next five days</h1>
      {forecast ? (
        <div className="d-flex justify-content-between">
          {forecast.slice(0, 5).map(timestamp => (
            <div key={timestamp.dt_txt} className="card d-flex flex-column text-center py-3 forecast-card" style={{ width: "18%" }}>
              <h3>{timestamp.dt_txt.substring(11, 16)}</h3>
              <img src={`https://openweathermap.org/img/wn/${timestamp.weather[0].icon}@2x.png`} alt={timestamp.weather[0].main} style={{ width: "100px" }} className="mx-auto" />
              <small>{timestamp.weather[0].main}</small>
              {Math.round(timestamp.main.temp - 273)}&deg;
              <Container className="d-flex justify-content-center">
                <small className="me-3">H: {Math.round(timestamp.main.temp_max - 273)}&deg;</small>
                <small>L: {Math.round(timestamp.main.temp_min - 273)}&deg;</small>
              </Container>
            </div>
          ))}
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </Container>
  );
};

export default NextDays;
