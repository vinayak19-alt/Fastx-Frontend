import React, { useContext, useState } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider';
import BusOperatorService from '../../service/BusOperatorService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata',
    'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
    'Agra', 'Nashik', 'Faridabad', 'Meerut'
]

export const AddRouteComponent = () => {

    const location = useLocation();
    const {busNumber, username, seats} = location.state || {};
    const {auth} = useContext(AuthContext);
    const [sourceCity, setSourceCity]=useState('');
    const [destinationCity, setDestinationCity]=useState('');
    const [departDate, setDepartDate]=useState('');
    const [departTime, setDepartTime]=useState('');
    const [arrTime, setArrTime]=useState('');
    const [price, setPrice]=useState('');
    const navigate = useNavigate();
    const notify = () => toast("Route added successfully");
    cities.sort();

    const saveRoute = (e) =>{
        e.preventDefault();
        const routeObj = {"source":sourceCity, "destination":destinationCity, "departDate":departDate, "departTime":departTime, "arrTime":arrTime, "price":price, "busNumber":busNumber, "seats":+seats}
        console.log(auth.accessToken)
        console.log(routeObj)
        console.log(typeof routeObj.seats)
        console.log(routeObj.seats)
        console.log(location.state)
        BusOperatorService.addRoute(routeObj, auth.accessToken).then((response)=>{
            console.log("Response recived from add route API ", response.data);
            notify()
            navigate("/operator-dashboard", {state:{username:username}})
        }).catch((error)=>{
            toast.error("Failed to add route. Please try again")
            console.log("Error occurred by add route API ", error)
        })
    }

  return (
    <div id='background'>
        <section>
            <h2>Please add route to the bus Number: {busNumber}</h2>
            <form>
                <div className="form-group centered">
                    <label htmlFor="sourceCity">Source</label>
                        <select className='down-centered'
                            id="sourceCity"
                            value={sourceCity}
                            onChange={(e) => setSourceCity(e.target.value)}
                        >
                            <option value="" disabled>Select Source City</option>
                            {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                </div>
                <div className="form-group centered">
                    <label htmlFor="destination">Destination</label>
                        <select className='down-centered'
                            id="destinationCity"
                            value={destinationCity}
                            onChange={(e) => setDestinationCity(e.target.value)}
                        >
                            <option value="" disabled>Select Detination City</option>
                            {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                </div>
                {/* Date Picker */}
                <div className="date-picker">
                    <label htmlFor="departdate">Departure Date</label>
                <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                />
                </div>
                <div className='time-picker'>
                    <label htmlFor="departTime">Departure Time</label>
                    <input type="time" value={departTime} onChange={(e)=> setDepartTime(e.target.value)}/>
                </div>
                <div className='time-picker'>
                    <label htmlFor="arrTime">Arrival Time</label>
                    <input type="time" value={arrTime} onChange={(e)=> setArrTime(e.target.value)}/>
                </div>
                {/* Phone Number and Email Field */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" placeholder="Enter the price" value={price}
                            onChange={(e) => { setPrice(e.target.value) }} required />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className='btn btn-primary'
                onClick={(e)=>saveRoute(e)}>Submit</button>
            </form>
        </section>
    </div>
  )
}
