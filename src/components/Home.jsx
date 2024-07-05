import { useState } from "react";
import { Button, Container, Form, InputGroup, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const geocoding = "http://api.openweathermap.org/geo/1.0/direct?q=";
const limit = "&limit=5";
const auth = "&appid=d3e80a29c168f8a50b3eeb944618121a";

const Home = () => {
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState(null);

  const fetchGeocoding = city => {
    fetch(`${geocoding + city + limit + auth}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Couldn't get data - fetchGeocoding @Home.jsx");
        }
      })
      .then(locations => {
        console.log(locations);
        setLocations(locations);
      })
      .catch(error => console.log(error));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    fetchGeocoding(city);
  };

  return (
    <div>
      <h1 className="text-center">LaRochelle Weather</h1>
      <Container className="my-5">
        <Form onSubmit={event => handleSubmit(event)}>
          <InputGroup>
            <Form.Control
              placeholder="ex. London, Rome, Moscow..."
              aria-label="City"
              onChange={event => {
                setCity(event.target.value);
              }}
            />
            <Button variant="info">Search</Button>
          </InputGroup>
        </Form>
      </Container>
      <Container>
        <ListGroup>
          {locations &&
            locations.map(location => (
              <ListGroup.Item key={location.lat + location.lon} className="text-center border-0 my-3">
                <h2>{location.name}</h2>
                <p className="lead">
                  {location.country} {location.state && <span> - {location.state}</span>}
                </p>
                <Link to={`/forecast/${location.lat}/${location.lon}`} className="btn btn-info">
                  Forecast
                </Link>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default Home;
