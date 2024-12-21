import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './BookingSuccess.css'
import AuthContext from '../context/AuthProvider'

export const BookingSuccessComponent = () => {
    const {auth} = useContext(AuthContext)
    const location = useLocation()
    const {username} = location.state || {}
  return (
    <div className="booking-success">
      <h3>🎉 Booking Successful!</h3>
      <p>Your tickets have been successfully booked.</p>
      <Link to="/bus-search" className="go-back-link" state={{username:username}}>
        Go Back to Select Journey
      </Link>
    </div>
  )
}
