import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { FaClock, FaLocationArrow, FaRupeeSign } from "react-icons/fa";
import CustomNavbar from "./navbar/CustomNavbar";
import { useDispatch } from 'react-redux';
import { setCurrentBus } from '../redux/seatBookingSlice';

const SelectBusComponent = () => {
  const { auth } = useContext(AuthContext);
  const [buses, setBuses] = useState([]);
  const location = useLocation();
  const { date, source, destination, username } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBuses();
  }, [date, source, destination]);

  const fetchBuses = () => {
    UserService.selectJourney(date, source, destination, auth.accessToken)
      .then((response) => {
        console.log("Received response from select bus API", response.data);
        setBuses(response.data);
      })
      .catch((error) => {
        console.log("Error occurred by SelectBus API", error);
      });
  };

  const handleBookNow = (bus) => {
    console.log("book now button invoked");
    const busNumber = bus.busNumber;
    dispatch(setCurrentBus(busNumber));
    navigate("/select-seats", { state: { username: username, busNumber: busNumber } });
  };
  return (
    <div>
      <Container className="my-5">
      <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
        Select The Bus
      </h2>
      <Row>
        {buses.filter((bus) => {
          const busDepartDateTime = new Date(`${bus.departDate}T${bus.departTime}`);
          const currentTime = new Date();
          return busDepartDateTime > currentTime;
        }).map((bus) => (
          <Col lg={12} className="mb-4" key={bus.id}>
          <Card style={styles.card} className="shadow-sm">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h5 style={{ fontWeight: "bold" }}>Bus Type:{bus.busType}<br></br> Bus Number:{bus.busNumber}</h5>
                  <p>
                    <FaLocationArrow className="me-2" />
                    {bus.source} to {bus.destination} | {bus.departDate}
                  </p>
                  <p>
                    <FaClock className="me-2" />
                    Departure: {bus.departTime} | Arrival: {bus.arrTime} | seats: {bus.seats}
                  </p>
                </Col>
                <Col md={4} className="text-end">
                  <div style={styles.ratingBox}>
                    <span style={{ fontWeight: "bold", color: "#28a745" }}>
                      {bus.rating}
                    </span>{" "}
                    <span style={styles.voteCount}>({bus.votes} votes)</span>
                  </div>
                  <h4 style={{ fontWeight: "bold" }}>
                    <FaRupeeSign /> {bus.price}.00
                  </h4>
                  <button variant="primary" style={styles.button} onClick={()=>handleBookNow(bus)}>
                    Book Now
                  </button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

const styles = {
    card: {
      borderRadius: "12px",
      border: "1px solid #ddd",
    },
    info: {
      fontSize: "14px",
      color: "#555",
    },
    icon: {
      color: "#888",
    },
    iconText: {
      fontWeight: "500",
      color: "#666",
      marginRight: "5px",
    },
    ratingBox: {
      display: "inline-block",
      backgroundColor: "#eafaea",
      padding: "3px 8px",
      borderRadius: "6px",
    },
    voteCount: {
      fontSize: "12px",
      color: "#666",
      marginLeft: "4px",
    },
    button: {
      marginTop: "10px",
      borderRadius: "8px",
    },
  };

export default SelectBusComponent;
