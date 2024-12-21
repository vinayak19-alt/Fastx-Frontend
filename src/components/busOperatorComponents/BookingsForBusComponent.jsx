import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthProvider';
import { Box, CardContent, Typography } from '@mui/material';
import { Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import BusOperatorService from '../../service/BusOperatorService';

export const BookingsForBusComponent = () => {

    const [bookings, setBookings]=useState([]);
    const [deleteStatus, setDeleteStatus]=useState(false)
    const {auth} = useContext(AuthContext);
    const location = useLocation();
    const {busId} = location.state || {};
    const cancelBooking=(id)=>{
        console.log("Cancel booking method invoked")
        if(window.confirm("Do you want to delete the booking for this user?")){
          BusOperatorService.cancelBooking(id, auth.accessToken).then((response)=>{
            console.log("Response received from cancelBooking API ", response.data);
            setDeleteStatus(!deleteStatus)
          }).catch((error)=>{
            console.log("Error thrown by cancelBooking API ", error);
          })
        }
    }

    useEffect(()=>{
      console.log("useEffect inside bookingsForBus invoked...")
      BusOperatorService.getBookingsForBus(busId, auth.accessToken).then((response)=>{
        console.log("Response received from getBookingsForBus API ", response.data)
        setBookings(response.data);
      }).catch((error)=>{
        console.log("Error thrown by getBookingsForBus API ", error);
      })
    },[deleteStatus])

  return (
    <div>
    <h1>Bookings for Bus ID: {busId}</h1>
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            width: '100%',
            padding: 2,
        }}
    >
        {bookings.length === 0 ? (
            <Typography
                variant="h6"
                sx={{
                    color: '#888',
                    fontWeight: 'bold',
                    marginTop: 4,
                    textAlign: 'center',
                }}
            >
                No bookings available for this bus.
            </Typography>
        ) : (
            bookings.map((booking, k) => ( booking.status === "Successful"?
                (<Card
                    key={k}
                    elevation={3}
                    sx={{
                        padding: 1.5,
                        margin: 2,
                        width: '80%',
                        minWidth: 200,
                        height: 'auto',
                        minHeight: '180px',
                        backgroundColor: '#ffffff',
                        borderRadius: 2,
                        transition: '0.3s',
                        '&:hover': {
                            transform: 'scale(1.01)',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 1,
                        }}
                    >
                        <Box sx={{ flex: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#1976d2',
                                    fontWeight: 'bold',
                                    marginBottom: 1,
                                }}
                            >
                                Booking Details
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        Booking ID:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {booking.bookingId}
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        User ID:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {booking.userId}
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        Booking Amount:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {booking.amount}
                                        </span>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        Tickets Booked:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {booking.ticketsBooked}
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        Booking Date:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {booking.date}
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        Bus Number:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {booking.busNumber}
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        Booking Status:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {booking.status}
                                        </span>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    padding: '8px 24px',
                                    fontWeight: 'bold',
                                    borderRadius: '25px',
                                    '&:hover': {
                                        backgroundColor: '#1565c0',
                                    },
                                }}
                                onClick={() => {
                                    cancelBooking(booking.bookingId);
                                }}
                            >
                                Cancel Booking
                            </Button>
                        </Box>
                    </CardContent>
                </Card>):(<br></br>)
            ))
        )}
    </Box>
</div>

  )
}
