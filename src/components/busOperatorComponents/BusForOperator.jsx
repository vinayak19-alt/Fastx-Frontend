import { width } from '@fortawesome/free-solid-svg-icons/fa0'
import { Box, CardActions, CardContent, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import BusOperatorService from '../../service/BusOperatorService'
import AuthContext from '../../context/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

export const BusForOperator = () => {

    const [buses, setBuses] = useState([]);
    const {auth} =useContext(AuthContext);
    const location = useLocation();
    const {username} = location.state || {};
    const navigate = useNavigate();

    const goToBookingsForBus=(busId)=>{
        console.log("Going to check bookingd for bus");
        navigate("/bookings-for-bus", {state:{busId:busId}});
    }

    useEffect(()=>{
        BusOperatorService.getBusForOperator(username, auth.accessToken).then((response)=>{
            console.log("Response received from getbusforoperator API ", response.data)
            setBuses(response.data)
        }).catch((error)=>{
            console.log("Error thrown by getbusforoperator API ", error)
        })
    },[])

  return (
    <div>
    <h1>Buses for {username}</h1>
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
        {buses.length === 0 ? (
            <Typography
                variant="h6"
                sx={{
                    color: '#888',
                    fontWeight: 'bold',
                    marginTop: 4,
                    textAlign: 'center',
                }}
            >
                No buses available for this operator.
            </Typography>
        ) : (
            buses.map((bus, k) => (
                <Card
                    key={k}
                    elevation={3}
                    sx={{
                        padding: 1.5,
                        margin: 2,
                        width: '100%',
                        minWidth: 250,
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
                                Bus Details
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        Bus ID:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {bus.busId}
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        Bus Number:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {bus.busNumber}
                                        </span>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        Bus Type:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {bus.busType}
                                        </span>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ color: '#555' }}
                                    >
                                        Seats:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {bus.seats}
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
                                    goToBookingsForBus(bus.busId);
                                }}
                            >
                                See Bookings
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))
        )}
    </Box>
</div>

  )
}
