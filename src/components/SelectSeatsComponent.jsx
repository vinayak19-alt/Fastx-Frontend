import React, { useContext, useState } from 'react';
import './SelectSeats.css';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomNavbar from './navbar/CustomNavbar';
import UserService from '../service/UserService';
import AuthContext from '../context/AuthProvider';
import { useSelector, useDispatch } from 'react-redux';
import { bookSeats } from '../redux/seatBookingSlice';

export const SelectSeatsComponent = () => {
  const ROWS = 10;
  const SEATS_PER_ROW = 4;
  const totalSeats = ROWS * SEATS_PER_ROW;

  const { auth } = useContext(AuthContext);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const location = useLocation();
  const { username, busNumber } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentBus = useSelector((state) => state.seatBooking.currentBus);
  const bookedSeats = useSelector((state) => state.seatBooking.bookedSeats[currentBus] || []);

  const handleSeatClick = (index) => {
    if (bookedSeats.includes(index)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(index)) {
        return prev.filter((seatIndex) => seatIndex !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleBooking = () => {
    console.log("Book button invoked...");
    const ticketsBooked = selectedSeats.length;
    const bookingObject = { username, busNumber, ticketsBooked };
    UserService.bookseats(bookingObject, auth.accessToken)
      .then((response) => {
        console.log("Received response from makeReservation API ", response.data);
        dispatch(bookSeats(selectedSeats));
        navigate('/success', { state: { username: username } });
      })
      .catch((error) => {
        console.log("Error occurred by makeReservation API ", error);
      });
  };

  const getSeatStatus = (index) => {
    if (bookedSeats.includes(index)) return 'booked';
    if (selectedSeats.includes(index)) return 'selected';
    return 'available';
  };


  return (
    <div className="bus-container">
      <h2 className="bus-title">Bus Seat Booking</h2>
      
      <div className="bus-layout">
        <div className="driver-area">
          Driver's Area
        </div>
        
        <div className="seats-container">
          {/* Left side seats */}
          <div className="seat-column">
            {Array(ROWS).fill(null).map((_, row) => (
              <div key={`left-row-${row}`} className="seat-row">
                {[0, 1].map((col) => {
                  const seatIndex = row * SEATS_PER_ROW + col;
                  return (
                    <button
                      key={`left-${row}-${col}`}
                      onClick={() => handleSeatClick(seatIndex)}
                      disabled={bookedSeats.includes(seatIndex)}
                      className={`seat ${getSeatStatus(seatIndex)}`}>
                      {seatIndex + 1}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Aisle */}
          <div className="aisle">
            AISLE
          </div>

          {/* Right side seats */}
          <div className="seat-column">
            {Array(ROWS).fill(null).map((_, row) => (
              <div key={`right-row-${row}`} className="seat-row">
                {[0, 1].map((col) => {
                  const seatIndex = row * SEATS_PER_ROW + col + 2;
                  return (
                    <button
                      key={`right-${row}-${col}`}
                      onClick={() => handleSeatClick(seatIndex)}
                      disabled={bookedSeats.includes(seatIndex)}
                      className={`seat ${getSeatStatus(seatIndex)}`}
                    >
                      {seatIndex + 1}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="booking-footer">
          <div className="seat-info">
            Selected Seats: {selectedSeats.length}
          </div>
          <button 
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
            className="book-button"
          >
            Book Tickets ({selectedSeats.length})
          </button>
        </div>
      </div>
    </div>
  );
};
