/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const url = "https://api.openweathermap.org/data/2.5/weather?";
const lat = "lat=";
const lon = "&lon=";
const auth = "&appid=d3e80a29c168f8a50b3eeb944618121a";

const Forecast = () => {
  const [coordinates, setCoordinates] = useState(null);
  const params = useParams();

  useEffect(() => {
    setCoordinates(params);
    console.log(params);
    console.log("coordinate", JSON.stringify(coordinates));
    fetchForecast();
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
      });
  };

  return (
    <div>
      <h1>Hello</h1>
      <Button>Click</Button>
    </div>
  );
};

export default Forecast;
