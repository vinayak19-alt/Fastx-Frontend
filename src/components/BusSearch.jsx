import React, { useContext, useEffect, useState } from 'react'

import './BusSearch.css'
import UserService from '../service/UserService';
import AuthContext from '../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomNavbar from './navbar/CustomNavbar';

const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata',
    'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
    'Agra', 'Nashik', 'Faridabad', 'Meerut'
]

export const BusSearch = () => {
    const location = useLocation()
    const {username} = location.state || {}
    const [sourceCity, setSourceCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate()
    cities.sort()

    // useEffect(()=>{

    // })

    const searchBus = () => {
        // e.preventDefault()
        console.log("Received Date: ",selectedDate, " Source: ", sourceCity, " Destination: ", destinationCity)
        navigate('/select-bus', {state:{date:selectedDate, source:sourceCity, destination:destinationCity, username:username}})
    };

  return (
    <div>
      <div className='nabvar-component'>
      <CustomNavbar username={username}/>
      </div>
    <div className="bus-search-container">
        {/* <h2>Hello {username}</h2> */}
      {/* Main Search Box */}
      <div className="bus-search-box">
        <h1>FastX</h1>

        {/* Source City */}
        <div className="input-group">
          <label htmlFor="sourceCity">Source City</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select className='down-centered'
            id="sourceCity"
            value={sourceCity}
            onChange={(e) => setSourceCity(e.target.value)}
          >
            <option value="" disabled>Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Swap Icon */}
        <div className="swap-icon">⇅</div>

        {/* Destination City */}
        <div className="input-group">
          <label htmlFor="destinationCity">Destination City</label>
          <select
            id="destinationCity"
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
          >
            <option value="" disabled>Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="date-picker">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}>
            Today
          </button>
          <button onClick={() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setSelectedDate(tomorrow.toISOString().split('T')[0]);
          }}>
            Tomorrow
          </button>
        </div>

        {/* Search Button */}
        <button className="search-button" onClick={searchBus}>Search Buses</button>
      </div>

      {/* Footer */}
      <footer className='footer'>
        <div>
          <p className='contact'> For Inquiries Contact: | Vinayak Sharma(vinayak@gmail.com) | Rahul Bansal(rahul@gmail.com)</p>
        </div>
        <div className='rights'>© 2024 FastX. All rights reserved.</div>
      </footer>
    </div>
    </div>
  );
}
