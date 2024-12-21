import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'

export const AdminDashboardComponent = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useContext(AuthContext)
    const {username}= location.state || {}

    const goToGetRoutes = () =>{
        console.log("Going to all Routes");
        navigate("/get-routes", {state:{username:username}})
    }

    const goToGetOperators = () =>{
        console.log("Going to get operators");
        navigate("/get-operators", {state:{username:username}})
    }

    const goToGetUsers = () =>{
        console.log("GOing to get users");
        navigate("/get-users", {state:{username:username}})
    }

    useEffect(()=>{
        console.log(username)
    },[])

  return (
    <div>
        <div>
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
        <Typography variant="h4" align="center" gutterBottom>
          Admin Dashboard
        </Typography>
      </Box>
      <Container style={{ marginTop: '30px', position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', width: '250px', textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Get Routes
              </Typography>
              <Typography variant="body2" gutterBottom>
                See all the routes
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={()=>goToGetRoutes()}
                to="/add-bus"
                style={{ backgroundColor: '#1976d2', color: '#fff' }}
              >
                See Routes
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', width: '250px', textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Manage Operators
              </Typography>
              <Typography variant="body2" gutterBottom>
                Add and Update Operator
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={()=>{goToGetOperators()}}
                to="/add-route"
                style={{ backgroundColor: '#1976d2', color: '#fff' }}
              >
                Get Operators
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} style={{ padding: '20px', width: '250px', textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                See Users
              </Typography>
              <Typography variant="body2" gutterBottom>
                View or Delete Users
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={()=>{goToGetUsers()}}
                to="/see-routes"
                style={{ backgroundColor: '#1976d2', color: '#fff' }}
              >
                View Users
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
    </div>
  )
}
