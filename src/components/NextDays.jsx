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
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <Container fluid>
      <h1>Forecast for the next five days</h1>
      {forecast ? (
        <div className="d-flex overflow-x-auto flex-nowrap">
          {forecast.map(timestamp => (
            <div key={timestamp.dt_txt} className="card d-flex flex-column">
              {Math.round(timestamp.main.temp - 273)}&deg;
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
