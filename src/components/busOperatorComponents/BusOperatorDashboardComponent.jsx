import React, { useContext, useEffect } from 'react'
import { Container, Button, Grid, Typography, Paper, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomNavbar from '../navbar/CustomNavbar';
import { GetAllRoutesComponent } from './GetAllRoutesComponent';
import { AddBusComponent } from './AddBusComponent';
import AuthContext from '../../context/AuthProvider';

export const BusOperatorDashboardComponent = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {username} = location.state || {}
  const{auth} = useContext(AuthContext)

  useEffect(()=>{
    console.log(username);
  },[])

  const goToAddBus=()=>{
    console.log("going to add bus")
    navigate("/add-bus", {state:{username:username}})
  }
  const goToGetRoutes=()=>{
    console.log("going to get routes")
    navigate("/get-routes", {state:{username:username}})
  }
  const goToSeeBuses=()=>{
    console.log("Going to see buses")
    navigate("/get-buses", {state:{username:username}})
  }

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#f5f5f5',
          zIndex: 1000,
          padding: '10px 0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{
        color: '#4e54c8', // New heading color
        fontWeight: 'bold',
      }}>
          Operator Dashboard
        </Typography>
      </Box>
      <Container style={{ marginTop: '30px' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', width: '250px', textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Add Bus
              </Typography>
              <Typography variant="body2" gutterBottom>
                Manage bus entries
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={()=>goToAddBus()}
                to="/add-bus"
              >
                Go to Add Bus
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', width: '250px', textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                See Buses
              </Typography>
              <Typography variant="body2" gutterBottom>
                See bookings for the bus
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={()=>{goToSeeBuses()}}
                to="/add-route"
              >
                See Buses
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', width: '250px', textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                See All Routes
              </Typography>
              <Typography variant="body2" gutterBottom>
                View existing routes
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={()=>{goToGetRoutes()}}
                to="/see-routes"
              >
                View Routes
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
