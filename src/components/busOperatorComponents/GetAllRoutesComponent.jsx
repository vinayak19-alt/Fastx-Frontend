import React, { useContext, useEffect, useState } from 'react'
import BusOperatorService from '../../service/BusOperatorService';
import AuthContext from '../../context/AuthProvider';
import { useLocation } from 'react-router-dom';
import './GetAllRoutes.css'
import AdminService from '../../service/AdminService';

export const GetAllRoutesComponent = () => {

  const [routes, setRoutes] = useState([]);
  const {auth} = useContext(AuthContext);
  const location = useLocation();
  const {username} = location.state || {}

  useEffect(()=>{
    console.log("Username logged in: " + username)
    if(auth.userDto.role==="ROLE_ADMIN"){
      console.log("Username logged in: " + username);
      AdminService.getAllRoutes(auth.accessToken).then((response)=>{
        console.log("Response received from all routes API inside Admin Services ", response.data)
        setRoutes(response.data);
      }).catch((error)=>{
        console.log("Error Occurred by get all routes API inside admin services ", error)
      })
    }else if(auth.userDto.role==="ROLE_OPERATOR"){
      BusOperatorService.getAllRoutes(auth.accessToken).then((response)=>{
        console.log("Response received from getAllRoutes API ", response.data)
        setRoutes(response.data);
      }).catch((error)=>{
        console.log("error thrown by getAllRotes API ", error)
      })
    }
  },[])

  return (
    <div className='container'>
        {console.log("App rendered")}
        <h2 className='text-center'>All Routes</h2>
        {/* <Link to="/addEmployee" className='btn btn-primary'>Add Employee</Link> */}
        <table className='table table-success table-striped tabel-hover'>
            <thead>
                <tr>
                    <th>RouteID</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Departure Date</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Price</th>
                    <th>Bus Number</th>
                    <th>Seats Left</th>
                </tr>
            </thead>
            <tbody>
                {routes.map((route, k) => (<tr key={k}>
                    <td>{route.routeId}</td>
                    <td>{route.source}</td>
                    <td>{route.destination}</td>
                    <td>{route.departDate}</td>
                    <td>{route.departTime}</td>
                    <td>{route.arrTime}</td>
                    <td>{route.price}</td>
                    <td>{route.busNumber}</td>
                    <td>{route.seats}</td>
                </tr>))}
            </tbody>
        </table>
    </div>
  )
}
