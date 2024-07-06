import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const url = "https://api.openweathermap.org/data/2.5/forecast?";
const lat = "lat=";
const lon = "&lon=";
const auth = "&appid=8237f0d7fd25ebaed878a08b3afbc798";

const NextDays = props => {
  const [forecasts, setForecasts] = useState(null);
  const coordinates = props.coordinates;

  const fetchForecasts = () => {
    fetch(`${url + lat + coordinates.lat + lon + coordinates.lon + auth}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Couldn't get data - fetchForecast @NextDays.jsx");
        }
      })
      .then(data => {
        const forecasts = data.list;
        setForecasts(forecasts);
      })
      .catch(error => console.log(error));
  };

  const divideByDay = () => {
    const days = {};

    forecasts.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const forecastDay = String(date.getDate()).padStart(2, "0");
      const forecastMonth = String(date.getMonth() + 1).padStart(2, "0");
      const forecastWeekDay = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
      const forecastDate = `${forecastWeekDay} ${forecastDay}/${forecastMonth}`;
      days[forecastDate] ? {} : (days[forecastDate] = []);
      days[forecastDate].push(forecast);
    });

    return days;
  };

  const forecastByDay = forecasts ? divideByDay() : {};

  useEffect(() => {
    fetchForecasts();
    console.log(forecastByDay);
  }, []);

  return (
    <Container className="my-3">
      {forecasts ? (
        <div className="d-flex flex-wrap">
          {Object.keys(forecastByDay).map(day => (
            <>
              <h3>{day}</h3>
              <div key={day} className="d-flex justify-content-between text-center py-3 w-100">
                {forecastByDay[day].map((forecast, index) => (
                  <div key={index} className="card forecast-card p-3">
                    <h4>{forecast.dt_txt.substring(11, 16)}</h4>
                    <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt={forecast.weather[0].main} style={{ width: "100px" }} className="mx-auto" />
                    <small>{forecast.weather[0].main}</small>
                    {Math.round(forecast.main.temp - 273)}&deg;
                    <Container className="d-flex justify-content-center">
                      <small className="me-3">H: {Math.round(forecast.main.temp_max - 273)}&deg;</small>
                      <small>L: {Math.round(forecast.main.temp_min - 273)}&deg;</small>
                    </Container>
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </Container>
  );
};

export default NextDays;
