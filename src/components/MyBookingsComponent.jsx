import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthProvider'
import './MyBookings.css'
import UserService from '../service/UserService'
import { useLocation, useNavigate } from 'react-router-dom'
import CustomNavbar from './navbar/CustomNavbar'

export const MyBookingsComponent = () => {

    const[bookings, setBookings]=useState([])
    const [cancelStatus, setCancelStatus]=useState(false)
    const {auth} = useContext(AuthContext)
    const location = useLocation()
    const {username} = location.state || {}

    useEffect(()=>{
        console.log("UseEffect() inside bookings is triggered")
        UserService.getBookings(username, auth.accessToken).then((response)=>{
            console.log("Received response from bookings API ", response.data)
            setBookings(response.data)
        }).catch((error)=>{
            console.log("Error occurred by bookings API ", error)
        })
    },[cancelStatus])

    const cancelBooking=(id)=>{
        console.log("Cancel Booking got invoked")
        UserService.cancelBooking(id, auth.accessToken).then((response)=>{
            console.log("Response received from Cancel Reservation API ", response.data)
            setCancelStatus(true)
        }).catch((error)=>{
            console.log("Error occurred by Cancel Booking API ", error)
        })
    }

  return (
    <div className="booking-table-container">
        {console.log(username)}
      <h2 className="table-title text-center">Booking Details</h2>
      <table className="booking-table tabel-hover">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Amount</th>
            <th>Tickets Booked</th>
            <th>Date</th>
            <th>Bus Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, k)=>(<tr key={k}>
            <td>{booking.bookingId}</td>
            <td>{booking.amount}</td>
            <td>{booking.ticketsBooked}</td>
            <td>{booking.date}</td>
            <td>{booking.busNumber}</td>
            <td>{booking.status}</td>
            {booking.status !== "Cancelled"?(
            <div className='btn-div'>
              <button className='btn btn-danger custom-btn' onClick={() =>cancelBooking(booking.bookingId)}>Cancel</button>
            </div>
            ):(<div></div>)}
          </tr>))}
        </tbody>
      </table>
    </div>
  )
}
