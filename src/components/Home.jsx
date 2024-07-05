import { useState } from "react";
import { Button, Container, Form, InputGroup, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const geocoding = "http://api.openweathermap.org/geo/1.0/direct?q=";
const limit = "&limit=5";
const auth = "&appid=8237f0d7fd25ebaed878a08b3afbc798";

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
        setLocations(locations);
      })
      .catch(error => console.log(error));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    fetchGeocoding(city);
  };

  return (
    <div className="my-5">
      <h1 className="text-center">LaRochelle Weather</h1>
      <Container className="my-5">
        <Form onSubmit={event => handleSubmit(event)} className="w-50 mx-auto">
          <InputGroup>
            <Form.Control
              placeholder="ex. London, Rome, Moscow..."
              aria-label="City"
              className="bg-dark rounded border-0"
              onChange={event => {
                setCity(event.target.value);
              }}
              style={{ color: "#FFE142" }}
            />
            <Button variant="black" className="ms-2 rounded" style={{ color: "#FFE142", backgroundColor: "#212529" }}>
              Search
            </Button>
          </InputGroup>
        </Form>
      </Container>
      <Container>
        <ListGroup>
          {locations &&
            locations.map(location => (
              <ListGroup.Item key={location.lat + location.lon} className="text-center my-3 mx-auto w-50 p-3 border-0" style={{ backgroundColor: "inherit" }}>
                <h2>{location.name}</h2>
                <p className="lead">
                  {location.country} {location.state && <span> - {location.state}</span>}
                </p>
                <Link to={`/forecast/${location.lat}/${location.lon}`} className="btn btn-dark" style={{ color: "#FFE142" }}>
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
